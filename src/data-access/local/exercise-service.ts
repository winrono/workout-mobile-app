import axios, { AxiosResponse } from 'axios';
import { Exercise } from '../../models/exercise';
import { AddSet } from '../../models/add-set';
import { ExerciseService } from '../exercise-service';
import { injectable } from 'inversify';
import { AsyncStorage } from 'react-native';
import { Set } from '../../models/set';
import { SuperSet } from '../../models/super-set';

@injectable()
export class LocalExerciseService implements ExerciseService {
    private _storageKey: string = 'localExercises';
    private _sets: (Set | SuperSet)[] = [];

    getSets(): Promise<(Set | SuperSet)[]> {
        return AsyncStorage.getItem(this._storageKey).then(data => {
            let sets: (Set | SuperSet)[] = JSON.parse(data);
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
    postSuperSet(set: SuperSet): Promise<any> {
        this._sets.push(set);
        return AsyncStorage.setItem(this._storageKey, JSON.stringify(this._sets));
    }

    async deleteSetById(id: string): Promise<void> {
        debugger;
        this._sets = this._sets.filter(set => {
            return (set as Set).exerciseId !== id;
        });
        await AsyncStorage.setItem(this._storageKey, JSON.stringify(this._sets));
    }
}
