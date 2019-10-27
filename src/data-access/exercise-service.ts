import { AxiosResponse } from "axios";
import { Exercise } from "../models/exercise";
import { AddExercise } from "../models/add-exercise";

export interface ExerciseService {
    getExercises(): Promise<Exercise[]>;
    postExercise(exercise: AddExercise): Promise<any>;
    deleteExercisebyId(id: string): Promise<void>;
}