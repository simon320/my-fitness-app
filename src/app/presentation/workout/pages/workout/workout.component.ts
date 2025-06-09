import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, input, Renderer2, signal, viewChild } from '@angular/core';

import { CheckSVG } from "../../../../../assets/icons/check.svg";
import { Routine } from '../../../../domain/entities/routine.entity';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { Exercise } from '../../../../domain/entities/exercise.entity';
import { FormatTimePipe } from '../../../../shared/pipes/format-time.pipe';
import { TrashCanComponent } from "../../../../../assets/icons/trash-can.svg";
import { RoutineService } from '../../../../application/services/routine.service';
import { FormatPercentagePipe } from "../../../../shared/pipes/format-percentage.pipe";
import { ArrowButton } from "../../../../shared/atoms/arrow-button/arrow-button.component";



@Component({
    selector: 'app-workout',
    imports: [CommonModule, TruncatePipe, FormatTimePipe, ArrowButton, FormatPercentagePipe, TrashCanComponent, CheckSVG],
    templateUrl: './workout.component.html',
    styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent {
    private routineService = inject(RoutineService);
    private router = inject(Router);
    private render = inject(Renderer2);
    public elementPercentage = viewChild<ElementRef>('percentage');
    public routine = signal<Routine | null>(null);
    public exercises = signal<Exercise[]>([]);
    public hasNext = computed(() => this.currentIndex() < this.exercises().length - 1);
    public hasPrev = computed(() => this.currentIndex() > 0);
    public currentExercise = computed(() => this.exercises()[this.currentIndex()]);
    public currentIndex = signal(0);
    public isTraining = signal<boolean>(false);
    public listExerciseOpen = signal<boolean>(false);
    public completedExercises = signal<Set<number>>(new Set());
    public finishRoutine = signal<boolean>(false);
    private intervalId: any;
    readonly isRunning = signal(false);
    public countdown = input<number | undefined>();
    readonly time = signal(0);

    public progressPercentage = computed(() => {
        const total = this.exercises().length;
        const completed = this.completedExercises().size;

        return (completed / total) * 100;
    });

    readonly displayTime = computed(() => { 
        const cd = this.countdown();
        return cd ? cd - this.time() : this.time();
    });

    constructor() {
        this.intializeExercises();

        effect(() => {
            if (this.isRunning()) {
                this.startInterval();
            } else {
                this.clearInterval();
            }
        });

        // Si es countdown, preestablecer tiempo en 0.
        effect(() => {
            if (this.countdown()) {
                this.time.set(0);
            }
        });
    }


    private intializeExercises(): void {
        this.routine.set(this.routineService.activeRoutine());
        this.routine() && this.exercises.set(this.routine()!.exercises);
    }


    public navigateBy(path: string): void {
        this.router.navigate(['/home'], { fragment: path });
    }


    public startRoutine(): void {
        this.toggleTimer();
        this.isRunning.set(true);
        this.isTraining.set(true);
    }


    public removeExercise(exercise: Exercise): void {
        if(this.exercises().length === 1) {
            alert("La rutina debe tener al menos un ejercicio");
            return;
        }

        this.routine.update(prev => {
            if (!prev) 
                return prev;

            const editExercises = prev.exercises.filter(e => e.id !== exercise.id);
            return { ...prev, exercises: editExercises };
        });
        this.routineService.activeRoutine.set(this.routine());
        this.exercises.set(this.routine()!?.exercises);
    }
    

    public toggleListExercise(): void {
        this.listExerciseOpen.set( !this.listExerciseOpen() );
    }


    public nextExercise(): void {
        const current = this.currentIndex();
        const lastIndex = this.exercises().length - 1;

        if(current === lastIndex) {
            this.finishAnimated();
            setTimeout(() => {
                this.finishRoutine.set(true);
            }, 600);
        }
            

        // Marcar como completado antes de avanzar (si no está)
        if (!this.completedExercises().has(current)) {
            const updated = new Set(this.completedExercises());
            updated.add(current);
            this.completedExercises.set(updated);
        }

        // Avanzar si no es el último
        if (current < lastIndex) {
            this.currentIndex.set(current + 1);
        }
    }


    public previousExercise(): void {
        const current = this.currentIndex();
        
        // Si lo había marcado como hecho, lo quitamos del set
        const updated = new Set(this.completedExercises());
        if (updated.has(current)) {
            updated.delete(current);
            this.completedExercises.set(updated);
        }
        if (current > 0) {
            this.currentIndex.set(current - 1);
        }
    }


    public itsTheLastExercise(): boolean {
        return ( this.currentIndex() == this.exercises().length - 1 );
    }


    private finishAnimated(): void {
        this.render.addClass(this.elementPercentage()?.nativeElement, 'animated');
    }


    // Timer Methods
    private startInterval() {
        this.intervalId = setInterval(() => {
            const cd = this.countdown();
            this.time.update((t) => {
                if (cd && t >= cd) {
                    this.isRunning.set(false);
                    return t;
                }
                return t + 1;
            });
        }, 1000);
    }


    private clearInterval() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }


    public reset(): void {
        this.time.set(0);
        this.isRunning.set(false);
    }


    public toggleTimer(): void {
        this.isRunning.update((r) => !r);
    }
    

    ngOnDestroy(): void {
        this.clearInterval();
    }
}