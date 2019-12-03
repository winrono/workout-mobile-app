import { AsyncStorage } from 'react-native';
import { getShortDate, getMonthDaysCount, getShortDateWithOffset } from '../utils/date';
import { DailyWorkout } from '../models/daily-workout';
import { Exercise } from '../models/exercise';

class ExerciseStorage {
    private _storageKey = 'exercises';
    private _storage: Exercise[] = [];

    async initialize(): Promise<void> {
        let exercises = JSON.parse(await AsyncStorage.getItem(this._storageKey));
        if (exercises) {
            this._storage.push(...exercises);
        }
    }

    async saveExercises(exercises: Exercise[]): Promise<void> {
        if (this._storage !== exercises) {
            this._storage = exercises;
            await AsyncStorage.setItem(this._storageKey, JSON.stringify(this._storage));
        }
    }

    async getExercises(): Promise<Exercise[]> {
        return this._storage;
    }

}

export default new ExerciseStorage();
