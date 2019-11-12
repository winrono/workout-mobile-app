import React from 'react';
import {
    ScrollView,
    Alert,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Modal,
    TouchableHighlight
} from 'react-native';
import { Accordion, List, Card, CardItem, Body, View, Left, Icon, Right } from 'native-base';
import { Exercise } from '../models/exercise';
import { Set } from '../models/set';
import { SetView } from './set-view';
import { SupersetView } from './superset-view';
import { ExerciseService } from '../data-access/exercise-service';
import { lazyInject } from '../ioc/container';
import navigationService from '../../navigation-service';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { deleteExercise } from '../actions/delete-exercise';
import EditSet from './edit-set';
import AddSet from './add-set';
import { CompoundExercise } from '../models/compound-exercise';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

class StatisticsView extends React.Component<{
    exercises: (CompoundExercise)[];
    onDeleteExercise: (exercise: Exercise) => void;
}> {
    state = { modalVisible: false, editedSet: null, addingSet: null };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    animationType='none'
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#00000080'
                        }}
                    >
                        <View style={{ width: 300, height: 300, backgroundColor: '#fff' }}>
                            {this.renderModalContent()}
                        </View>
                    </View>
                </Modal>
                <ScrollView>{this.props.exercises.map(exercise => this.renderActivity(exercise))}<View style={{ height: 70 }}></View></ScrollView>
            </View>
        );
    }

    private renderModalContent() {
        if (this.state.editedSet) {
            return (<EditSet
                onEditCompleted={() => {
                    this.setState({ modalVisible: false, editedSet: null });
                }}
                set={this.state.editedSet}
            ></EditSet>);
        } else {
            return (<AddSet initialModel={this.state.addingSet} onSubmit={() => this.setState({ modalVisible: false, addingSet: null })}></AddSet>);
        }
    }

    private renderActivity(exercise: CompoundExercise) {
        return (
            <View style={{ margin: 10 }}>
                <Card
                    style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        overflow: 'hidden'
                    }}
                >
                    {(exercise as CompoundExercise).exercises.map(e => {
                        return this.renderExercise(e, exercise.id);
                    })}
                </Card>
            </View>
        );
    }

    private renderExercise(exercise: Exercise, compoundId: string) {
        return (
            <View>
                <CardItem header bordered>
                    <Left>
                        <Text>{exercise.title}</Text>
                    </Left>
                    <Right>
                        <View style={{ flexDirection: 'row' }}>
                            <Menu>
                                <MenuTrigger>
                                    <MaterialIcons size={30} name='menu'></MaterialIcons>
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption onSelect={() => {
                                        let prevSetData = this.getLastSetData(exercise);
                                        this.setState({ modalVisible: true, addingSet: { ...prevSetData, exerciseId: exercise.id } })
                                    }} text='Add set' />
                                    <MenuOption onSelect={() => this.deleteExerciseSafely(exercise)} >
                                        <Text style={{ color: 'red' }}>Delete</Text>
                                    </MenuOption>
                                    <MenuOption onSelect={() => {
                                        navigationService.navigate('AddCompoundExercise', {
                                            parentId: compoundId
                                        });
                                    }} text='Add another exercise' />
                                </MenuOptions>
                            </Menu>
                        </View>
                    </Right>
                </CardItem>
                <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                    {exercise.sets.map(s => this.renderSet(s))}
                </View>
            </View>
        );
    }

    private getLastSetData(exercise: Exercise): { repsCount: string; weight: string } {
        let setData = { repsCount: '', weight: '' };
        let lastSet = exercise.sets[exercise.sets.length - 1] as Set;
        if (lastSet) {
            setData.repsCount = lastSet.repsCount;
            setData.weight = lastSet.weight;
        }
        return setData;
    }

    renderSet(set: Set | SuperSet) {
        if ((set as SuperSet).sets) {
            return <SupersetView superset={set as SuperSet}></SupersetView>;
        } else {
            return <SetView set={set as Set} onDelete={() => { }} onEdit={this.editSet.bind(this, set)}></SetView>;
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
        this.setState({ modalVisible: true, editedSet: set });
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onDeleteExercise: (exercise: Exercise) => {
            dispatch(deleteExercise(exercise));
        }
    };
}

export default connect(
    undefined,
    mapDispatchToProps
)(StatisticsView);
