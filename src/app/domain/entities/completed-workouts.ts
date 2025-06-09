import { Routine } from "./routine.entity";


export interface CompletedWorkouts extends Partial<Routine> {
    id: string;
    name: string;
    dayTrained: string; // ISO date
    exercisesName: string[];
    muscleGroup?: Set<string>;
}