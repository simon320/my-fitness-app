import { map, Observable, of } from "rxjs";
import { Routine } from "../../domain/entities/routine.entity";
import { RoutineRepository } from "../../domain/repositories/routine.repository";

const STORAGE_KEY = 'routines';

export class LocalStorageRoutineRepository implements RoutineRepository {
    updateRoutine(routine: Routine): void {
        this.getAllRoutine().subscribe({
            next: (allRoutines: Routine[]) => {
                allRoutines = allRoutines.filter(r => r.id !== routine.id); 
                allRoutines.push(routine); 
                localStorage.setItem(STORAGE_KEY, JSON.stringify(allRoutines));
            },
            error: (err) => {
                console.error(`Error update routine with id ${routine.id} from local storage:`, err);
            }
        })
    }

    deleteRoutine(id: string): void {
        this.getAllRoutine().subscribe({
            next: (allRoutines: Routine[]) => {
                allRoutines = allRoutines.filter(r => r.id !== id);  
                localStorage.setItem(STORAGE_KEY, JSON.stringify(allRoutines));
            },
            error: (err) => {
                console.error(`Error update routine with id ${id} from local storage:`, err);
            }
        })
    }

    getRoutineByDate(date: string): Observable<Routine | null> {
        return this.getAllRoutine().pipe(
            map((allRoutines: Routine[]) => {
                if(date === '') return null;
                const routine = allRoutines.find(r => r.date?.split('T')[0] === date);
                return routine ? routine : null;
            })
        );
    }

    saveRoutine(routine: Routine): void {
        this.getAllRoutine().subscribe({
            next: (allRoutines: Routine[]) => {
                const existingIndex = allRoutines.findIndex(r => r.id === routine.id);
                if (existingIndex !== -1) 
                    allRoutines[existingIndex] = routine;
                else 
                    allRoutines.unshift(routine);
                
                localStorage.setItem(STORAGE_KEY, JSON.stringify(allRoutines));
            },
            error: (err) => {
                console.error('Error retrieving routines from local storage:', err);
            }
        })

    }


    getRoutineById(id: string): Observable<Routine | null> {
        return this.getAllRoutine().pipe(
            map((allRoutines: Routine[]) => {
                const routine = allRoutines.find(r => r.id === id);
                return routine ? routine : null;
            })
        );
    }

  
    getAllRoutine(): Observable<Routine[] | []> {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? of(JSON.parse(raw)) : of([]);
    }

}
