import { signal } from '@angular/core';
import { Routine } from '../../domain/entities/routine';

export class RoutineService {
  readonly activeRoutine = signal<Routine | null>(null);

  setRoutine(routine: Routine) {
    this.activeRoutine.set(routine);
  }

  clear() {
    this.activeRoutine.set(null);
  }
}
