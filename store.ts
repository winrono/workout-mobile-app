import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { appReducer } from './src/reducers/app';
import { AsyncStorage } from 'react-native';
import { DailyWorkout } from './src/models/daily-workout';


const store = createStore(appReducer, applyMiddleware(thunkMiddleware));

const storageKeyPrefix: string = 'workout';

function saveWorkout(workout: DailyWorkout) {
    AsyncStorage.setItem(storageKeyPrefix + workout.date, JSON.stringify(workout));
}

store.subscribe(() => {
    // TODO: reduce number of storage updates
    let state = store.getState();
    if (state.activeWorkout) {
        saveWorkout(state.activeWorkout);
    }
});

export default store;
