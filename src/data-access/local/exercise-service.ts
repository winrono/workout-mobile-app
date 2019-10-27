import axios, { AxiosResponse } from 'axios';
import { Exercise } from '../../models/exercise';
import { AddExercise } from '../../models/add-exercise';
import { ExerciseService } from '../exercise-service';
import { injectable } from 'inversify';
import { AsyncStorage } from 'react-native';

@injectable()
export class LocalExerciseService implements ExerciseService {
    private _storageKey: string = 'localExercises';
    private _exercises: Exercise[] = [];

    getExercises(): Promise<Exercise[]> {
        return AsyncStorage.getItem(this._storageKey).then((data) => {
            let exercises = JSON.parse(data);
            if (exercises){
                this._exercises = exercises;
            }
            return this._exercises;
        });
    }
    postExercise(exercise: AddExercise): Promise<any> {
        this._exercises.push({ ...exercise, exerciseId: new Date().getTime().toString() });
        return AsyncStorage.setItem(this._storageKey, JSON.stringify(this._exercises));
    }
    async deleteExercisebyId(id: string): Promise<void> {
        debugger;
        this._exercises = this._exercises.filter((exercise) => {
            return exercise.exerciseId !== id;
        });
        await AsyncStorage.setItem(this._storageKey, JSON.stringify(this._exercises));
    }
}