import { Injectable, signal } from '@angular/core';
import { Routine } from '../../domain/entities/routine.entity';
import { Exercise } from '../../domain/entities/exercise.entity';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  readonly activeRoutine = signal<Routine | null>(null);
  readonly deselectedExercise = signal<Exercise | null>(null);
  readonly routineInTheProcessOfCreation = signal<Exercise[] | null>(null);

  public setRoutine(routine: Routine): void {
    this.activeRoutine.set(routine);
  }

  public clear(): void {
    this.activeRoutine.set(null);
  }

  public addExercises(exercises: Exercise[]): void {
    this.routineInTheProcessOfCreation.set(exercises);
  }

  public removeExercises(exercise: Exercise): void {
    this.routineInTheProcessOfCreation.update( exercises =>  exercises!.filter( e => e.id !== exercise.id) );
    this.deselectedExercise.set( exercise );
  }

  public clearExercisesList(): void {
    this.routineInTheProcessOfCreation.set(null);
    this.deselectedExercise.set(null);
  }
}
