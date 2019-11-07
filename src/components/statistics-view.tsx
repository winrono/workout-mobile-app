import React from 'react';
import { ScrollView, Alert, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Accordion, List, Card, CardItem, Body, View, Left, Icon, Right } from 'native-base';
import { Exercise } from '../models/exercise';
import { SuperSet } from '../models/super-set';
import { Set } from '../models/set';
import { SetView } from './set-view';
import { SupersetView } from './superset-view';
import { ExerciseService } from '../data-access/exercise-service';
import { lazyInject } from '../ioc/container';
import navigationService from '../../navigation-service';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { deleteExercise } from '../actions/delete-exercise';


class StatisticsView extends React.Component<{ exercises: Exercise[], onDeleteExercise: () => void; onEditSet: (set: Set) => void }> {

    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;

    render() {
        return (<ScrollView>
            {this.props.exercises.map((exercise) => (
                <View style={{ margin: 10 }}>
                    <Card style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        overflow: 'hidden'
                    }}>
                        <CardItem header bordered>
                            <Left>
                                <Text>{exercise.title}</Text>
                            </Left>
                            <Right>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => {
                                        this.deleteExerciseSafely(exercise);
                                    }}>
                                        <AntDesign size={30} name='delete'></AntDesign>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        navigationService.navigate('AddSet', { exerciseId: exercise.id })
                                    }}>
                                        <AntDesign size={30} name='plus'></AntDesign>
                                    </TouchableOpacity>
                                </View>
                            </Right>
                        </CardItem>
                        <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                            {exercise.sets.map(s => (
                                this.renderSet(s)
                            ))}
                        </View>
                    </Card>
                </View>
            ))}
        </ScrollView>);
    }

    renderSet(set: Set | SuperSet) {
        if ((set as SuperSet).sets) {
            return <SupersetView superset={set as SuperSet}></SupersetView>;
        } else {
            return (
                <SetView
                    set={set as Set}
                    onDelete={() => { }}
                    onEdit={this.editSet.bind(this, set)}
                ></SetView>
            );
        }
    }

    deleteExerciseSafely(exercise: Exercise) {
        Alert.alert('Are you sure you want to delete exercise?', '', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: () => this.deleteExercise(exercise) }
        ]);
    }

    deleteExercise(exercise: Exercise) {
        this.props.onDeleteExercise(exercise);
    }
    editSet(set: Set) {
        this.props.onEditSet(set);
    }
};

function mapDispatchToProps(dispatch) {
    return {
        onDeleteExercise: (exercise: Exercise) => {
            dispatch(deleteExercise(exercise));
        }
    }
}

export default connect(undefined, mapDispatchToProps)(StatisticsView);