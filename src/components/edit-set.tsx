import React from 'react';
import { Container, Form, Button } from 'native-base';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SetEditor from './set-editor';
import { Set } from '../models/set';
import { connect } from 'react-redux';
import { editSet } from '../actions/edit-set';
import { AntDesign } from '@expo/vector-icons';
import { deleteSet } from '../actions/delete-set';
import ModalLayout from './modal-layout';

class EditSet extends React.Component<
    { onEditCompleted: () => void; onSaveSet: (set: Set) => void; onDeleteSet: (set: Set) => void; set: Set },
    { set: Set }
    > {
    constructor(props) {
        super(props);
        this.state = { set: props.set };
    }
    render() {
        return (
            <ModalLayout content={this.getContent()} footer={this.getFooter()} />
        );
    }

    onDelete() {
        this.props.onDeleteSet(this.state.set);
        this.props.onEditCompleted();
    }

    onSave() {
        this.props.onSaveSet(this.state.set);
        this.props.onEditCompleted();
    }

    private getContent() {
        return ([
            <TouchableOpacity
                key='0'
                style={{ marginLeft: 'auto', right: 20 }}
                onPress={() => {
                    this.onDelete();
                }}
            >
                <AntDesign size={30} name='delete'></AntDesign>
            </TouchableOpacity>,
            <SetEditor
                key='1'
                set={this.state.set}
                onSetChange={set => {
                    this.setState({
                        set: {
                            ...this.state.set,
                            ...set
                        }
                    });
                }}
                onEditDone={this.onSave.bind(this)}
            ></SetEditor>
        ])
    }

    private getFooter() {
        return ([
            <Button
                bordered
                success
                key={0}
                style={styles.footerButton}
                onPress={() => this.props.onEditCompleted()}
            >
                <Text>Cancel</Text>
            </Button>,
            <Button
                bordered
                success
                key={1}
                style={styles.footerButton}
                onPress={this.onSave.bind(this)}>
                <Text>Save</Text>
            </Button>
        ])
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
        onSaveSet: set => {
            dispatch(editSet(set));
        },
        onDeleteSet: set => {
            dispatch(deleteSet(set));
        }
    };
}

export default connect(undefined, mapDispatchToProps)(EditSet);
