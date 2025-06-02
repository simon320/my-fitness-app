import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnChanges, signal, inject, input, computed } from '@angular/core';

import { Routine } from '../../../../../domain/entities/routine.entity';
import { TruncatePipe } from '../../../../../shared/pipes/truncate.pipe';
import { Exercise } from '../../../../../domain/entities/exercise.entity';
import { SaveRoutine } from '../../../../../application/use-cases/routine/save-routine.usecase';
import { ExerciseDbApiService } from '../../../../../infrastructure/api/exercise-db-api.service';
import { CircleButtonComponent } from "../../../../../shared/atoms/circle-button/circle-button.component";
import { LocalStorageRoutineRepository } from '../../../../../infrastructure/local-storage/routine.repositoty';


type Flow = 'train' | 'calendar' | 'routine';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.scss',
  imports: [CircleButtonComponent, TruncatePipe, CommonModule, FormsModule],
})
export class ExerciseListComponent implements OnChanges {
  private repository = new LocalStorageRoutineRepository();
  private saveUseCase = new SaveRoutine(this.repository);
  private exerciseService = inject(ExerciseDbApiService);
  private router = inject(Router);

  public selectedBodyPart = input<string>('');
  private allExercises = signal<Exercise[]>([]);
  public selectedExercises = signal<Exercise[]>([]);
  public openModal = signal<boolean>(false);
  public routineName = '';

  private unselectedExercises = computed(() =>
    this.allExercises().filter(
      (ex) => !this.selectedExercises().some((sel) => sel.id === ex.id)
    )
  );

  public displayedExercises = computed(() => [
    ...this.selectedExercises(),
    ...this.unselectedExercises(),
  ]);



  ngOnChanges() {
    if (this.selectedBodyPart()) {
      this.exerciseService
        .getExercisesByBodyPart(this.selectedBodyPart())
        .subscribe((exercises) => {
          this.allExercises.set(exercises);
        });
    }
  }


  public toggleSelection(exercise: Exercise): void {
    const isSelected = this.selectedExercises().some((e) => e.id === exercise.id);

    if (isSelected) 
      this.selectedExercises.set( this.selectedExercises().filter((e) => e.id !== exercise.id) );
    else 
        this.selectedExercises.update((exs) => [...exs, exercise]);
  }


  public isSelected(exercise: Exercise): boolean {
    return this.selectedExercises().some((e) => e.id === exercise.id);
  }


  public toggleOptions(acction: 'open' | 'close'): void {
    this.openModal.set(acction === 'open');
  }


  public createRoutine(flow: Flow, date?: string): Promise<boolean> | void {

    const routine: Routine = {
      id: Math.random().toString(36).substring(2, 15),
      name: this.routineName || 'Rutina personalizada',
      date: date || new Date().toISOString(),
      exercises: this.selectedExercises()
    };

    this.saveUseCase.execute(routine);

    // TODO => Show success message

    switch (flow) {
      case 'train': return this.router.navigateByUrl('/workout');        
      case 'calendar': return this.router.navigateByUrl('/calendar'); 
      case 'routine': 
        this.selectedExercises.set([]);
        this.openModal.set(false);
    }
  }

  public cancel(): void {
    // resetar el selectedBodyPart / searchTerm de body-part-filter
    this.selectedExercises.set([]);
    this.allExercises.set([]);
    this.openModal.set(false);
    this.routineName = '';
  }
}
