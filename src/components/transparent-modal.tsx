import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Container, Form, Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import SetEditor from './set-editor';

export default class TransparentModal extends React.Component<{ visible: boolean }> {
    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => { }}
            >
                {this.props.children}
            </Modal>
        );
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
