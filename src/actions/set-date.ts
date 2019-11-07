import { AsyncStorage } from 'react-native';
import { DailyWorkout } from '../models/daily-workout';
import { SetActiveWorkout } from './set-active-workout';

export function setDate(date: string) {
    return function (dispatch) {
        AsyncStorage.getItem('workout' + date).then(data => {
            let workout: DailyWorkout = JSON.parse(data);
            if (!workout) {
                workout = new DailyWorkout(date);
            }
            dispatch(SetActiveWorkout(workout));
        })
    }
}