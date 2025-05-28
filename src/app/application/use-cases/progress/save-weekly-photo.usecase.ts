import { WeeklyProgressPhoto } from "../../../domain/entities/weekly-progress-photo.entity";
import { WeeklyProgressRepository } from "../../../domain/repositories/weekly-progress.repository";

interface SaveWeeklyPhotoUseCase {
    execute( photo: WeeklyProgressPhoto ): void
}


export class SaveWeeklyPhoto implements SaveWeeklyPhotoUseCase {
  constructor(private repository: WeeklyProgressRepository) {}

  execute(photo: WeeklyProgressPhoto) {
    this.repository.save(photo);
  }
}
