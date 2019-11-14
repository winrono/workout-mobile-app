import { AsyncStorage } from 'react-native';
import { DailyWorkout } from '../models/daily-workout';
import { SetActiveWorkouts } from './set-active-workouts';
import { getShortDate } from '../utils/date';

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
    let prevWorkout = await AsyncStorage.getItem('workout' + prevDay).then(data => {
        let workout: DailyWorkout = JSON.parse(data);
        if (!workout) {
            workout = new DailyWorkout(date);
        }
        return workout;
    })

    let nextDay: Date | string = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay = getShortDate(nextDay);

    let nextWorkout = await AsyncStorage.getItem('workout' + nextDay).then(data => {
        let workout: DailyWorkout = JSON.parse(data);
        if (!workout) {
            workout = new DailyWorkout(date);
        }
        return workout;
    });

    let activeWorkout = await AsyncStorage.getItem('workout' + date).then(data => {
        let workout: DailyWorkout = JSON.parse(data);
        if (!workout) {
            workout = new DailyWorkout(date);
        }
        return workout;
    });

    return [prevWorkout, activeWorkout, nextWorkout];

}