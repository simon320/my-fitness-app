import { Component } from "@angular/core";
import { ExploreExercisesComponent } from "./explore-exercises/pages/explore-exercises.component";
import { HeaderComponent } from "./header/header.component";
import { CreatedRoutinesComponent } from "./created-routines/created-routines.component";
import { ExerciseCartComponent } from "./explore-exercises/components/exercise-cart/exercise-cart.component";


@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    imports: [ ExploreExercisesComponent, HeaderComponent, CreatedRoutinesComponent, ExerciseCartComponent ]
})
export class HomeComponent {

}