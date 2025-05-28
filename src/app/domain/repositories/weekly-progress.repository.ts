import { WeeklyProgressPhoto } from "../entities/weekly-progress-photo.entity";

export interface WeeklyProgressRepository {
  save(photo: WeeklyProgressPhoto): void;
  getAll(): WeeklyProgressPhoto[];
}
