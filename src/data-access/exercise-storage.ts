import { AsyncStorage } from 'react-native';
import { getShortDate, getMonthDaysCount } from '../utils/date';
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
        let prevDay: Date | string = new Date(date);
        prevDay.setDate(prevDay.getDate() - 1);
        prevDay = getShortDate(prevDay);

        let nextDay: Date | string = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay = getShortDate(nextDay);

        let workouts: DailyWorkout[] = [
            await this.getWorkoutByShortDate(prevDay),
            await this.getWorkoutByShortDate(date),
            await this.getWorkoutByShortDate(nextDay)
        ];

        return Promise.resolve(workouts);
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
                keys.push(key.replace('workout', ''));
            }
        });
        return keys;
    }
}

export default new ExerciseStorage();
