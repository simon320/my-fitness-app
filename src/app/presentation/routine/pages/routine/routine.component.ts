import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { RoutineApiService } from '../../../../infrastructure/api/routine-api.service';
import { GetRoutineByDate } from '../../../../application/use-cases/get-routine-by-date.usecase';
import { ExerciseCardComponent } from '../../../../shared/molecules/exercise-card/exercise-card.component';

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
  private routineRepository = inject(RoutineApiService);
  private getRoutine = new GetRoutineByDate(this.routineRepository);
  readonly exercises = signal<Exercise[]>([]);

  constructor() {
    this.loadRoutine();
  }

  private async loadRoutine() {
    const data = this.getRoutine.execute(new Date().toISOString().split('T')[0]);
    this.exercises.set(data?.exercises || []);
  }
}