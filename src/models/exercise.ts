import { Set } from './set';
import { SuperSet } from './super-set';

export class Exercise {
    title: string;
    sets: (Set | SuperSet)[];
}
