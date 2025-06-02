import { Exercise } from '../entities/exercise.entity';
import { Routine } from '../entities/routine.entity';

export interface Muscle {
  id: number;
  name: string;
  is_front: boolean;
}

export interface RoutineRepository {
  // getTodayRoutine(): Promise<Exercise[]>;
  // getRoutineByDate(date: string): Promise<Routine | null>;
  // getMuscleGroups(): Promise<Muscle[]>;
  // getExercisesByMuscle(muscleId: number): Promise<Exercise[]>;

  saveRoutine(routine: Routine): void;
}