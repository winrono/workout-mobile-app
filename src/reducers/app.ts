import { Set } from '../models/set';
import { SuperSet } from '../models/super-set';
import { SET_SET } from '../actions/set-set';
import { SET_SUPERSET } from '../actions/set-superset';
import { ON_READY } from '../actions/initialize';
import { DailyWorkout } from '../models/daily-workout';
import { ADD_EXERCISE } from '../actions/add-exercise';
import navigationService from '../../navigation-service';
import { getShortDate } from '../utils/date';
import { SET_ACTIVE_WORKOUT } from '../actions/set-active-workout';

const initialState: { set: Set; superset: SuperSet, ready: boolean, workouts: DailyWorkout[], activeWorkout: DailyWorkout } = {
    set: {
        name: '',
        weight: undefined,
        repsCount: undefined
    },
    superset: {
        name: '',
        sets: [new Set()]
    },
    ready: false,
    workouts: null,
    activeWorkout: null
};

export function appReducer(state = initialState, action) {

    let id: number;

    switch (action.type) {
        case SET_SET:
            return {
                ...state,
                set: { ...action.set }
            };
        case SET_SUPERSET:
            return {
                ...state,
                superset: {
                    ...action.set
                }
            };
        case ON_READY:
            return {
                ...state,
                ready: true,
                activeWorkout: action.payload
            }
        case ADD_EXERCISE:
            // using navigation here for now as add exercise will become async at some point
            navigationService.navigate('Dashboard');
            if (!state.activeWorkout) {
                state.activeWorkout = new DailyWorkout(getShortDate(new Date()))
            }
            return {
                ...state,
                activeWorkout: { ...state.activeWorkout, exercises: [...state.activeWorkout.exercises, action.payload.exercise] }
            }
        case SET_ACTIVE_WORKOUT:
            return {
                ...state,
                activeWorkout: action.payload
            }
    }
    return state;
}

// function findWorkoutId(workouts: DailyWorkout[], date: Date | string): number {
//     let id = null;
//     if (workouts) {
//         workouts.forEach((workout, index) => {
//             if (new Date(workout.date).toDateString() === new Date(date).toDateString()) {
//                 id = index;
//             }
//         });
//     }
//     return id;
// }
