import { CompletedDaysRepository } from "../../domain/repositories/completed-days.repository";

interface ToggleCompletedDayUseCase {
    execute( dateKey: string ): Set<string>
}


export class ToggleCompletedDay implements ToggleCompletedDayUseCase {
  
  constructor(private completedDaysRepository: CompletedDaysRepository) {}

  execute(dateKey: string): Set<string> {
    return this.completedDaysRepository.toggleDay(dateKey);
  }
}