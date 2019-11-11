import { Exercise } from './exercise';
import { CompoundExercise } from './compound-exercise';

export class DailyWorkout {
    constructor(date: string) {
        this.date = date;
        this.exercises = [];
    }
    date: string;
    exercises: CompoundExercise[];
}
