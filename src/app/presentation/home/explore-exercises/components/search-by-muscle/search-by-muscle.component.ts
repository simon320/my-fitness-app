import {  Component, ElementRef, signal, output, inject, viewChild, Renderer2 } from '@angular/core';

import { ExerciseDbApiService } from '../../../../../infrastructure/api/exercise-db-api.service';
import { CrossSVG } from "../../../../../../assets/icons/cross.svg";


@Component({
  selector: 'app-search-by-muscle',
  templateUrl: './search-by-muscle.component.html',
  styleUrls: ['./search-by-muscle.component.scss'],
  imports: [ CrossSVG ]
})
export class SearchByMuscleComponent {
  private exerciseService = inject(ExerciseDbApiService);
  private render = inject(Renderer2);

  public searchTermDefault = 'Explora ejercicios por grupo muscular';
  public searchTerm = signal<string>(this.searchTermDefault);
  public menuTemplate = viewChild<ElementRef>('dropdownMenu');
  public trigger = viewChild<ElementRef>('dropdownTrigger');
  public btnCancel = viewChild<ElementRef>('btnCancel');
  public bodyPartSelected = output<string>();
  public bodyParts = signal<string[]>([]);
  public isOpen = signal<boolean>(false);



  ngOnInit() {
    this.exerciseService.getBodyParts()
      .subscribe( (parts: string[]) => this.bodyParts.set(parts) );
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
    this.render.removeClass(this.trigger()?.nativeElement, 'width-decrement')
    this.searchTerm.set(this.searchTermDefault);
  }

}