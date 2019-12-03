import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { appReducer } from './src/reducers/app';
import { AsyncStorage } from 'react-native';
import { DailyWorkout } from './src/models/daily-workout';
import workoutStorage from './src/data-access/workout-storage';
import localizationProvider from './src/localization/localization-provider';
import exerciseStorage from './src/data-access/exercise-storage';

const store = createStore(appReducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    // TODO: reduce number of storage updates
    let state = store.getState();
    if (state.activeWorkout) {
        workoutStorage.saveWorkout(state.activeWorkout);
    }
    if (state.exercises){
        exerciseStorage.saveExercises(state.exercises);
    }
    if (state.settings.language) {
        localizationProvider.setLocale(state.settings.language);
    }
});

export default store;
