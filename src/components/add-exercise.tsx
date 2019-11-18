import React from 'react';
import { Button, Item, Label, Input } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import ModalLayout from './modal-layout';
import { Exercise } from '../models/exercise';
import { AddExercise as AddExerciseAction } from '../actions/add-exercise';
import { addToExistingExercise as addToExistingExerciseAction } from '../actions/add-to-existing-exercise';
import localizationProvider from '../localization/localization-provider';
import { ExerciseName, Cancel, Create } from '../localization/constants';

class AddExercise extends React.Component<
    {
        onAddExercise: (exercise: Exercise) => void;
        onAddToExistingExercise: (exerise: Exercise, parentId: string) => void;
        onComplete: () => void;
        parentId: string;
    },
    { name: string }
> {
    _repsInput: any;
    _weightInput: any;

    constructor(props) {
        super(props);
        this.state = { name: '' };
    }
    render() {
        return <ModalLayout height={200} content={this.getContent()} footer={this.getFooter()} />;
    }

    submit() {
        let exercise: Exercise = { title: this.state.name, sets: [] };
        if (this.props.parentId != null) {
            this.props.onAddToExistingExercise(exercise, this.props.parentId);
        } else {
            this.props.onAddExercise(exercise);
        }
        this.props.onComplete();
    }

    private getContent() {
        return (
            <Item floatingLabel>
                <Label>{localizationProvider.getLocalizedString(ExerciseName)}</Label>
                <Input
                    value={this.state.name}
                    returnKeyType={'done'}
                    autoFocus={true}
                    onChangeText={name => {
                        this.setState({ name });
                    }}
                    onSubmitEditing={this.submit.bind(this)}
                />
            </Item>
        );
    }

    private getFooter() {
        return [
            <Button bordered success style={styles.footerButton} onPress={() => this.props.onComplete()}>
                <Text>{localizationProvider.getLocalizedString(Cancel)}</Text>
            </Button>,
            <Button bordered success style={styles.footerButton} onPress={this.submit.bind(this)}>
                <Text>{localizationProvider.getLocalizedString(Create)}</Text>
            </Button>
        ];
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1
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

export default connect(undefined, mapDispatchToProps)(AddExercise);
