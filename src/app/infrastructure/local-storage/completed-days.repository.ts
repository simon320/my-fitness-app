import { CompletedDaysRepository } from "../../domain/repositories/completed-days.repository";

export class LocalStorageCompletedDaysRepository implements CompletedDaysRepository {
  private readonly STORAGE_KEY = 'completedDays';

  private load(): Set<string> {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  }

  private save(set: Set<string>) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(Array.from(set)));
  }

  getCompletedDays(): Set<string> {
    return this.load();
  }

  toggleDay(dateKey: string): Set<string> {
    const current = this.load();
    current.has(dateKey) ? current.delete(dateKey) : current.add(dateKey);
    this.save(current);
    return current;
  }
}
