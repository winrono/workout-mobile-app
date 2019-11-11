import { Exercise } from '../models/exercise';

export const ADD_COMPOUND_EXERCISE: string = 'ADD_COMPOUND_EXERCISE';

export function addCompoundExercise(exercise: Exercise, neighborId: string) {
    return {
        type: ADD_COMPOUND_EXERCISE,
        payload: { exercise, neighborId }
    };
}
