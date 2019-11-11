import { Set } from '../models/set';
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
import { ADD_TO_EXISTING_EXERCISE } from '../actions/add-to-existing-exercise';
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
    let compoundExercises: CompoundExercise[];
    let newState: {
        set: Set;
        ready: boolean;
        workouts: DailyWorkout[];
        activeWorkout: DailyWorkout;
    };
    let setPosition: number;
    let exercisePosition: number;

    switch (action.type) {
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
                        new CompoundExercise(new Date().getTime().toString(), [{ ...action.payload.exercise, id: new Date().getTime().toString() + 2 }])
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
        case ADD_TO_EXISTING_EXERCISE:
            newState = _.cloneDeep(state);
            id = null;
            let exercise = newState.activeWorkout.exercises.find((e, index) => {
                let found = e.id === action.payload.parentId;
                if (found) {
                    id = index;
                }
                return found;
            });
            exercise.exercises.push({ ...action.payload.exercise, id: new Date().getTime().toString() });
            newState.activeWorkout.exercises.splice(id, 1, exercise);
            return newState;
        case DELETE_EXERCISE:
            compoundExercises = [...state.activeWorkout.exercises];
            compoundExercises.forEach((compoundExercise, compoundExerciseIndex) => {
                let id = compoundExercise.exercises.indexOf(action.payload);
                if (id != -1) {
                    compoundExercise.exercises.splice(id, 1);
                    if (compoundExercise.exercises.length === 0) {
                        compoundExercises.splice(compoundExerciseIndex, 1);
                    }
                }
            });
            return {
                ...state,
                activeWorkout: { ...state.activeWorkout, exercises: compoundExercises }
            };
        case EDIT_SET:
            newState = _.cloneDeep(state);
            compoundExercises = newState.activeWorkout.exercises;
            exercises = getPureExercises(compoundExercises);
            let set = findSetById(exercises, action.payload.id);
            set.repsCount = action.payload.repsCount;
            set.weight = action.payload.weight;
            return newState;
        case DELETE_SET:
            newState = _.cloneDeep(state);
            compoundExercises = newState.activeWorkout.exercises;
            exercises = getPureExercises(compoundExercises);
            deleteSetById(exercises, action.payload.id);
            return newState;
        case SET_ACTIVE_WORKOUT:
            return {
                ...state,
                activeWorkout: action.payload
            };
    }
    return state;
}

function findSetById(exercises: Exercise[], id: string): Set {
    let set: Set;
    exercises.forEach((e) => {
        e.sets.forEach((s) => {
            if (s.id === id) {
                set = s;
            }
        })
    });
    return set;
}

function deleteSetById(exercises: Exercise[], id: string): void {
    let set: Set;
    exercises.forEach((e) => {
        e.sets.forEach((s) => {
            if (s.id === id) {
                let indexToRemove = e.sets.indexOf(s);
                e.sets.splice(indexToRemove, 1);
            }
        })
    });
}

function getPureExercises(arr: CompoundExercise[]): Exercise[] {
    return arr.reduce((prev, current) => {
        prev.push(...current.exercises);
        return prev;
    }, []);
}
