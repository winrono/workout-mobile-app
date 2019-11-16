import { DailyWorkout } from '../models/daily-workout';

export const SET_ACTIVE_WORKOUTS: string = 'SET_ACTIVE_WORKOUTS';

export function SetActiveWorkouts(workouts: DailyWorkout[]) {
    return {
        type: SET_ACTIVE_WORKOUTS,
        payload: workouts
    }
}