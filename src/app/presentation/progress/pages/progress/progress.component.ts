import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

import { WeeklyProgressPhoto } from '../../../../domain/entities/weekly-progress-photo.entity';
import { SaveWeeklyPhoto } from '../../../../application/use-cases/progress/save-weekly-photo.usecase';
import { GetAllWeeklyPhotos } from '../../../../application/use-cases/progress/get-all-weekly-photos.usecase';
import { LocalStorageWeeklyPhotoRepository } from '../../../../infrastructure/local-storage/localstorage-weekly-photo.repository';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  imports: [ DatePipe ],
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent {
  private repository = new LocalStorageWeeklyPhotoRepository();
  private saveUseCase = new SaveWeeklyPhoto(this.repository);
  private getAllUseCase = new GetAllWeeklyPhotos(this.repository);

  public photos = signal<WeeklyProgressPhoto[]>([]);
  public file = signal<File | null>(null);


  constructor() {
    this.loadPhotos();
  }


  private loadPhotos(): void {
    const all = this.getAllUseCase.execute().sort((a, b) => b.weekNumber - a.weekNumber);
    this.photos.set(all);
  }


  public onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.file.set(target.files[0]);
    }
  }

  public async upload(): Promise<void> {
    const file = this.file();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const now = new Date();
      const weekNumber = this.getISOWeek(now);
      const year = now.getFullYear();

      const photo: WeeklyProgressPhoto = {
        id: crypto.randomUUID(),
        weekNumber,
        year,
        imageBase64: base64,
        dateUploaded: now.toISOString(),
      };

      this.saveUseCase.execute(photo);
      this.loadPhotos();
      this.file.set(null);
    };

    reader.readAsDataURL(file);
  }

  private getISOWeek(date: Date): number {
    const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = tmp.getUTCDay() || 7;
    tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
    return Math.ceil((((tmp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }
}
