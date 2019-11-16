import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { appReducer } from './src/reducers/app';
import { AsyncStorage } from 'react-native';
import { DailyWorkout } from './src/models/daily-workout';
import exerciseStorage from './src/data-access/exercise-storage';


const store = createStore(appReducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    // TODO: reduce number of storage updates
    let state = store.getState();
    if (state.activeWorkout) {
        exerciseStorage.saveWorkout(state.activeWorkout);
    }
});

export default store;
