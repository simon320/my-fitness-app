import { CompletedWorkouts } from "../../../domain/entities/completed-workouts";
import { CompletedWorkoutRepository } from "../../../domain/repositories/completed-workout.repository";

interface SaveCompletedWorkoutUseCase {
    execute( completedWorkout: CompletedWorkouts ): void
}


export class SaveCompletedWorkout implements SaveCompletedWorkoutUseCase {
  constructor(private repository: CompletedWorkoutRepository) {}

  execute( completedWorkout: CompletedWorkouts ): void {
    return this.repository.saveCompleteWorkout(completedWorkout);
  }
}
