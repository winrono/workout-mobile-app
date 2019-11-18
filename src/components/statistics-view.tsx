import React from 'react';
import { ScrollView, Alert, Text } from 'react-native';
import { Card, CardItem, View, Left, Right } from 'native-base';
import { Exercise } from '../models/exercise';
import { Set } from '../models/set';
import { SetView } from './set-view';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { deleteExercise } from '../actions/delete-exercise';
import EditSet from './edit-set';
import AddSet from './add-set';
import { CompoundExercise } from '../models/compound-exercise';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import TransparentModal from './transparent-modal';
import localizationProvider from '../localization/localization-provider';
import {
    AddSet as AddSetLocalizationId,
    Delete,
    AddExercise,
    DeleteExerciseConfirmation,
    Cancel
} from '../localization/constants';

class StatisticsView extends React.Component<{
    exercises: CompoundExercise[];
    onDeleteExercise: (exercise: Exercise) => void;
    onAddChildExercise: (parentId: string) => void;
}> {
    state = { modalVisible: false, editedSet: null, addingSet: null };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TransparentModal visible={this.state.modalVisible}>{this.renderModalContent()}</TransparentModal>
                <ScrollView>
                    {this.props.exercises.map(exercise => this.renderActivity(exercise))}
                    <View style={{ height: 70 }}></View>
                </ScrollView>
            </View>
        );
    }

    private renderModalContent() {
        if (this.state.editedSet) {
            return (
                <EditSet
                    onEditCompleted={() => {
                        this.setState({ modalVisible: false, editedSet: null });
                    }}
                    set={this.state.editedSet}
                ></EditSet>
            );
        } else {
            return (
                <AddSet
                    initialModel={this.state.addingSet}
                    onAddCompleted={() => this.setState({ modalVisible: false, addingSet: null })}
                ></AddSet>
            );
        }
    }

    private renderActivity(exercise: CompoundExercise) {
        return (
            <View key={exercise.id} style={{ margin: 10 }}>
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
            <View key={exercise.id}>
                <CardItem header bordered>
                    <Left>
                        <Text>{exercise.title}</Text>
                    </Left>
                    <Right>
                        <View style={{ flexDirection: 'row' }}>
                            <Menu>
                                <MenuTrigger>
                                    <MaterialIcons size={30} name="menu"></MaterialIcons>
                                </MenuTrigger>
                                <MenuOptions customStyles={menuOptionsStyles as any}>
                                    <MenuOption
                                        onSelect={() => {
                                            let prevSetData = this.getLastSetData(exercise);
                                            this.setState({
                                                modalVisible: true,
                                                addingSet: { ...prevSetData, exerciseId: exercise.id }
                                            });
                                        }}
                                        text={localizationProvider.getLocalizedString(AddSetLocalizationId)}
                                    />
                                    <MenuOption onSelect={() => this.deleteExerciseSafely(exercise)}>
                                        <Text>{localizationProvider.getLocalizedString(Delete)}</Text>
                                    </MenuOption>
                                    <MenuOption
                                        onSelect={() => {
                                            this.props.onAddChildExercise(compoundId);
                                        }}
                                        text={localizationProvider.getLocalizedString(AddExercise)}
                                    />
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

    private getLastSetData(exercise: Exercise): { repsCount: string; weight: string; comment: string } {
        let setData = { repsCount: '', weight: '', comment: '' };
        let lastSet = exercise.sets[exercise.sets.length - 1] as Set;
        if (lastSet) {
            setData.repsCount = lastSet.repsCount;
            setData.weight = lastSet.weight;
            setData.comment = lastSet.comment;
        }
        return setData;
    }

    renderSet(set: Set) {
        return (
            <SetView key={set.id} set={set as Set} onDelete={() => {}} onEdit={this.editSet.bind(this, set)}></SetView>
        );
    }

    deleteExerciseSafely(exercise: Exercise) {
        Alert.alert(localizationProvider.getLocalizedString(DeleteExerciseConfirmation), '', [
            { text: localizationProvider.getLocalizedString(Cancel), style: 'cancel' },
            { text: localizationProvider.getLocalizedString(Delete), onPress: () => this.deleteExercise(exercise) }
        ]);
    }

    deleteExercise(exercise: Exercise) {
        this.props.onDeleteExercise(exercise);
    }
    editSet(set: Set) {
        this.setState({ modalVisible: true, editedSet: set });
    }
}

const menuOptionsStyles = {
    optionWrapper: {
        height: 50,
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    }
};

function mapDispatchToProps(dispatch) {
    return {
        onDeleteExercise: (exercise: Exercise) => {
            dispatch(deleteExercise(exercise));
        }
    };
}

export default connect(undefined, mapDispatchToProps)(StatisticsView);
