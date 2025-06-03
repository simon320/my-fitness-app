import { map, Observable, of } from "rxjs";
import { Routine } from "../../domain/entities/routine.entity";
import { RoutineRepository } from "../../domain/repositories/routine.repository";

const STORAGE_KEY = 'routines';

export class LocalStorageRoutineRepository implements RoutineRepository {
    getRoutineByDate(date: string): Observable<Routine | null> {
        throw new Error("Method not implemented.");
    }

    saveRoutine(routine: Routine): void {
        this.getAllRoutine().subscribe({
            next: (allRoutines: Routine[]) => {
                const existingIndex = allRoutines.findIndex(r => r.id === routine.id);
                if (existingIndex !== -1) 
                    allRoutines[existingIndex] = routine;
                else 
                    allRoutines.push(routine);
                
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
