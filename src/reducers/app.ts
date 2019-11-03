import { Set } from '../models/set';
import { SuperSet } from '../models/super-set';
import { SET_SET } from '../actions/set-set';
import { SET_SUPERSET } from '../actions/set-superset';

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
    }
    return state;
}
