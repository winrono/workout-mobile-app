import { AsyncStorage } from 'react-native';
import { DailyWorkout } from '../models/daily-workout';
import { SetActiveWorkouts } from './set-active-workouts';
import { getShortDate } from '../utils/date';
import exerciseStorage from '../data-access/exercise-storage';

export function setDate(date: string) {
    return async function(dispatch) {
        let workouts = await exerciseStorage.getActiveWorkouts(date);

        dispatch(SetActiveWorkouts(workouts));
    };
}
