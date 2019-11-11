export const EDIT_SET: string = 'EDIT_SET';

export function editSet(set) {
    return function(dispatch): Promise<void> {
        dispatch({
            type: EDIT_SET,
            payload: set
        });
        return Promise.resolve();
    };
}
