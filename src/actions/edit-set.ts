export const EDIT_SET: string = 'EDIT_SET';

export function editSet(set) {
    return {
        type: EDIT_SET,
        payload: set
    }
}