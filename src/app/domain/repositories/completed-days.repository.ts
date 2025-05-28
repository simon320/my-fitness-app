
export interface CompletedDaysRepository {
  getCompletedDays(): Set<string>;
  toggleDay(dateKey: string): Set<string>;
}
