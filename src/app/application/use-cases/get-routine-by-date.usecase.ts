import { Routine } from "../../domain/entities/routine";
import { RoutineRepository } from "../../domain/repositories/routine.repository";

interface GetRoutineByDateUseCase {
    execute( date: string ): Routine | null
}

export class GetRoutineByDate implements GetRoutineByDateUseCase {

  constructor(private repo: RoutineRepository) {}

  execute(date: string) {
    return this.repo.getRoutineByDate(date);
  }
}