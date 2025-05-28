import { Injectable } from '@angular/core';
import { Exercise } from '../../domain/entities/exercise';
import { RoutineRepository } from '../../domain/repositories/routine.repository';
import { Routine } from '../../domain/entities/routine';

const MOCK_ROUTINES: Routine[] = [
  {
    date: '2025-05-24',
    name: 'Rutina Full Body',
    exercises: [
      { name: 'Sentadillas', repetitions: 15, sets: 3 },
      { name: 'Flexiones', repetitions: 12, sets: 3 },
    ]
  },
  {
    date: '2025-05-25',
    name: 'Piernas y Core',
    exercises: [
      { name: 'Estocadas', repetitions: 10, sets: 4 },
      { name: 'Planchas', repetitions: 1, sets: 3 },
    ]
  }
];

@Injectable({
  providedIn: 'root',
})
export class RoutineApiService implements RoutineRepository {
  async getTodayRoutine(): Promise<Exercise[]> {
    // TODO: Datos simulados. Implementar WGER API
    return Promise.resolve([
      { name: 'Flexiones abiertas', reps: 15 },
      { name: 'Sentadillas', reps: 20 },
      { name: 'Plancha', reps: 0, duration: 60 },
      { name: 'Burpees', reps: 10 },
    ]);
  }

  getRoutineByDate(date: string): Routine | null { 
    return MOCK_ROUTINES.find(r => r.date === date) ?? null;
  }
}