import { Exercise } from "../../domain/entities/exercise.entity";
import { RoutineRepository } from "../../domain/repositories/routine.repository";

interface GetExercisesByMuscleUseCase {
    execute(muscleId: number): Promise<Exercise[]>
}

export class GetExercisesByMuscle implements GetExercisesByMuscleUseCase {
    constructor(private repository: RoutineRepository) {}
  
    async execute(muscleId: number): Promise<Exercise[]> {
        return this.repository.getExercisesByMuscle(muscleId);
    }
}