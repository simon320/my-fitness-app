import { Exercise } from "./exercise";

export interface Routine {
  date: string; // ISO date
  name: string;
  exercises: Exercise[];
}
