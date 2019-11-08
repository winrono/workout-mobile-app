import { Exercise } from '../models/exercise';

export const DELETE_EXERCISE: string = 'DELETE_EXERCISE';

export function deleteExercise(exercise: Exercise) {
    return {
        type: DELETE_EXERCISE,
        payload: exercise
    }
}