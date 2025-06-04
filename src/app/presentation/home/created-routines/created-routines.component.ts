import { Component, inject, signal } from "@angular/core";

import { Routine } from "../../../domain/entities/routine.entity";
import { GetAllRoutine } from "../../../application/use-cases/routine/get-all-routine";
import { LocalStorageRoutineRepository } from "../../../infrastructure/local-storage/routine.repositoty";

interface RoutineExercise extends Routine {
    muscleGroup?: Set<string>;
}

@Component({
    selector: "app-created-routines",
    templateUrl: "./created-routines.component.html",
    styleUrls: ["./created-routines.component.scss"],
    providers: [LocalStorageRoutineRepository]
})
export class CreatedRoutinesComponent {
    private repository = inject(LocalStorageRoutineRepository);
    private getAllRoutine = new GetAllRoutine(this.repository);
    public routines = signal<RoutineExercise[]>([]);

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

}