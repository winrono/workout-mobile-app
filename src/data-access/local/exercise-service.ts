import axios, { AxiosResponse } from 'axios';
import { Exercise } from '../../models/exercise';
import { AddSet } from '../../models/add-set';
import { ExerciseService } from '../exercise-service';
import { injectable } from 'inversify';
import { AsyncStorage } from 'react-native';
import { DailyWorkout } from '../../models/daily-workout';

@injectable()
export class LocalExerciseService implements ExerciseService {
    private _storageKey: string = 'workouts';
    private _workouts: DailyWorkout[] = [];

    getWorkouts(): Promise<DailyWorkout[]> {
        if (this._workouts.length > 0) {
            return Promise.resolve(this._workouts);
        }
        return AsyncStorage.getItem(this._storageKey).then(data => {
            let workouts: DailyWorkout[] = JSON.parse(data);
            if (workouts) {
                this._workouts = workouts;
            }
            return this._workouts;
        });
    }
    async getWorkoutByDate(date: string | Date): Promise<DailyWorkout> {
        await this.getWorkouts();
        return this.findWorkoutByDate(date);
    }

    addExercise(name: string, date: Date): Promise<any> {
        let workout = this.findWorkoutByDate(date, true);
        let exercise: Exercise = { title: name, sets: [] };
        workout.exercises.push(exercise);
        return AsyncStorage.setItem(this._storageKey, JSON.stringify(this._workouts));
    }

    // postSet(set: Set, date: Date): Promise<any> {
    //     let workout = this.getOrCreateWorkoutByDate(date);
    //     this._sets.push({ ...exercise, exerciseId: new Date().getTime().toString() });
    //     return AsyncStorage.setItem(this._storageKey, JSON.stringify(this._sets));
    // }
    // postSuperSet(set: SuperSet): Promise<any> {
    //     this._sets.push({ ...set, id: new Date().getTime().toString() });
    //     return AsyncStorage.setItem(this._storageKey, JSON.stringify(this._sets));
    // }
    // updateSet(set: Set): Promise<any> {
    //     const found = this._sets.find((s: Set) => {
    //         return s.exerciseId === set.exerciseId;
    //     }) as Set;
    //     if (found) {
    //         found.name = set.name;
    //         found.weight = set.weight;
    //         found.reps = set.reps;
    //     }
    //     return AsyncStorage.setItem(this._storageKey, JSON.stringify(this._sets));
    // }

    // async deleteSetById(id: string): Promise<void> {
    //     this._sets = this._sets.filter(set => {
    //         return (set as Set).exerciseId !== id;
    //     });
    //     await AsyncStorage.setItem(this._storageKey, JSON.stringify(this._sets));
    // }

    private findWorkoutByDate(date: Date | string, createIfNotExists?: boolean): DailyWorkout {
        let workout = this._workouts.find((workout) => {
            return new Date(workout.date).toDateString() === new Date(date).toDateString();
        });
        if (!workout && createIfNotExists) {
            workout = { date: new Date(date).toISOString(), exercises: [] };
            this._workouts.push(workout);
        }
        return workout;
    }
}
