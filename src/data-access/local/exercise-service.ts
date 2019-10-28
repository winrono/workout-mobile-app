import axios, { AxiosResponse } from 'axios';
import { Exercise } from '../../models/exercise';
import { AddSet } from '../../models/add-set';
import { ExerciseService } from '../exercise-service';
import { injectable } from 'inversify';
import { AsyncStorage } from 'react-native';
import { Set } from '../../models/set';

@injectable()
export class LocalExerciseService implements ExerciseService {
    private _storageKey: string = 'localExercises';
    private _sets: Set[] = [];

    getSets(): Promise<Set[]> {
        return AsyncStorage.getItem(this._storageKey).then((data) => {
            let sets = JSON.parse(data);
            if (sets) {
                this._sets = sets;
            }
            return this._sets;
        });
    }
    postSet(exercise: AddSet): Promise<any> {
        this._sets.push({ ...exercise, exerciseId: new Date().getTime().toString() });
        return AsyncStorage.setItem(this._storageKey, JSON.stringify(this._sets));
    }
    async deleteSetById(id: string): Promise<void> {
        debugger;
        this._sets = this._sets.filter((exercise) => {
            return exercise.exerciseId !== id;
        });
        await AsyncStorage.setItem(this._storageKey, JSON.stringify(this._sets));
    }
}