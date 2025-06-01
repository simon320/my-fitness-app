import { Component, inject, signal } from "@angular/core";
import { BodyPartFilterComponent } from "../components/body-part-filter/body-part-filter.component";
import { ExerciseListComponent } from "../components/exercise-list/exercise-list.component";
import { RoutineService } from "../../../../application/services/routine.service";


@Component({
  selector: 'app-explore-exercises',
  imports: [BodyPartFilterComponent, ExerciseListComponent],
  templateUrl: './explore-exercises.component.html',
  styleUrls: ['./explore-exercises.component.scss'],
})
export class ExploreExercisesComponent {
  public selectedBodyPart: string = '';
  private routineService = inject(RoutineService);
  public isThereAnySelected = signal<boolean>(false);

 
  public onBodyPartSelected(bodyPart: string) {
    this.selectedBodyPart = bodyPart;
  }

  public selectionWasChanged() {
    console.log('Selection was changed');

    console.log(this.routineService.activeRoutine()?.exercises);
    
    
    this.isThereAnySelected.set(
      ((this.routineService.activeRoutine()?.exercises ?? []).length > 0)
    );
  }

}