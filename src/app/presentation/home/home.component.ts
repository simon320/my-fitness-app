import { Component } from "@angular/core";

import { HeaderComponent } from "./header/header.component";
import { CreatedRoutinesComponent } from "./created-routines/created-routines.component";
import { ExploreExercisesComponent } from "./explore-exercises/pages/explore-exercises.component";


@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    imports: [ ExploreExercisesComponent, HeaderComponent, CreatedRoutinesComponent ]
})
export class HomeComponent {

}