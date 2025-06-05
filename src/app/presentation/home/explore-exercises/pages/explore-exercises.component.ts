import { Component } from "@angular/core";

import { ExerciseListComponent } from "../components/exercise-list/exercise-list.component";
import { BodyPartFilterComponent } from "../components/body-part-filter/body-part-filter.component";
import { SearchByMuscleComponent } from "../components/search-by-muscle/search-by-muscle.component";


@Component({
  selector: 'app-explore-exercises',
  imports: [BodyPartFilterComponent, ExerciseListComponent, SearchByMuscleComponent],
  templateUrl: './explore-exercises.component.html',
  styleUrls: ['./explore-exercises.component.scss'],
})
export class ExploreExercisesComponent {
  public selectedBodyPart: string = '';
 
  
  public onBodyPartSelected(bodyPart: string) {
    this.selectedBodyPart = bodyPart;
  }

}