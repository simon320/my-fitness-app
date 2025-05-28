import { Exercise } from "../../domain/entities/exercise.entity";
import { Routine } from "../../domain/entities/routine.entity";
import { RoutineRepository } from "../../domain/repositories/routine.repository";

interface GetRoutineByDateUseCase {
    execute( date: string ): Promise<Routine | null>
}

export class GetRoutineByDate implements GetRoutineByDateUseCase {

  constructor(private repository: RoutineRepository) {}

  async execute( date: string ): Promise<Routine | null> {
    return this.repository.getRoutineByDate(date);
  }
}