import { SetActiveWorkouts } from './set-active-workouts';
import workoutStorage from '../data-access/workout-storage';

export function setDate(date: string) {
    return async function(dispatch) {
        let workouts = await workoutStorage.getActiveWorkouts(date);

        dispatch(SetActiveWorkouts(workouts));
    };
}
