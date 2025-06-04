import { Exercise } from "./exercise.entity";

export interface Routine {
  id: string;
  date: string; // ISO date
  name: string;
  exercises: Exercise[];
  muscleGroup?: Set<string>;
  image?: string;
}
