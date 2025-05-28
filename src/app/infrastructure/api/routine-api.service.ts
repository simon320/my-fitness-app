import { Injectable } from '@angular/core';
import { Exercise } from '../../domain/entities/exercise';
import { RoutineRepository } from '../../domain/repositories/routine.repository';
import { Routine } from '../../domain/entities/routine';

const MOCK_ROUTINES: Routine[] = [
  {
    date: '2025-05-24',
    name: 'Rutina Full Body',
    exercises: [
      { name: 'Sentadillas', reps: 15 },
      { name: 'Flexiones', reps: 12 },
    ]
  },
  {
    date: '2025-05-25',
    name: 'Rutina Full Body',
    exercises: [
      { name: 'Sentadillas', reps: 15 },
      { name: 'Flexiones', reps: 12 },
    ]
  },
  {
    date: '2025-05-28',
    name: 'Hombros y Espalda',
    exercises: [
      { name: 'Vuelos laterales', reps: 10 },
      { name: 'Vuelos frontales', reps: 10 },
      { name: 'Press militar', reps: 12 },
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