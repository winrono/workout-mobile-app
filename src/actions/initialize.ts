import { AsyncStorage } from 'react-native';
import { DailyWorkout } from '../models/daily-workout';
import { getShortDate } from '../utils/date';
import exerciseStorage from '../data-access/exercise-storage';

const storageKeyPrefix: string = 'workout';

export function initialize() {
    return async function (dispatch) {
        await exerciseStorage.initialize();
        let date = getShortDate(new Date());
        let workouts = await getActiveWorkouts(date);
        dispatch(onReady(workouts));
    }
}

export const ON_READY = 'ON_READY';

export function onReady(workouts: DailyWorkout[]) {
    return {
        type: ON_READY,
        payload: workouts
    }
}

async function getActiveWorkouts(date: string): Promise<DailyWorkout[]> {


    let prevDay: Date | string = new Date(date);
    prevDay.setDate(prevDay.getDate() - 1);
    prevDay = getShortDate(prevDay);

    let nextDay: Date | string = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay = getShortDate(nextDay);

    let workouts: DailyWorkout[] = [exerciseStorage.getWorkoutByShortDate(prevDay), exerciseStorage.getWorkoutByShortDate(date), exerciseStorage.getWorkoutByShortDate(nextDay)];

    return Promise.resolve(workouts);
}