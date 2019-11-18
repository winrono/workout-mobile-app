import { DailyWorkout } from '../models/daily-workout';
import { getShortDate } from '../utils/date';
import exerciseStorage from '../data-access/exercise-storage';

export function initialize() {
    return async function(dispatch) {
        await exerciseStorage.initialize();
        let date = getShortDate(new Date());
        let workouts = await exerciseStorage.getActiveWorkouts(date);
        dispatch(onReady(workouts));
    };
}

export const ON_READY = 'ON_READY';

export function onReady(workouts: DailyWorkout[]) {
    return {
        type: ON_READY,
        payload: workouts
    };
}
