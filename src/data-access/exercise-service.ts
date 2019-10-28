import { AddSet } from '../models/add-set';
import { Set } from '../models/set';

export interface ExerciseService {
    getSets(): Promise<Set[]>;
    postSet(exercise: AddSet): Promise<any>;
    deleteSetById(id: string): Promise<void>;
}