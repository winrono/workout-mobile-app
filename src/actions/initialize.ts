import { AsyncStorage } from 'react-native';
import { DailyWorkout } from '../models/daily-workout';

const storageKey: string = 'workouts';

export function initialize() {
    return function (dispatch) {
        return AsyncStorage.getItem(storageKey).then(data => {
            let workouts: DailyWorkout[] = JSON.parse(data);
            dispatch(onReady(workouts))
        });
    }
}

export const ON_READY = 'ON_READY';

export function onReady(workouts: DailyWorkout[]) {
    return {
        type: ON_READY,
        payload: workouts
    }
}