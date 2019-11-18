import { SetActiveWorkouts } from './set-active-workouts';
import exerciseStorage from '../data-access/exercise-storage';

export function setDate(date: string) {
    return async function(dispatch) {
        let workouts = await exerciseStorage.getActiveWorkouts(date);

        dispatch(SetActiveWorkouts(workouts));
    };
}
