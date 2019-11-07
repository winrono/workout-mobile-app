import { Set } from './set';
import { SuperSet } from './super-set';

export class Exercise {
    id?: string;
    title: string;
    sets: (Set | SuperSet)[];
}
