import { SET_SET_NAME, SET_SET_WEIGHT, SET_SET_REPS_COUNT, SET_SET, SET_SUPERSET } from '../actions/set';
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
                set: { ...action.set }
            };
        case SET_SUPERSET:
            console.log(action.set);
            return {
                ...state,
                superset: {
                    ...action.set
                }
            };
    }
    return state;
}
