import { Injectable, signal } from '@angular/core';
import { Routine } from '../../domain/entities/routine.entity';
import { Exercise } from '../../domain/entities/exercise.entity';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  readonly activeRoutine = signal<Routine | null>(null);
  readonly routineInTheProcessOfCreation = signal<Exercise[] | null>(null);

  setRoutine(routine: Routine) {
    this.activeRoutine.set(routine);
  }

  clear() {
    this.activeRoutine.set(null);
  }

  addExercises(exercises: Exercise[]) {
    this.routineInTheProcessOfCreation.set(exercises);
  }

  clearExercisesList() {
    this.routineInTheProcessOfCreation.set(null);
  }
}
