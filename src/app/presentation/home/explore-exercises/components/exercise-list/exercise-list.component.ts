import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnChanges, signal, inject, input, computed, effect } from '@angular/core';

import { TruncatePipe } from '../../../../../shared/pipes/truncate.pipe';
import { Exercise } from '../../../../../domain/entities/exercise.entity';
import { RoutineService } from '../../../../../application/services/routine.service';
import { ExerciseDbApiService } from '../../../../../infrastructure/api/exercise-db-api.service';
import { PlusSVG } from "../../../../../../assets/icons/plus.svg";
import { ArrowLeftSVG } from "../../../../../../assets/icons/arrow-left.svg";
import { ArrowRightSVG } from '../../../../../../assets/icons/arrow-right.svg';


@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.scss',
  imports: [TruncatePipe, FormsModule, CommonModule, PlusSVG, ArrowLeftSVG, ArrowRightSVG],
})
export class ExerciseListComponent implements OnChanges {
  private exerciseService = inject(ExerciseDbApiService);
  private routineService = inject(RoutineService);

  public selectedBodyPart = input<string>('');
  private allExercises = signal<Exercise[]>([]);
  public currentPage = signal(1);
  private readonly pageSize = 5;
  public selectedIndex: string | null = null;


  constructor() {
    effect(() => {
      if(this.routineService.deselectedExercise()) 
        this.allExercises.update( exercises => [ this.routineService.deselectedExercise()!, ...exercises ] )
    });
  }


  ngOnChanges() {    
    if (this.selectedBodyPart() !== '') 
      this.exerciseService
        .getExercisesByBodyPart(this.selectedBodyPart())
        .subscribe( exercises => this.allExercises.set(exercises) );
    
    else 
      this.cancel();
  }


  public selectedExercise(exercise: Exercise): void {
    this.selectedIndex = exercise.id;

    setTimeout(() => {
      this.selectedIndex = null;
      this.routineService.addExercises([
        ...(this.routineService.routineInTheProcessOfCreation() ?? []), 
        exercise
      ]);
      
      this.allExercises.update( exercises =>  exercises.filter( e => e.id !== exercise.id) );
    }, 250);
  }


  public cancel(): void {
    this.allExercises.set([]);
    this.routineService.deselectedExercise.set(null);
  }


// =================== Pagination =================== \\
  public paginatedExercises = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.allExercises().slice(start, start + this.pageSize);
  });


  public totalPages = computed(() => {
    return Math.ceil(this.allExercises().length / this.pageSize);
  });


  public nextPage(): void {
    if (this.currentPage() < this.totalPages()) 
      this.currentPage.update(p => p + 1);
  }


  public prevPage(): void {
    if (this.currentPage() > 1) 
      this.currentPage.update(p => p - 1);
  }


  public pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const maxVisible = 5;
    const pages: (number | string)[] = [];

    if (total <= maxVisible) 
      return Array.from({ length: total }, (_, i) => i + 1);

    const showLeftDots = current > 3;
    const showRightDots = current < total - 2;

    if (!showLeftDots && showRightDots) 
      pages.push(1, 2, 3, '...', total);

    else if (showLeftDots && !showRightDots) 
      pages.push(1, '...', total - 2, total - 1, total);

    else if (showLeftDots && showRightDots) 
      pages.push(1, '...', current - 1, current, current + 1, '...', total);
    
    return pages;
  });


  public goToPage(page: number | string): void {
    this.currentPage.set(+page);
  }

}
