import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { AddSet as AddSetAction } from '../actions/add-set';
import SetEditor from './set-editor';
import { Set } from '../models/set';
import ModalLayout from './modal-layout';
import localizationProvider from '../localization/localization-provider';
import { Cancel, Create } from '../localization/constants';

class AddSet extends React.Component<
    {
        initialSet: Set;
        exerciseId: string;
        navigation?: any;
        onAddCompleted: () => void;
        onAddSet: (set: Set, exerciseId: string) => Promise<void>;
    },
    { set: Set; exerciseId: string }
    > {
    _repsInput: any;
    _weightInput: any;

    constructor(props) {
        super(props);
        this.state = {
            set: {
                repsCount: this.props.initialSet.repsCount,
                weight: this.props.initialSet.weight,
                comment: this.props.initialSet.comment
            },
            exerciseId: this.props.exerciseId
        };
    }

    render() {
        return <ModalLayout content={this.getContent()} footer={this.getFooter()} />;
    }

    private getContent() {
        return (
            <SetEditor
                set={this.state.set}
                onSetChange={set => {
                    this.setState({
                        set: set
                    });
                }}
                onEditDone={this.submit.bind(this)}
            ></SetEditor>
        );
    }

    private getFooter() {
        return [
            <Button bordered success key={0} style={styles.footerButton} onPress={this.props.onAddCompleted.bind(this)}>
                <Text>{localizationProvider.getLocalizedString(Cancel)}</Text>
            </Button>,
            <Button bordered success key={1} style={styles.footerButton} onPress={this.submit.bind(this)}>
                <Text>{localizationProvider.getLocalizedString(Create)}</Text>
            </Button>
        ];
    }

    async submit() {
        this.props.onAddSet(this.state.set, this.state.exerciseId).then(() => {
            this.props.onAddCompleted();
        });
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
        set: state.set
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onAddSet: (set, exerciseId) => {
            return dispatch(AddSetAction(set, exerciseId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSet);
