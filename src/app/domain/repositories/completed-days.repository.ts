
export abstract class CompletedDaysRepository {
  abstract getCompletedDays(): Set<string>;
  abstract toggleDay(dateKey: string): Set<string>;
}
