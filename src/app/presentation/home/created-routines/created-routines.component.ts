import { Router } from "@angular/router";
import { Component, inject, signal } from "@angular/core";

import { Routine } from "../../../domain/entities/routine.entity";
import { DumbbellSVG } from "../../../../assets/icons/dumbbell.svg";
import { RoutineService } from "../../../application/services/routine.service";
import { GetAllRoutine } from "../../../application/use-cases/routine/get-all-routine";
import { LocalStorageRoutineRepository } from "../../../infrastructure/local-storage/routine.repositoty";


@Component({
    selector: "app-created-routines",
    templateUrl: "./created-routines.component.html",
    styleUrls: ["./created-routines.component.scss"],
    providers: [LocalStorageRoutineRepository],
    imports: [DumbbellSVG]
})
export class CreatedRoutinesComponent {
    private repository = inject(LocalStorageRoutineRepository);
    private getAllRoutine = new GetAllRoutine(this.repository);
    private routineService = inject(RoutineService);
    private router = inject(Router);
    public routines = signal<Routine[]>([]);

    ngOnInit() {
        this.intializeExercises();
    }

    private intializeExercises() {
        this.getAllRoutine.execute().subscribe({
            next: (routines) => {
                if (routines !== null && routines.length > 0) {
                    this.routines.set(routines)
                }
            },
            error: (error) => {
                console.error('Error fetching routines:', error);
            }
        });
        this.getGroupMuscle();
        this.addImageToRoutine();
    }

    private getGroupMuscle(): void {
        const muscleGroups = new Set<string>();
        this.routines().map(routine => {

            routine.exercises.forEach(exercise => {
                muscleGroups.add(exercise.bodyPart);
            });

            routine.muscleGroup = muscleGroups;                            
        });
    }

    private addImageToRoutine(): void {
        const muscleGroups = new Set<string>();
        this.routines().map(routine => {
            routine.image = '/assets/background-exercise/pectoral.png'; // Default image                         
        });
    }

    public startRoutine(routine: Routine) {
        this.routineService.activeRoutine.set(routine);
        this.router.navigateByUrl('/workout');
    }

}