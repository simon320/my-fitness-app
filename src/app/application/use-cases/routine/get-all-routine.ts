import { Observable } from "rxjs";
import { Routine } from "../../../domain/entities/routine.entity";
import { WeeklyProgressPhoto } from "../../../domain/entities/weekly-progress-photo.entity";
import { RoutineRepository } from "../../../domain/repositories/routine.repository";
import { WeeklyProgressRepository } from "../../../domain/repositories/weekly-progress.repository";


interface GetAllRoutineUseCase {
    execute(): Observable<Routine[] | null>;
}


export class GetAllRoutine implements GetAllRoutineUseCase {
  constructor(private repository: RoutineRepository) {}

    execute(): Observable<Routine[] | null> {
        return this.repository.getAllRoutine();
    }
  
}
