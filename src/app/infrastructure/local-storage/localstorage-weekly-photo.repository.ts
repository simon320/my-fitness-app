import { WeeklyProgressPhoto } from "../../domain/entities/weekly-progress-photo.entity";
import { WeeklyProgressRepository } from "../../domain/repositories/weekly-progress.repository";


const STORAGE_KEY = 'weekly_progress_photos';

export class LocalStorageWeeklyPhotoRepository implements WeeklyProgressRepository {
  save(photo: WeeklyProgressPhoto): void {
    const all = this.getAll();
    const updated = all.filter(p => !(p.weekNumber === photo.weekNumber && p.year === photo.year));
    updated.push(photo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  getAll(): WeeklyProgressPhoto[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
}
