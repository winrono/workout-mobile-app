import { Set } from '../models/set';
import { SuperSet } from '../models/super-set';
import { SET_SET } from '../actions/set-set';
import { SET_SUPERSET } from '../actions/set-superset';
import { ON_READY } from '../actions/initialize';
import { DailyWorkout } from '../models/daily-workout';
import { ADD_EXERCISE } from '../actions/add-exercise';
import { Exercise } from '../models/exercise';
import { SET_DATE } from '../actions/set-date';
import navigationService from '../../navigation-service';

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
            id = findWorkoutId(action.payload, new Date());
            return {
                ...state,
                ready: true,
                workouts: action.payload,
                activeWorkout: typeof id == 'number' ? action.payload[id] : null
            }
        case ADD_EXERCISE:
            id = findWorkoutId(state.workouts, action.payload.date);
            // using navigation here as add exercise will become async at some point
            navigationService.navigate('Dashboard');
            if (typeof id == 'number') {
                state.workouts.splice(id, 1, { ...state.workouts[id], exercises: [...state.workouts[id].exercises, action.payload.exercise] });
                return {
                    ...state,
                    workouts: [...state.workouts],
                    activeWorkout: state.workouts[id]
                }
            } else {
                return {
                    ...state,
                    workouts: [...state.workouts, { date: action.payload.date, exercises: [action.payload.exercise] }],
                    activeWorkout: state.workouts[state.workouts.length - 1]
                }
            }
        case SET_DATE:
            id = findWorkoutId(state.workouts, action.payload);
            if (typeof id == 'number') {
                return {
                    ...state,
                    activeWorkout: state.workouts[id]
                }
            } else {
                return {
                    ...state,
                    activeWorkout: null
                }
            }
    }
    return state;
}

function findWorkoutId(workouts: DailyWorkout[], date: Date | string): number {
    let id = null;
    if (workouts) {
        workouts.forEach((workout, index) => {
            if (new Date(workout.date).toDateString() === new Date(date).toDateString()) {
                id = index;
            }
        });
    }
    return id;
}
