
export interface Routine {
  date: string; // ISO date
  name: string;
  exercises: {
    name: string;
    repetitions: number;
    sets: number;
  }[];
}
