import { TitleCasePipe } from "@angular/common";
import { Component, inject, signal } from "@angular/core";

import { UserService } from "../../../application/services/user.service";
import { AvatarDefaulttSVG } from "../../../../assets/icons/avatar-default.svg";
import { ExerciseCartComponent } from "../explore-exercises/components/exercise-cart/exercise-cart.component";


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    imports: [TitleCasePipe, ExerciseCartComponent, AvatarDefaulttSVG]
})
export class HeaderComponent {
    private userService = inject(UserService);
    public nameUser = signal<string>('simOn');
    public userImg = signal<string | null>(null);
    
    ngOnInit() {
        this.userImg.set(this.userService.getAvatar());
    }

    onProfileClick() {
        // Logic to handle profile click
        console.log("Profile clicked");
    }
}