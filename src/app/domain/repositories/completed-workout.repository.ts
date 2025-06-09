import { CompletedWorkouts } from "../entities/completed-workouts";

export interface CompletedWorkoutRepository {
  getAllCompletedWorkouts(): CompletedWorkouts[] | null;
  getCompleteWorkoutByDate(dateKey: string): CompletedWorkouts | null;
  saveCompleteWorkout(completedWorkouts: CompletedWorkouts): void;
}
