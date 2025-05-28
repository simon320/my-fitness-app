import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseCardComponent } from '../../../../shared/molecules/exercise-card/exercise-card.component';
import { GetTodayRoutineUseCase } from '../../../../application/use-cases/get-today-routine.usecase';
import { RoutineApiService } from '../../../../infrastructure/api/routine-api.service';

interface Exercise {
  name: string;
  reps: number;
  duration?: number;
}

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [CommonModule, ExerciseCardComponent],
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent {
  private routineRepo = inject(RoutineApiService);
  private getRoutine = new GetTodayRoutineUseCase(this.routineRepo);

  readonly exercises = signal<Exercise[]>([]);

  constructor() {
    this.loadRoutine();
  }

  private async loadRoutine() {
    const data = await this.getRoutine.execute();
    this.exercises.set(data);
  }
}