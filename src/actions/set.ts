import { Set } from '../models/set';

export const SET_SET = 'SET_SET';
export const SET_SET_NAME = 'SET_SET_NAME';
export const SET_SET_WEIGHT = 'SET_SET_WEIGHT';
export const SET_SET_REPS_COUNT = 'SET_SET_REPS_COUNT';
export const SET_SUPERSET_NAME = 'SET_SUPERSET_NAME';
export const ADD_SET_TO_SUPERSET = 'ADD_SET_TO_SUPERSET';
export const REMOVE_SET_FROM_SUPERSET = 'REMOVE_SET_FROM_SUPERSET';

export function setSet(set) {
    return { type: SET_SET, set };
}
export function setSetName(text) {
    return { type: SET_SET_NAME, text };
}

export function setSetWeight(text) {
    return { type: SET_SET_WEIGHT, text };
}

export function setSetRepsCount(text) {
    return { type: SET_SET_REPS_COUNT, text };
}

export function setSupersetName(text) {
    return { type: SET_SUPERSET_NAME, text };
}

export function addSetToSuperset() {
    return { type: ADD_SET_TO_SUPERSET };
}

export function removeSetFromSuperset() {
    return { type: REMOVE_SET_FROM_SUPERSET };
}
