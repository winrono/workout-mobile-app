import { Set } from '../models/set';
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
import { ADD_COMPOUND_EXERCISE } from '../actions/add-compound-exercise';
import { CompoundExercise } from '../models/compound-exercise';

const initialState: {
    set: Set;
    ready: boolean;
    workouts: DailyWorkout[];
    activeWorkout: DailyWorkout;
} = {
    set: {
        id: null,
        weight: undefined,
        repsCount: undefined
    },
    ready: false,
    workouts: null,
    activeWorkout: null
};

export function appReducer(state = initialState, action) {
    let id: number;
    let exercises: Exercise[];
    let newState: {
        set: Set;
        ready: boolean;
        workouts: DailyWorkout[];
        activeWorkout: DailyWorkout;
    };
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
            };
        case ADD_EXERCISE:
            // using navigation here for now as add exercise will become async at some point
            navigationService.navigate('Dashboard');
            if (!state.activeWorkout) {
                state.activeWorkout = new DailyWorkout(getShortDate(new Date()));
            }
            return {
                ...state,
                activeWorkout: {
                    ...state.activeWorkout,
                    exercises: [
                        ...state.activeWorkout.exercises,
                        { ...action.payload.exercise, id: new Date().getTime().toString() }
                    ]
                }
            };
        case ADD_SET:
            newState = _.cloneDeep(state);
            id = null;
            let exercises: Exercise[] = getPureExercises(newState.activeWorkout.exercises);
            let newExercise = exercises.find((ex, index) => {
                let found = ex.id === action.payload.exerciseId;
                if (found) {
                    id = index;
                }
                return found;
            });
            newExercise.sets.push({ ...action.payload.set, id: new Date().getTime().toString() });
            return newState;
        case ADD_COMPOUND_EXERCISE:
            newState = _.cloneDeep(state);
            id = null;
            let exercise = newState.activeWorkout.exercises.find((e, index) => {
                let found = e.id === action.payload.neighborId;
                if (found) {
                    id = index;
                }
                return found;
            });
            let compoundExercise: CompoundExercise;
            if (!isExercise(exercise)) {
                compoundExercise = exercise;
            } else {
                compoundExercise = new CompoundExercise();
                compoundExercise.id = new Date().getTime().toString();
                compoundExercise.exercises = [exercise];
            }
            compoundExercise.exercises.push({ ...action.payload.exercise, id: new Date().getTime().toString() });
            newState.activeWorkout.exercises.splice(id, 1, compoundExercise);
            return newState;
        case DELETE_EXERCISE:
            let e = [...state.activeWorkout.exercises];
            id = e.indexOf(action.payload);
            if (id === -1) {
                (e as CompoundExercise[]).forEach(ex => {
                    let id = ex.exercises.indexOf(action.payload);
                    if (id != -1) {
                        console.log('spliced child');
                        ex.exercises.splice(id, 1);
                    }
                });
            } else {
                e.splice(id, 1);
            }
            return {
                ...state,
                activeWorkout: { ...state.activeWorkout, exercises: e }
            };
        case EDIT_SET:
            newState = _.cloneDeep(state);
            exercises = newState.activeWorkout.exercises as Exercise[];
            ({ setPosition, exercisePosition } = findSetPositionById(newState, action.payload.id));
            (newState.activeWorkout.exercises[exercisePosition] as Exercise).sets[setPosition] = action.payload;
            return newState;
        case DELETE_SET:
            newState = _.cloneDeep(state);
            ({ setPosition, exercisePosition } = findSetPositionById(newState, action.payload.id));
            (newState.activeWorkout.exercises[exercisePosition] as Exercise).sets.splice(setPosition, 1);
            return newState;
        case SET_ACTIVE_WORKOUT:
            return {
                ...state,
                activeWorkout: action.payload
            };
    }
    return state;
}

function isExercise(exercise: Exercise | CompoundExercise): exercise is Exercise {
    return (exercise as Exercise).sets != null;
}

function findSetPositionById(state: any, id: string): { setPosition: number; exercisePosition: number } {
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

function getPureExercises(arr: (Exercise | CompoundExercise)[]): Exercise[] {
    return arr.reduce((prev, current) => {
        if (isExercise(current)) {
            prev.push(current);
        } else {
            prev.push(...current.exercises);
        }
        return prev;
    }, []);
}
