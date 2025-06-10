import { Observable } from 'rxjs';
import { Routine } from '../entities/routine.entity';


export interface RoutineRepository {  
  saveRoutine(routine: Routine): void;
  updateRoutine(routine: Routine): void;
  deleteRoutine(id: string): void;
  getRoutineById(id: string): Observable<Routine | null>;
  getRoutineByDate(date: string): Observable<Routine | null>;
  getAllRoutine(): Observable<Routine[] | null>;
}