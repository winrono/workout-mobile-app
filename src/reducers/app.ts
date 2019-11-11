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
import { ADD_SET } from '../actions/add-set';
import { DELETE_EXERCISE } from '../actions/delete-exercise';
import { EDIT_SET } from '../actions/edit-set';
import { Exercise } from '../models/exercise';
import * as _ from 'lodash';
import { DELETE_SET } from '../actions/delete-set';

const initialState: { set: Set; superset: SuperSet, ready: boolean, workouts: DailyWorkout[], activeWorkout: DailyWorkout } = {
    set: {
        id: null,
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
    let exercises: Exercise[];
    let newState: { set: Set; superset: SuperSet, ready: boolean, workouts: DailyWorkout[], activeWorkout: DailyWorkout };
    let setPosition: number;
    let exercisePosition: number;

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
                activeWorkout: { ...state.activeWorkout, exercises: [...state.activeWorkout.exercises, { ...action.payload.exercise, id: new Date().getTime().toString() }] }
            }
        case ADD_SET:
            let newExercises = [...state.activeWorkout.exercises];
            id = null;
            let newExercise = {
                ...newExercises.find((ex, index) => {
                    let found = ex.id === action.payload.exerciseId;
                    if (found) {
                        id = index;
                    }
                    return found;
                })
            };
            newExercise.sets.push({ ...action.payload.set, id: new Date().getTime().toString() });
            newExercises[id] = newExercise;
            return {
                ...state,
                activeWorkout: { ...state.activeWorkout, exercises: newExercises }
            }
        case DELETE_EXERCISE:
            exercises = [...state.activeWorkout.exercises];
            id = exercises.indexOf(action.payload);
            exercises.splice(id, 1);
            return {
                ...state,
                activeWorkout: { ...state.activeWorkout, exercises: exercises }
            }
        case EDIT_SET:
            newState = _.cloneDeep(state);
            exercises = newState.activeWorkout.exercises;
            ({ setPosition, exercisePosition } = findSetPositionById(newState, action.payload.id));
            newState.activeWorkout.exercises[exercisePosition].sets[setPosition] = action.payload;
            return newState;
        case DELETE_SET:
            newState = _.cloneDeep(state);
            ({ setPosition, exercisePosition } = findSetPositionById(newState, action.payload.id));
            newState.activeWorkout.exercises[exercisePosition].sets.splice(setPosition, 1);
            return newState;
        case SET_ACTIVE_WORKOUT:
            return {
                ...state,
                activeWorkout: action.payload
            }
    }
    return state;
}

function findSetPositionById(state: any, id: string): { setPosition: number, exercisePosition: number } {
    let exercises = state.activeWorkout.exercises;
    let setPosition: number;
    let exercisePosition: number;
    for (let i = 0; i < exercises.length; i++) {
        for (let j = 0; j < exercises[i].sets.length; j++) {
            if (exercises[i].sets[j].id === id) {
                setPosition = j;
                exercisePosition = i;
                break;
            }
        }
        if (setPosition != null) {
            break;
        }
    }
    return { setPosition, exercisePosition };
}