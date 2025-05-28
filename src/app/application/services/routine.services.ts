import { Injectable, signal } from '@angular/core';
import { Routine } from '../../domain/entities/routine.entity';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  readonly activeRoutine = signal<Routine | null>(null);

  setRoutine(routine: Routine) {
    this.activeRoutine.set(routine);
  }

  clear() {
    this.activeRoutine.set(null);
  }
}
