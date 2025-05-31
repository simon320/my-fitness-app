import { Component } from "@angular/core";
import { ExploreExercisesComponent } from "./explore-exercises/pages/explore-exercises.component";
import { HeaderComponent } from "./header/header.component";


@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    imports: [ExploreExercisesComponent, HeaderComponent]
})
export class HomeComponent {

}