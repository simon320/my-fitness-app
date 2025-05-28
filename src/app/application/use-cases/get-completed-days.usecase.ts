import { CompletedDaysRepository } from "../../domain/repositories/completed-days.repository";

interface GetCompletedDaysUseCase {
    execute(): Set<string>
}

export class GetCompletedDays implements GetCompletedDaysUseCase {
  constructor(private completedDaysRepository: CompletedDaysRepository) {}

  execute(): Set<string> {
    return this.completedDaysRepository.getCompletedDays();
  }
}
