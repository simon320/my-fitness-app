import { Component, input } from '@angular/core';


@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [],
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss']
})
export class ExerciseCardComponent {
  name = input<string>();
  reps = input<number>();
  duration = input<number | undefined>();
}
