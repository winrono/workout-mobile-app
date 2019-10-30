import { AddSet } from '../models/add-set';
import { Set } from '../models/set';
import { SuperSet } from '../models/super-set';

export interface ExerciseService {
    getSets(): Promise<(Set | SuperSet)[]>;
    postSet(exercise: AddSet): Promise<any>;
    updateSet(set: Set): Promise<any>;
    postSuperSet(set: SuperSet): Promise<any>;
    deleteSetById(id: string): Promise<void>;
}
