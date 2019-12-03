import React from 'react';
import { Button, View, Container, Form, ListItem, List, Left, Right } from 'native-base';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Exercise } from '../models/exercise';
import { AddExercise as AddExerciseAction } from '../actions/add-exercise';
import { addToExistingExercise as addToExistingExerciseAction } from '../actions/add-to-existing-exercise';
import localizationProvider from '../localization/localization-provider';
import { Cancel, AddSelected } from '../localization/constants';
import { ExerciseType } from '../models/exercise-type';
import TransparentModal from './transparent-modal';
import CreateExercise from './create-exercise';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

class ExerciseManager extends React.Component<
    {
        onClose: () => void;
        exercises: Exercise[],
        exerciseId: string,
        onAddExercise: (exercise: Exercise) => void;
        onAddToExistingExercise: (exercise: Exercise, parentId: string) => void;
    },
    { showExerciseModal: boolean, exercises: any }
    > {
    _repsInput: any;
    _weightInput: any;

    constructor(props) {
        super(props);
        this.state = {
            showExerciseModal: false, exercises: this.props.exercises.map((exercise) => {
                return { ...exercise, selected: false }
            })
        };
    }

    static getDerivedStateFromProps(props, state) {
        let newestExerciseProps: Exercise = props.exercises[props.exercises.length - 1];
        let newestExerciseState: Exercise = state.exercises[state.exercises.length - 1];
        if (!newestExerciseProps) {
            return null;
        }
        if (!newestExerciseState || newestExerciseProps.id !== newestExerciseState.id) {
            return {
                exercises: [...state.exercises, { ...newestExerciseProps, selected: false }]
            }
        }
        return null;
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#00000080'
                }}
            >
                <TransparentModal visible={this.state.showExerciseModal}>
                    <CreateExercise
                        onComplete={() => this.setState({ showExerciseModal: false })}
                    />
                </TransparentModal>
                <View style={{ marginTop: 40, marginBottom: 40, flex: 1, backgroundColor: 'red' }}>
                    <Container style={styles.container}>
                        <Form style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 15, marginLeft: 'auto' }} onPress={() => { this.setState({ showExerciseModal: true }) }}>
                                    <AntDesign name='plus' size={30} />
                                </TouchableOpacity>
                                <ScrollView>
                                    <List>
                                        {this.state.exercises.map((exercise) => {
                                            return this.renderExercise(exercise);
                                        })}
                                    </List>
                                </ScrollView>
                            </View>
                            <View style={styles.footer}>
                                <Button bordered success style={styles.footerButton} onPress={() => this.props.onClose()}>
                                    <Text>{localizationProvider.getLocalizedString(Cancel)}</Text>
                                </Button>
                                <Button bordered success style={styles.footerButton} onPress={() => {
                                    this.state.exercises.forEach((exercise) => {
                                        if (exercise.selected) {
                                            delete exercise.selected;
                                            if (this.props.exerciseId) {
                                                this.props.onAddToExistingExercise(exercise, this.props.exerciseId);
                                            } else {
                                                this.props.onAddExercise(exercise);
                                            }
                                        }
                                    })
                                    this.props.onClose()
                                }}>
                                    <Text>{localizationProvider.getLocalizedString(AddSelected)}</Text>
                                </Button>
                            </View>
                        </Form>
                    </Container>
                </View>
            </View >);
    }

    private renderExercise(exercise: any) {
        return (<ListItem noIndent onPress={() => {
            exercise.selected = !exercise.selected;
            this.setState({ exercises: this.state.exercises });
        }}>
            <Left><Text style={{ color: exercise.selected ? 'green' : 'black' }}>{exercise.title}</Text></Left>
            <Right>{this.renderExerciseIcon(exercise.type, exercise.selected)}</Right>
        </ListItem>)
    }

    private renderExerciseIcon(type: ExerciseType, selected: boolean) {
        if (type === ExerciseType.WeightReps) {
            return <MaterialCommunityIcons color={selected ? 'green' : 'black'} size={30} name='weight'></MaterialCommunityIcons>
        } else {
            return <MaterialIcons color={selected ? 'green' : 'black'} size={30} name='timer'></MaterialIcons>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    footer: {
        alignContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerButton: {
        margin: 10,
        flex: 1,
        justifyContent: 'center'
    }
});

function mapStateToProps(state) {
    return {
        exercises: state.exercises
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAddExercise: exercise => {
            dispatch(AddExerciseAction(exercise));
        },
        onAddToExistingExercise: (exercise, parentId) => {
            dispatch(addToExistingExerciseAction(exercise, parentId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseManager);
