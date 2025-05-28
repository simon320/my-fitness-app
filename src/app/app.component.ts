import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './presentation/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-fitness-app';
}
