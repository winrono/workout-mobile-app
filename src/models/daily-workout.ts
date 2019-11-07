import { Set } from './set';
import { SuperSet } from './super-set';
import { Exercise } from './exercise';

export class DailyWorkout {
    constructor(date: string) {
        this.date = date;
        this.exercises = [];
    }
    date: string;
    exercises: Exercise[];
}
