import { Component } from "@angular/core";
import { BodyPartFilterComponent } from "../components/body-part-filter/body-part-filter.component";
import { ExerciseListComponent } from "../components/exercise-list/exercise-list.component";


@Component({
  selector: 'app-explore-exercises',
  imports: [BodyPartFilterComponent, ExerciseListComponent],
  templateUrl: './explore-exercises.component.html',
})
export class ExploreExercisesComponent {
  selectedBodyPart: string = '';

  onBodyPartSelected(bodyPart: string) {
    this.selectedBodyPart = bodyPart;
  }
}