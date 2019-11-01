import {
    SET_SET_NAME,
    SET_SET_WEIGHT,
    SET_SET_REPS_COUNT,
    SET_SET,
    SET_SUPERSET_NAME,
    ADD_SET_TO_SUPERSET,
    REMOVE_SET_FROM_SUPERSET
} from '../actions/set';
import { Set } from '../models/set';
import { SuperSet } from '../models/super-set';

const initialState: { set: Set; superset: SuperSet } = {
    set: {
        name: '',
        weight: undefined,
        repsCount: undefined
    },
    superset: {
        name: '',
        sets: [new Set()]
    }
};

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SET_NAME:
            return {
                ...state,
                set: {
                    ...state.set,
                    name: action.text
                }
            };
        case SET_SET_WEIGHT:
            return {
                ...state,
                set: {
                    ...state.set,
                    weight: action.text
                }
            };
        case SET_SET_REPS_COUNT:
            return {
                ...state,
                set: {
                    ...state.set,
                    repsCount: action.text
                }
            };
        case SET_SET:
            return {
                ...state,
                set: {...action.set}
            };
        case SET_SUPERSET_NAME:
            return {
                ...state,
                superset: {
                    ...state.superset,
                    name: action.text
                }
            };
        case ADD_SET_TO_SUPERSET:
            return {
                ...state,
                superset: {
                    ...state.superset,
                    sets: [...state.superset.sets, new Set()]
                }
            };
        case REMOVE_SET_FROM_SUPERSET:
            return {
                ...state,
                superset: {
                    ...state.superset,
                    sets: [...state.superset.sets.slice(0, state.superset.sets.length - 1)]
                }
            };
    }
    return state;
}
