import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { Exercise } from '../../../../domain/entities/exercise.entity';
import { RoutineService } from '../../../../application/services/routine.services';
import { WorkoutTimerComponent } from '../../../../shared/atoms/workout-timer/workout-timer.component';

@Component({
  selector: 'app-workout',
  imports: [CommonModule, WorkoutTimerComponent],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent {
  private readonly routineService = inject(RoutineService);
  public exercises = signal<Exercise[]>(this.routineService.activeRoutine()?.exercises || []);

  public hasNext = computed(() => this.currentIndex() < this.exercises().length - 1);
  public hasPrev = computed(() => this.currentIndex() > 0);

  public readonly currentExercise = computed(() => this.exercises()[this.currentIndex()]);

  public currentIndex = signal(0);

  public readonly progressPercentage = computed(() => ((this.currentIndex() + 1) / this.exercises().length) * 100 );
  
  public readonly completedExercises = computed(() => this.exercises().slice(0, this.currentIndex()) );

  nextExercise() {
    if (this.currentIndex() < this.exercises().length - 1) {
      this.currentIndex.update(i => i + 1);
    }
  }

  previousExercise() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
    }
  }

  markAsCompleted() {
    alert(`Ejercicio completado: ${this.currentExercise().name}`);
    this.nextExercise();
  }

}