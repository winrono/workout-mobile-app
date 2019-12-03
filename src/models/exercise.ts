import { Set } from './set';
import { ExerciseType } from './exercise-type';

export class Exercise {
    id?: string;
    title: string;
    sets?: Set[];
    type: ExerciseType;
    knownExerciseId?: string;
}
