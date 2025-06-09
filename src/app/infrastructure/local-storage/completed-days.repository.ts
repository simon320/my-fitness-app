import { CompletedWorkouts } from "../../domain/entities/completed-workouts";
import { CompletedWorkoutRepository } from "../../domain/repositories/completed-workout.repository";

export class LocalStorageCompletedWorkoutRepository implements CompletedWorkoutRepository {
  private readonly STORAGE_KEY = 'completedWorkout';

  public saveCompleteWorkout(completedWorkouts: CompletedWorkouts): void {
    return this.save(completedWorkouts);
  }


  public getAllCompletedWorkouts(): CompletedWorkouts[] | null {
    return this.load();
  }

  
  public getCompleteWorkoutByDate(dateKey: string): CompletedWorkouts | null {
    const allCompletedRoutine = this.load();
    
    if (!allCompletedRoutine)
      return null;
    
    const workoutByDate = allCompletedRoutine.find( workout => workout.date === dateKey);
    return workoutByDate ? workoutByDate : null;
  }


  private load(): CompletedWorkouts[] | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }


  private save(completedWorkout: CompletedWorkouts) {
    const current = this.load();
    const updated = current ? [...current, completedWorkout] : [completedWorkout];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
  }

}
