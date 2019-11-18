import { Exercise } from '../models/exercise';

export const ADD_EXERCISE: string = 'ADD_EXERCISE';

export function AddExercise(exercise: Exercise) {
    return {
        type: ADD_EXERCISE,
        payload: { exercise }
    }
}