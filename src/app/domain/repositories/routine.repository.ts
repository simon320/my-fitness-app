import { Exercise } from '../entities/exercise';
import { Routine } from '../entities/routine';

export abstract class RoutineRepository {
  abstract getRoutineByDate(date: string): Routine | null;
}