import { Component, OnChanges, Input } from '@angular/core';

import { Exercise } from '../../../../domain/entities/exercise.entity';
import { ExerciseDbApiService } from '../../../../infrastructure/api/exercise-db-api.service';



@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.scss',
})
export class ExerciseListComponent implements OnChanges {
  @Input() selectedBodyPart: string = '';
  exercises: Exercise[] = [];

  constructor(private exerciseService: ExerciseDbApiService) {}

  ngOnChanges() {
    if (this.selectedBodyPart) {
      this.exerciseService
        .getExercisesByBodyPart(this.selectedBodyPart)
        .subscribe((exercises) => {
          this.exercises = exercises;
        });
    }
  }



  ////////////// TODO => Review this code
  selectedExercises: any[] = [];

  toggleSelection(exercise: any): void {
    const exists = this.selectedExercises.find(e => e.id === exercise.id);
    if (exists) {
      this.selectedExercises = this.selectedExercises.filter(e => e.id !== exercise.id);
    } else {
      this.selectedExercises.push(exercise);
    }
  }

  isSelected(exercise: any): boolean {
    return this.selectedExercises.some(e => e.id === exercise.id);
  }

}
