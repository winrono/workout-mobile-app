import React from 'react';
import { ScrollView, Alert, Text, Dimensions, FlatList } from 'react-native';
import { Accordion, List, Card, CardItem, Body, View } from 'native-base';
import { Exercise } from '../models/exercise';
import { SuperSet } from '../models/super-set';
import { Set } from '../models/set';
import { SetView } from './set-view';
import { SupersetView } from './superset-view';
import { ExerciseService } from '../data-access/exercise-service';
import { lazyInject } from '../ioc/container';
var width = Dimensions.get('window').width;

export class StatisticsView extends React.Component<{ exercises: Exercise[], onDeleteSet: () => void; onEditSet: (set: Set) => void }> {

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
                        <CardItem header bordered style={{ justifyContent: 'center' }}>
                            <Text>{exercise.title}</Text>
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
    renderAccordionItem(exercise: Exercise) {
        return <List>{exercise.sets.map(set => this.renderSet(set))}</List>;
    }

    renderSet(set: Set | SuperSet) {
        if ((set as SuperSet).sets) {
            return <SupersetView superset={set as SuperSet}></SupersetView>;
        } else {
            return (
                <SetView
                    set={set as Set}
                    onDelete={this.deleteSetSafely.bind(this, set)}
                    onEdit={this.editSet.bind(this, set)}
                ></SetView>
            );
        }
    }

    deleteSetSafely(set: Set) {
        Alert.alert('Are you sure you want to delete set?', '', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: () => this.deleteSet(set) }
        ]);
    }

    deleteSet(set: Set) {
        this._exerciseService.deleteSetById(set.exerciseId).then(() => {
            this.props.onDeleteSet();
        });
    }
    editSet(set: Set) {
        this.props.onEditSet(set);
    }
};
