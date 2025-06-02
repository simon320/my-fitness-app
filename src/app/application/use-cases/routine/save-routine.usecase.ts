import { Routine } from "../../../domain/entities/routine.entity";
import { WeeklyProgressPhoto } from "../../../domain/entities/weekly-progress-photo.entity";
import { RoutineRepository } from "../../../domain/repositories/routine.repository";
import { WeeklyProgressRepository } from "../../../domain/repositories/weekly-progress.repository";


interface SaveRoutineUseCase {
    execute(routine: Routine): void;
}


export class SaveRoutine implements SaveRoutineUseCase {
  constructor(private repository: RoutineRepository) {}

  execute(routine: Routine): void {
    return this.repository.saveRoutine(routine);
  }
}
