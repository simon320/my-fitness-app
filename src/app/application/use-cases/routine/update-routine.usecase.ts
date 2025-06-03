import { Routine } from "../../../domain/entities/routine.entity";
import { RoutineRepository } from "../../../domain/repositories/routine.repository";
import { Observable } from "rxjs";


interface UpdateRoutineUseCase {
    execute(routine: Routine): void;
}


export class UpdateRoutine implements UpdateRoutineUseCase {
  constructor(private repository: RoutineRepository) {}
  execute(routine: Routine): void {
    return this.repository.updateRoutine(routine);
  }
  
}
