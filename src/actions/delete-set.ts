import { Set } from '../models/set';

export const DELETE_SET: string = 'DELETE_SET';

export function deleteSet(set: Set) {
    return {
        type: DELETE_SET,
        payload: set
    }
}