import { Component } from "@angular/core";

import { ExerciseListComponent } from "../components/exercise-list/exercise-list.component";
import { BodyPartFilterComponent } from "../components/body-part-filter/body-part-filter.component";


@Component({
  selector: 'app-explore-exercises',
  imports: [BodyPartFilterComponent, ExerciseListComponent],
  templateUrl: './explore-exercises.component.html',
  styleUrls: ['./explore-exercises.component.scss'],
})
export class ExploreExercisesComponent {
  public selectedBodyPart: string = '';
 
  
  public onBodyPartSelected(bodyPart: string) {
    this.selectedBodyPart = bodyPart;
  }

}