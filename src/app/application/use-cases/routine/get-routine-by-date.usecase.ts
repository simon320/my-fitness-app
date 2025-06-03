import { Observable } from "rxjs";

import { Routine } from "../../../domain/entities/routine.entity";
import { RoutineRepository } from "../../../domain/repositories/routine.repository";


interface GetRoutineByDateUseCase {
    execute(date: string): Observable<Routine | null>
}

export class GetRoutineByDate implements GetRoutineByDateUseCase {

    constructor(private repository: RoutineRepository) { }

    execute(date: string): Observable<Routine | null> {
        return this.repository.getRoutineByDate(date);
    }
}