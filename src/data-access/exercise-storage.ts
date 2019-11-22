import { AsyncStorage } from 'react-native';
import { getShortDate, getMonthDaysCount, getShortDateWithOffset } from '../utils/date';
import { DailyWorkout } from '../models/daily-workout';

class ExerciseStorage {
    private _storagePrefix = 'workout';
    private _storage: Map<string, DailyWorkout> = new Map();

    async initialize(): Promise<void> {
        let now = new Date();
        let daysCount = getMonthDaysCount(now);
        let startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        let shortDates: string[] = [];
        for (var i = 0; i < daysCount; i++) {
            shortDates.push(getShortDate(startDate));
            startDate.setDate(startDate.getDate() + 1);
        }
        let keyValuePairs = await AsyncStorage.multiGet(shortDates.map(d => `${this._storagePrefix}${d}`));
        keyValuePairs.forEach((pair, index) => {
            let workout: DailyWorkout = JSON.parse(pair[1]);
            if (!workout) {
                workout = new DailyWorkout(getShortDate(shortDates[index]));
            }
            this._storage.set(pair[0], workout);
            return workout;
        });
    }

    async getWorkoutByShortDate(date: string): Promise<DailyWorkout> {
        let key = `${this._storagePrefix}${date}`;
        let workout = this._storage.get(key);
        if (!workout) {
            let data = await AsyncStorage.getItem(key);
            if (data) {
                workout = JSON.parse(data);
            } else {
                workout = new DailyWorkout(getShortDate(date));
            }
        }
        return workout;
    }

    async getActiveWorkouts(date: string): Promise<DailyWorkout[]> {
        let workouts: DailyWorkout[] = [
            await this.getWorkoutByShortDate(getShortDateWithOffset(date, -1)),
            await this.getWorkoutByShortDate(date),
            await this.getWorkoutByShortDate(getShortDateWithOffset(date, 1))
        ];

        return workouts;
    }

    async saveWorkout(workout: DailyWorkout): Promise<void> {
        let key: string = `${this._storagePrefix}${workout.date}`;
        if (this._storage.get(key) !== workout) {
            this._storage.set(key, workout);
            await AsyncStorage.setItem(key, JSON.stringify(workout));
        }
    }

    getDatesWithActivity(): string[] {
        let keys = [];
        this._storage.forEach((value, key) => {
            if (value.exercises.length > 0) {
                keys.push(key.replace(this._storagePrefix, ''));
            }
        });
        return keys;
    }
}

export default new ExerciseStorage();
