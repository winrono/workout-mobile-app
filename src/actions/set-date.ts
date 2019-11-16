import { AsyncStorage } from 'react-native';
import { DailyWorkout } from '../models/daily-workout';
import { SetActiveWorkouts } from './set-active-workouts';
import { getShortDate } from '../utils/date';
import exerciseStorage from '../data-access/exercise-storage';

export function setDate(date: string) {

    return async function (dispatch) {

        let workouts = await getActiveWorkouts(date);

        dispatch(SetActiveWorkouts(workouts));
    }
}

async function getActiveWorkouts(date: string): Promise<DailyWorkout[]> {

    let prevDay: Date | string = new Date(date);
    prevDay.setDate(prevDay.getDate() - 1);
    prevDay = getShortDate(prevDay);

    let nextDay: Date | string = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay = getShortDate(nextDay);

    let workouts: DailyWorkout[] = [await exerciseStorage.getWorkoutByShortDate(prevDay), await exerciseStorage.getWorkoutByShortDate(date), await exerciseStorage.getWorkoutByShortDate(nextDay)];
    return Promise.resolve(workouts);
}