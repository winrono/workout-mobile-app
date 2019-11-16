import { AsyncStorage } from 'react-native'
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
        let t1 = performance.now();
        let keyValuePairs = await AsyncStorage.multiGet(shortDates.map((d) => `${this._storagePrefix}${d}`));
        console.log(performance.now() - t1);
        keyValuePairs.forEach((pair, index) => {
            let workout: DailyWorkout = JSON.parse(pair[1]);
            if (!workout) {
                workout = new DailyWorkout(getShortDate(shortDates[index]));
            }
            this._storage.set(pair[0], workout);
            return workout;
        })
    }

    getWorkoutByShortDate(date: string): DailyWorkout {
        return this._storage.get(`${this._storagePrefix}${date}`);
    }

}

export default new ExerciseStorage();