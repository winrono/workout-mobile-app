import { DailyWorkout } from '../models/daily-workout';

export interface ExerciseService {
    getWorkouts(): Promise<DailyWorkout[]>;
    getWorkoutByDate(dateTime: string | Date): Promise<DailyWorkout>;
    addExercise(name: string, date: Date): Promise<any>;
    // updateSet(set: Set): Promise<any>;
    // postSuperSet(set: SuperSet): Promise<any>;
    // postExercise(name: string, date: Date);
    // deleteSetById(id: string): Promise<void>;
}
