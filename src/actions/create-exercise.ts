import { Exercise } from '../models/exercise';

export const CREATE_EXERCISE: string = 'CREATE_EXERCISE';

export function createExercise(exercise: Exercise) {
    return {
        type: CREATE_EXERCISE,
        payload: { exercise }
    }
}