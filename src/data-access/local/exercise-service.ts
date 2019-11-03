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
    private _sets: (Set | SuperSet)[];

    getSets(): Promise<(Set | SuperSet)[]> {
        if (this._sets) {
            return Promise.resolve(this._sets);
        }
        return AsyncStorage.getItem(this._storageKey).then(data => {
            let sets: (Set | SuperSet)[] = JSON.parse(data);
            if (sets) {
                this._sets = sets;
            }
            return this._sets;
        });
    }
    async getSetsByDate(dateTime: string): Promise<(Set | SuperSet)[]> {
        let targetDate = new Date(dateTime).toDateString();
        let sets = await this.getSets();
        sets = sets.filter((set) => {
            return new Date(set.creationTime).toDateString() === targetDate;
        });
        return sets;
    }
    postSet(exercise: AddSet): Promise<any> {
        this._sets.push({ ...exercise, exerciseId: new Date().getTime().toString() });
        return AsyncStorage.setItem(this._storageKey, JSON.stringify(this._sets));
    }
    postSuperSet(set: SuperSet): Promise<any> {
        this._sets.push({ ...set, id: new Date().getTime().toString() });
        return AsyncStorage.setItem(this._storageKey, JSON.stringify(this._sets));
    }
    updateSet(set: Set): Promise<any> {
        const found = this._sets.find((s: Set) => {
            return s.exerciseId === set.exerciseId;
        }) as Set;
        if (found) {
            found.name = set.name;
            found.weight = set.weight;
            found.repsCount = set.repsCount;
        }
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
