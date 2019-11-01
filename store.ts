import { createStore } from 'redux';
import { appReducer } from './src/reducers/app';

const store = createStore(appReducer);

export default store;
