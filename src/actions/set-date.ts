export const SET_DATE = 'SET_DATE';

export function setDate(date: string | Date) {
    return {
        type: SET_DATE,
        payload: date
    }
}