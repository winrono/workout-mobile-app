import { DailyWorkout } from '../models/daily-workout';
import { getShortDate } from '../utils/date';
import workoutStorage from '../data-access/workout-storage';
import exerciseStorage from '../data-access/exercise-storage';
import { Exercise } from '../models/exercise';
import { AsyncStorage } from 'react-native';

export function initialize() {
    return async function (dispatch) {
        // await AsyncStorage.clear();
        await workoutStorage.initialize();
        await exerciseStorage.initialize();
        let date = getShortDate(new Date());
        let workouts = await workoutStorage.getActiveWorkouts(date);
        let exercises = await exerciseStorage.getExercises();
        dispatch(onReady(workouts, exercises));
    };
}

export const ON_READY = 'ON_READY';

export function onReady(workouts: DailyWorkout[], exercises: Exercise[]) {
    return {
        type: ON_READY,
        payload: { workouts: workouts, exercises: exercises }
    };
}
