import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { appReducer } from './src/reducers/app';
import { AsyncStorage } from 'react-native';
import { DailyWorkout } from './src/models/daily-workout';


const store = createStore(appReducer, applyMiddleware(thunkMiddleware));

const storageKey: string = 'workouts';

function saveWorkouts(workouts: DailyWorkout) {
    AsyncStorage.setItem(storageKey, JSON.stringify(workouts));
}

store.subscribe(() => {
    saveWorkouts(store.getState().workouts);
});

export default store;
