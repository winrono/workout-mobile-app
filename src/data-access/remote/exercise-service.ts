import axios, { AxiosResponse } from 'axios';
import { Exercise } from '../../models/exercise';
import { AddExercise } from '../../models/add-exercise';
import { ExerciseService } from '../exercise-service';
import { injectable } from 'inversify';

@injectable()
export class RemoteExerciseService implements ExerciseService {
    getExercises(): Promise<Exercise[]> {
        return axios
            .get('http://localhost:55191/exercise/exercises', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then((res: AxiosResponse<Exercise[]>) => {
                return res.data;
            });
    }
    postExercise(exercise: AddExercise): Promise<AxiosResponse> {
        return axios.post('http://localhost:55191/exercise/exercises', {
            name: exercise.name,
            repetitionsCount: exercise.repetitionsCount,
            weight: exercise.weight,
            creationTime: exercise.creationTime
        }, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
    }
    deleteExercisebyId(id: string): Promise<void> {
        return axios
            .delete(`http://localhost:55191/exercise/exercises/${id}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
    }
}