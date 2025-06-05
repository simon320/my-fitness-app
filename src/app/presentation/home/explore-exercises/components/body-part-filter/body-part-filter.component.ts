import { FormsModule } from '@angular/forms';

import { Component, ElementRef, inject, OnInit, output, signal, ViewChild } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

import { ExerciseDbApiService } from '../../../../../infrastructure/api/exercise-db-api.service';


@Component({
  selector: 'app-body-part-filter',
  templateUrl: './body-part-filter.component.html',
  styleUrl: './body-part-filter.component.scss',
  imports: [FormsModule],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class BodyPartFilterComponent implements OnInit {
  private exerciseService = inject(ExerciseDbApiService);
  public bodyPartSelected = output<string>();
  public bodyParts = signal<string[]>([]);
  public isOpen = signal<boolean>(false);
  public searchTerm = signal<string>('');
  @ViewChild('inputSelect') elementoRef!: ElementRef;



  ngOnInit() {
    // this.exerciseService.getAllExercises().subscribe((parts) => {
    //   console.log(parts);
    // });
    this.exerciseService.getBodyParts().subscribe((parts: string[]) => {
      this.bodyParts.set(parts);
    });
  }


  public toggleDropdown(open: boolean): void {
    setTimeout(() => {
      this.isOpen.set(open);
    }, open ? 0 : 150);

    // this.scrollToElement();
  }


  public scrollToElement(): void {
    this.elementoRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  public selectMuscle(group: string): void {
    this.searchTerm.set(group);
    this.isOpen.set(false);    
    this.bodyPartSelected.emit(group);
  }
    
}