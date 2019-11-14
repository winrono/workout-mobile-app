import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Container, Form, Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import SetEditor from './set-editor';

export default class SetManipulationModalBody extends React.Component<{ content: React.ReactNode, footer: React.ReactNode }> {
    render() {
        return (
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
                    <Container style={styles.container}>
                        <Form style={{ flex: 1 }}>
                            <View style={styles.contentContainer}>
                                {this.props.content}
                            </View>
                            <View style={styles.footer}>
                                {this.props.footer}
                            </View>
                        </Form>
                    </Container>
                </View>
            </View>
        );
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
