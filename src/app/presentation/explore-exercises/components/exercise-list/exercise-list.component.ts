import { Component, OnChanges, signal, inject, input } from '@angular/core';

import { Exercise } from '../../../../domain/entities/exercise.entity';
import { ExerciseDbApiService } from '../../../../infrastructure/api/exercise-db-api.service';
import { RoutineService } from '../../../../application/services/routine.service';
import { Routine } from '../../../../domain/entities/routine.entity';



@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.scss',
})
export class ExerciseListComponent implements OnChanges {
  private exerciseService = inject(ExerciseDbApiService);
  private routineService = inject(RoutineService);
  public selectedBodyPart = input<string>('');
  public exercises = signal<Exercise[]>([]);
  public selectedExercises = signal<Exercise[]>([]);


  ngOnChanges() {
    if (this.selectedBodyPart()) {
      this.exerciseService
        .getExercisesByBodyPart(this.selectedBodyPart())
        .subscribe((exercises) => {
          this.exercises.set(exercises);
        });
    }
  }


  public toggleSelection(exercise: Exercise): void {
    const exists = this.selectedExercises().find(e => e.id === exercise.id);

    if (exists) 
      this.selectedExercises.set(this.selectedExercises().filter(e => e.id !== exercise.id));

    else 
      this.selectedExercises.update(exercises => [...exercises, exercise]);

    this.saveSelectionExercises({ name: '', date: '', exercises: this.selectedExercises() });
  }


  public isSelected(exercise: Exercise): boolean {
    return this.selectedExercises().some(e => e.id === exercise.id);
  }

  private saveSelectionExercises(routine: Routine): void {
    this.routineService.setRoutine(routine);
  }

}
