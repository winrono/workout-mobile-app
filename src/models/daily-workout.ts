import { Set } from './set';
import { SuperSet } from './super-set';

export class DailyWorkout {
    title: string;
    sets: (Set | SuperSet)[];
}
