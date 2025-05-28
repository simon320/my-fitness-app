import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutTimerComponent } from '../../../../shared/atoms/workout-timer/workout-timer.component';
import { Exercise } from '../../../../domain/entities/exercise';
import { RoutineService } from '../../../../application/services/routine.services';

@Component({
  selector: 'app-workout',
  imports: [CommonModule, WorkoutTimerComponent],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent {
  readonly routineService = inject(RoutineService);
  readonly routine = this.routineService.activeRoutine;
  
  public exercises = signal<Exercise[]>([
    { name: 'Flexiones', reps: 15 },
    { name: 'Plancha', reps: 1, duration: 60 },
    { name: 'Sentadillas', reps: 20 },
    { name: 'Burpees', reps: 10 },
    { name: 'Descanso', reps: 1, duration: 30 }
  ]);

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