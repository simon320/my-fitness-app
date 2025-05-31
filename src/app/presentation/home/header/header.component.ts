import { TitleCasePipe } from "@angular/common";
import { Component, signal } from "@angular/core";


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    imports: [TitleCasePipe]
})
export class HeaderComponent {
    public nameUser = signal<string>('simOn');
    public userImg = signal<string>('');

    onProfileClick() {
        // Logic to handle profile click
        console.log("Profile clicked");
    }
}