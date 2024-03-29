import axios, { AxiosResponse } from 'axios';
import { Exercise } from '../../models/exercise';
import { AddSet } from '../../models/add-set';
import { ExerciseService } from '../exercise-service';
import { injectable } from 'inversify';
import { Set } from '../../models/set';

@injectable()
export class RemoteExerciseService implements ExerciseService {
    getSetsByDate(date: string): Promise<Set | import("../../models/super-set").SuperSet[]> {
        throw new Error("Method not implemented.");
    }
    updateSet(set: Set): Promise<any> {
        throw new Error("Method not implemented.");
    }
    postSuperSet(set: import("../../models/super-set").SuperSet): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getSets(): Promise<Set[]> {
        return axios
            .get('http://localhost:55191/exercise/exercises', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then((res: AxiosResponse<Set[]>) => {
                return res.data;
            });
    }
    postSet(exercise: AddSet): Promise<AxiosResponse> {
        return axios.post('http://localhost:55191/exercise/exercises', {
            name: exercise.name,
            reps: exercise.reps,
            weight: exercise.weight,
            creationTime: exercise.creationTime
        }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
    deleteSetById(id: string): Promise<void> {
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