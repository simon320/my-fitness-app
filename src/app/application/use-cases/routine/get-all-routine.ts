import { Observable } from "rxjs";

import { Routine } from "../../../domain/entities/routine.entity";
import { RoutineRepository } from "../../../domain/repositories/routine.repository";


interface GetAllRoutineUseCase {
    execute(): Observable<Routine[] | null>;
}


export class GetAllRoutine implements GetAllRoutineUseCase {
    constructor(private repository: RoutineRepository) { }

    execute(): Observable<Routine[] | null> {
        return this.repository.getAllRoutine();
    }

}
