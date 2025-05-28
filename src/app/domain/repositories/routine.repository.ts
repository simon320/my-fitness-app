import { Exercise } from '../entities/exercise.entity';
import { Routine } from '../entities/routine.entity';

export interface Muscle {
  id: number;
  name: string;
  is_front: boolean;
}

export abstract class RoutineRepository {
  abstract getTodayRoutine(): Promise<Exercise[]>;
  abstract getRoutineByDate(date: string): Promise<Routine | null>;
  abstract getMuscleGroups(): Promise<Muscle[]>;
  abstract getExercisesByMuscle(muscleId: number): Promise<Exercise[]>;
}