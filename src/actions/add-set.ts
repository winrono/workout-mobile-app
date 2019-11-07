import { Set } from '../models/set';

export const ADD_SET: string = 'ADD_SET';

export function AddSet(set: Set, exerciseId: string) {
    return {
        type: ADD_SET,
        payload: { set, exerciseId }
    }
}