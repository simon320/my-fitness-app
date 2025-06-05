import { TitleCasePipe } from "@angular/common";
import { Component, signal } from "@angular/core";
import { ExerciseCartComponent } from "../explore-exercises/components/exercise-cart/exercise-cart.component";


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    imports: [TitleCasePipe, ExerciseCartComponent]
})
export class HeaderComponent {
    public nameUser = signal<string>('simOn');
    public userImg = signal<string>('');

    onProfileClick() {
        // Logic to handle profile click
        console.log("Profile clicked");
    }
}