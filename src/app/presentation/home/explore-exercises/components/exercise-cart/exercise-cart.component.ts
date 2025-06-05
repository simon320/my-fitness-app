import { Component, inject } from "@angular/core";
import { RoutineService } from "../../../../../application/services/routine.service";


@Component({
    selector: 'app-exercise-cart',
    templateUrl: './exercise-cart.component.html',
    styleUrl: './exercise-cart.component.scss'
})
export class ExerciseCartComponent {
    private routineService = inject(RoutineService);
    readonly routine = this.routineService.routineInTheProcessOfCreation;
}