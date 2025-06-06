import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, effect, ElementRef, inject, Renderer2, signal, viewChild } from "@angular/core";

import { CrossSVG } from "../../../../../../assets/icons/cross.svg";
import { Routine } from "../../../../../domain/entities/routine.entity";
import { TruncatePipe } from "../../../../../shared/pipes/truncate.pipe";
import { DumbbellSVG } from "../../../../../../assets/icons/dumbbell.svg";
import { Exercise } from "../../../../../domain/entities/exercise.entity";
import { TrashCanComponent } from "../../../../../../assets/icons/trash-can.svg";
import { RoutineService } from "../../../../../application/services/routine.service";
import { SaveRoutine } from "../../../../../application/use-cases/routine/save-routine.usecase";
import { LocalStorageRoutineRepository } from "../../../../../infrastructure/local-storage/routine.repositoty";


type Flow = 'train' | 'calendar' | 'routine';

@Component({
    selector: 'app-exercise-cart',
    templateUrl: './exercise-cart.component.html',
    styleUrl: './exercise-cart.component.scss',
    imports: [CommonModule, FormsModule, TruncatePipe, DumbbellSVG, TrashCanComponent, CrossSVG]
})
export class ExerciseCartComponent {
    private repository = new LocalStorageRoutineRepository();
    private saveUseCase = new SaveRoutine(this.repository);
    private routineService = inject(RoutineService);
    private router = inject(Router);
    private render = inject(Renderer2);

    readonly routine = this.routineService.routineInTheProcessOfCreation;
    public addExerciseEffect = viewChild<ElementRef>('addExerciseEffect');
    public openModal = signal<boolean>(false);
    public calendarModal = signal<boolean>(false);
    public routineName = '';
    public routineDate = '';


    constructor() {
        effect(() => {
            if (this.routine() && this.routine()!.length > 0) {
                this.render.addClass(this.addExerciseEffect()?.nativeElement, 'animated')
                setTimeout(() => {
                    this.render.removeClass(this.addExerciseEffect()?.nativeElement, 'animated')
                }, 500)
            }
        });
    }


    public toggleOptions(acction: 'open' | 'close'): void {        
        this.openModal.set(acction === 'open');
    }


    public removeExercise(exercise: Exercise): void {
        (this.routine()?.length === 1) 
            && this.openModal.set(false);

        this.routineService.removeExercises(exercise);
    }


    public createRoutine(): Promise<boolean> | void {
        const routine: Routine = {
            id: Math.random().toString(36).substring(2, 15),
            name: this.routineName || 'Rutina personalizada',
            date: this.routineDate,
            exercises: this.routine()!
        };

        this.saveUseCase.execute(routine);
        this.routineService.activeRoutine.set(routine);
        this.routineService.clearExercisesList();
        this.toggleOptions('close');
        // TODO => Show success message
    }


    public createWorkoutFlow(): void {
        this.createRoutine();
        this.router.navigateByUrl('/workout');
    }


    public openModalCalendarFlow(): void {
        this.calendarModal.set(true);
    }


    public createCalendarFlow(): void {
        this.createRoutine();
        this.router.navigateByUrl('/calendar');
    }

}