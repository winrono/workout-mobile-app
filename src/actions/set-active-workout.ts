import { DailyWorkout } from '../models/daily-workout';

export const SET_ACTIVE_WORKOUT: string = 'SET_ACTIVE_WORKOUT';

export function SetActiveWorkout(workout: DailyWorkout) {
    return {
        type: SET_ACTIVE_WORKOUT,
        payload: workout
    }
}