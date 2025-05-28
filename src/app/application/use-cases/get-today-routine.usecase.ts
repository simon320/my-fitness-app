import { Exercise } from "../../domain/entities/exercise.entity";
import { RoutineRepository } from "../../domain/repositories/routine.repository";

interface GetTodayRoutineUseCase {
    execute(): Promise<Exercise[]> 
}


export class GetTodayRoutine implements GetTodayRoutineUseCase {
  constructor(private routineRepository: RoutineRepository) {}

  execute(): Promise<Exercise[]> {
    return this.routineRepository.getTodayRoutine();
  }
}