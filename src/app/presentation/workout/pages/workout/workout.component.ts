import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import { Exercise } from '../../../../domain/entities/exercise.entity';
import { RoutineService } from '../../../../application/services/routine.service';
import { WorkoutTimerComponent } from '../../../../shared/organisms/workout-timer/workout-timer.component';
import { CircleButtonComponent } from '../../../../shared/atoms/circle-button/circle-button.component';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { ArrowButton } from "../../../../shared/atoms/arrow-button/arrow-button.component";


const mockExercises = [
    {
        "bodyPart": "lower arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/zoNZ7uaXQRD1KS",
        "id": "0079",
        "name": "barbell revers wrist curl v. 2",
        "target": "forearms",
        "secondaryMuscles": [
            "biceps",
            "brachialis"
        ],
        "instructions": [
            "Sit on a bench with your feet flat on the ground and your knees bent.",
            "Hold a barbell with an overhand grip, palms facing down, and your hands shoulder-width apart.",
            "Rest your forearms on your thighs, allowing your wrists to hang off the edge.",
            "Keeping your forearms stationary, exhale and curl your wrists upward as far as possible.",
            "Hold the contracted position for a brief pause, then inhale and slowly lower the barbell back to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/ISvKNP17dzVbd4",
        "id": "0082",
        "name": "barbell reverse wrist curl",
        "target": "forearms",
        "secondaryMuscles": [
            "biceps",
            "brachialis"
        ],
        "instructions": [
            "Sit on a bench with your feet flat on the ground and hold a barbell with an overhand grip, palms facing down.",
            "Rest your forearms on your thighs, allowing your wrists to hang off the edge.",
            "Slowly curl your wrists upward, bringing the barbell towards your body.",
            "Pause for a moment at the top, then slowly lower the barbell back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/CEiSuI5kCHKUKJ",
        "id": "0104",
        "name": "barbell standing back wrist curl",
        "target": "forearms",
        "secondaryMuscles": [
            "biceps",
            "shoulders"
        ],
        "instructions": [
            "Stand up straight with your feet shoulder-width apart and hold a barbell with an overhand grip.",
            "Rest the barbell on the back of your hands with your palms facing down and your fingers pointing towards your body.",
            "Keeping your upper arms stationary, exhale and curl your wrists upwards as far as possible.",
            "Hold the contracted position for a brief pause, then inhale and slowly lower the barbell back to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/PpqWNTle27-nqn",
        "id": "0125",
        "name": "barbell wrist curl v. 2",
        "target": "forearms",
        "secondaryMuscles": [
            "biceps",
            "brachialis"
        ],
        "instructions": [
            "Sit on a bench with your feet flat on the ground and your knees bent.",
            "Hold a barbell with an underhand grip, palms facing up, and your hands shoulder-width apart.",
            "Rest your forearms on your thighs, allowing your wrists to hang off the edge.",
            "Slowly curl your wrists upward, bringing the barbell towards your forearms.",
            "Pause for a moment at the top, then slowly lower the barbell back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/gkkL3nagT8Yfm8",
        "id": "0126",
        "name": "barbell wrist curl",
        "target": "forearms",
        "secondaryMuscles": [
            "biceps",
            "brachialis"
        ],
        "instructions": [
            "Sit on a bench with your feet flat on the ground and your forearms resting on your thighs, holding a barbell with an underhand grip.",
            "Allow the barbell to roll down to your fingertips, keeping your wrists straight.",
            "Slowly curl the barbell up towards your forearms by flexing your wrists.",
            "Pause for a moment at the top, then slowly lower the barbell back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    }
]

@Component({
  selector: 'app-workout',
  imports: [CommonModule, WorkoutTimerComponent, CircleButtonComponent, TruncatePipe, ArrowButton],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent {
  private readonly routineService = inject(RoutineService);
  // public exercises = signal<Exercise[]>(this.routineService.activeRoutine()?.exercises || []);
  public exercises = signal<Exercise[]>(mockExercises);
  public hasNext = computed(() => this.currentIndex() < this.exercises().length - 1);
  public hasPrev = computed(() => this.currentIndex() > 0);
  public readonly currentExercise = computed(() => this.exercises()[this.currentIndex()]);
  public currentIndex = signal(0);

  public readonly progressPercentage = computed(() => ((this.currentIndex() + 1) / this.exercises().length) * 100 );
  public readonly completedExercises = computed(() => this.exercises().slice(0, this.currentIndex()) );

  public isTraining = signal<boolean>(false);

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
    // alert(`Ejercicio completado: ${this.currentExercise().name}`);
    // this.nextExercise();
    console.log(this.exercises());
    
    this.isTraining.set(!this.isTraining());
  }

}