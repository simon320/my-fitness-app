import { WeeklyProgressPhoto } from "../../../domain/entities/weekly-progress-photo.entity";
import { WeeklyProgressRepository } from "../../../domain/repositories/weekly-progress.repository";


interface GetAllWeeklyPhotosUseCase {
    execute(): WeeklyProgressPhoto[]
}


export class GetAllWeeklyPhotos implements GetAllWeeklyPhotosUseCase {
  constructor(private repository: WeeklyProgressRepository) {}

  execute() {
    return this.repository.getAll();
  }
}
