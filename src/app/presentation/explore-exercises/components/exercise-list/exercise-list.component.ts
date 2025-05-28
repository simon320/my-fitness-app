import { Component, OnChanges, Input } from '@angular/core';

import { Exercise } from '../../../../domain/entities/exercise.entity';
import { ExerciseDbApiService } from '../../../../infrastructure/api/exercise-db-api.service';



@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [],
  templateUrl: './exercise-list.component.html',
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

}
