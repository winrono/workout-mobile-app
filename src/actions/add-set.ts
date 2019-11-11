import { Set } from '../models/set';

export const ADD_SET: string = 'ADD_SET';

export function AddSet(set: Set, exerciseId: string) {
    return function(dispatch) {
        dispatch({
            type: ADD_SET,
            payload: { set, exerciseId }
        });
        return Promise.resolve();
    };
}
