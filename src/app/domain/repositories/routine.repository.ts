import { Observable } from 'rxjs';
import { Exercise } from '../entities/exercise.entity';
import { Routine } from '../entities/routine.entity';

export interface Muscle {
  id: number;
  name: string;
  is_front: boolean;
}

export interface RoutineRepository {
  // getTodayRoutine(): Promise<Exercise[]>;
  // getMuscleGroups(): Promise<Muscle[]>;
  // getExercisesByMuscle(muscleId: number): Promise<Exercise[]>;
  
  saveRoutine(routine: Routine): void;
  getRoutineById(id: string): Observable<Routine | null>;
  getAllRoutine(): Observable<Routine[] | null>;
}