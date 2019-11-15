import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Container, Form, Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import SetEditor from './set-editor';
import { CalendarList } from 'react-native-calendars';

export default class CalendarModalContent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { date: this.props.date };
    }
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
                <View style={{ marginTop: 40, marginBottom: 40 }}>
                    <Container style={styles.container}>
                        <Form style={{ flex: 1 }}>
                            <View style={styles.contentContainer}>
                                <CalendarList
                                    horizontal={true}
                                    pagingEnabled={true}
                                    onDayPress={this.onDayPress.bind(this)}
                                    markedDates={{ [this.state.date]: { selected: true, disableTouchEvent: true } }}
                                ></CalendarList>
                            </View>
                            <View style={styles.footer}>
                                <Button
                                    bordered
                                    success
                                    style={styles.footerButton}
                                    onPress={() => this.props.onCancel()}
                                >
                                    <Text>Cancel</Text>
                                </Button>
                                <Button
                                    bordered
                                    success
                                    style={styles.footerButton}
                                    onPress={() => this.props.onDateSubmit(this.state.date)}
                                >
                                    <Text>Save</Text>
                                </Button>
                            </View>
                        </Form>
                    </Container>
                </View>
            </View>
        );
    }

    private onDayPress(day) {
        this.setState({
            date: day.dateString
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
