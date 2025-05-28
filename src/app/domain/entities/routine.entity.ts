import { Exercise } from "./exercise.entity";

export interface Routine {
  date: string; // ISO date
  name: string;
  exercises: Exercise[];
}
