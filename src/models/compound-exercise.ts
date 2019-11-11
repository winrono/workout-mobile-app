import { Exercise } from './exercise';

export class CompoundExercise {
    constructor(id: string, exercises: Exercise[]) {
        this.id = id;
        this.exercises = exercises;
    }
    id?: string;
    exercises: Exercise[];
}
