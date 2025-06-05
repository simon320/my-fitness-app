import {
  Component,
  ElementRef,
  signal,
  output,
  inject,
  viewChild,
  Renderer2,
} from '@angular/core';

import { ExerciseDbApiService } from '../../../../../infrastructure/api/exercise-db-api.service';
import { CircleButtonComponent } from "../../../../../shared/atoms/circle-button/circle-button.component";


@Component({
  selector: 'app-search-by-muscle',
  templateUrl: './search-by-muscle.component.html',
  styleUrls: ['./search-by-muscle.component.scss'],
  imports: [CircleButtonComponent]
})
export class SearchByMuscleComponent {
  public searchTermDefault = 'Explora ejercicios por grupo muscular';
  public trigger = viewChild<ElementRef>('dropdownTrigger');
  public menuTemplate = viewChild<ElementRef>('dropdownMenu');
  public btnCancel = viewChild<ElementRef>('btnCancel');

  private render = inject(Renderer2);
  private exerciseService = inject(ExerciseDbApiService);
  public bodyPartSelected = output<string>();
  public searchTerm = signal<string>(this.searchTermDefault);
  public bodyParts = signal<string[]>([]);
  public isOpen = signal<boolean>(false);



  ngOnInit() {
    // this.exerciseService.getAllExercises().subscribe((parts) => {
    //   console.log(parts);
    // });
    this.exerciseService.getBodyParts().subscribe((parts: string[]) => {
      this.bodyParts.set(parts);
    });
  }


  public openDropdown(mustBeOpened: boolean): void {
    if (mustBeOpened) {
      this.render.addClass(this.trigger()?.nativeElement, 'remove-border-radius')
      this.render.addClass(this.menuTemplate()?.nativeElement, 'animated')
      this.searchTerm.set(this.searchTermDefault);
    }
    else {
      this.render.removeClass(this.trigger()?.nativeElement, 'remove-border-radius')
      this.render.removeClass(this.menuTemplate()?.nativeElement, 'animated')
      this.render.addClass(this.trigger()?.nativeElement, 'width-decrement')
      this.render.addClass(this.btnCancel()?.nativeElement, 'fadeIn')
    }
  }

  public selectMuscle(group: string): void {
    this.openDropdown(false);
    this.searchTerm.set(group);
    this.isOpen.set(false);
    this.bodyPartSelected.emit(group);
  }

  public cancel(): void {    
    this.bodyPartSelected.emit('');

    // this.selectedExercises.set([]);
    // this.allExercises.set([]);
    // this.openModal.set(false);
    // this.routineName = '';
    // this.cleanSearchName.emit(true);
    this.render.removeClass(this.trigger()?.nativeElement, 'width-decrement')
    this.searchTerm.set(this.searchTermDefault);
  }

}