import { Exercise } from '../models/exercise';

export const ADD_TO_EXISTING_EXERCISE: string = 'ADD_TO_EXISTING_EXERCISE';

export function addToExistingExercise(exercise: Exercise, parentId: string) {
    return {
        type: ADD_TO_EXISTING_EXERCISE,
        payload: { exercise, parentId }
    };
}
