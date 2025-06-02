import { Routine } from "../../domain/entities/routine.entity";
import { RoutineRepository } from "../../domain/repositories/routine.repository";

const STORAGE_KEY = 'routines';

export class LocalStorageRoutineRepository implements RoutineRepository {

    saveRoutine(routine: Routine): void {
        const allRoutines = this.getAll();
        allRoutines.push(routine);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allRoutines));
    }

  
    getAll(): Routine[] {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    }

}
