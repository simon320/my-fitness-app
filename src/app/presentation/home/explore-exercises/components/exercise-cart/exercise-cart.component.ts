import { Router } from "@angular/router";
import { Component, effect, ElementRef, inject, Renderer2, signal, viewChild } from "@angular/core";

import { Routine } from "../../../../../domain/entities/routine.entity";
import { RoutineService } from "../../../../../application/services/routine.service";
import { SaveRoutine } from "../../../../../application/use-cases/routine/save-routine.usecase";
import { LocalStorageRoutineRepository } from "../../../../../infrastructure/local-storage/routine.repositoty";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TruncatePipe } from "../../../../../shared/pipes/truncate.pipe";
import { Exercise } from "../../../../../domain/entities/exercise.entity";

type Flow = 'train' | 'calendar' | 'routine';

@Component({
    selector: 'app-exercise-cart',
    templateUrl: './exercise-cart.component.html',
    styleUrl: './exercise-cart.component.scss',
    imports: [ CommonModule, FormsModule, TruncatePipe ]
})
export class ExerciseCartComponent {
removeExercise(_t20: Exercise) {
throw new Error('Method not implemented.');
}
    private repository = new LocalStorageRoutineRepository();
    private saveUseCase = new SaveRoutine(this.repository);
    private routineService = inject(RoutineService);
    private router = inject(Router);
    private render = inject(Renderer2);

    readonly routine = this.routineService.routineInTheProcessOfCreation;
    public addExerciseEffect = viewChild<ElementRef>('addExerciseEffect');
    public openModal = signal<boolean>(false);
    public routineName = '';



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

    public createRoutine(flow: Flow, date?: string): Promise<boolean> | void {
        const routine: Routine = {
            id: Math.random().toString(36).substring(2, 15),
            name: this.routineName || 'Rutina personalizada',
            date: date || '',
            exercises: this.routine()!
        };

        this.saveUseCase.execute(routine);
        this.routineService.activeRoutine.set(routine);

        // TODO => Show success message

        switch (flow) {
            case 'train': return this.router.navigateByUrl('/workout');
            case 'calendar': 
                
                return this.router.navigateByUrl('/calendar');
            case 'routine':
                this.routineService.clearExercisesList();
                this.openModal.set(false);
                break;
        }
    }

    public toggleOptions(acction: 'open' | 'close'): void {        
        this.openModal.set(acction === 'open');
    }
}