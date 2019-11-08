import { AsyncStorage } from 'react-native';
import { DailyWorkout } from '../models/daily-workout';
import { getShortDate } from '../utils/date';

const storageKeyPrefix: string = 'workout';

export function initialize() {
    return function (dispatch) {
        const storageKey = storageKeyPrefix + getShortDate(new Date());
        return AsyncStorage.getItem(storageKey).then(data => {
            let workout: DailyWorkout = JSON.parse(data);
            dispatch(onReady(workout))
        });
    }
}

export const ON_READY = 'ON_READY';

export function onReady(workout: DailyWorkout) {
    return {
        type: ON_READY,
        payload: workout
    }
}