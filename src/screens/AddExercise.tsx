import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { lazyInject } from '../ioc/container';
import { Types } from '../ioc/types';
import { ExerciseService } from '../data-access/exercise-service';
import { Form, Container, Content, Item, Label, Header, Button, ListItem, Input } from 'native-base';

export default class AddExercise extends React.Component<any, { name, repetitionsCount, weight }> {

    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;

    constructor(props) {
        super(props);
        this.state = { name: '', repetitionsCount: '', weight: '' };
    }
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Exercise name</Label>
                            <Input
                                value={this.state.name}
                                returnKeyType={"next"}
                                autoFocus={true}
                                onChangeText={text => {
                                    this.setState({ name: text });
                                }}
                                onSubmitEditing={(event) => {
                                    this._repsInput._root.focus();
                                }}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Repetitions count</Label>
                            <Input
                                getRef={(c) => this._repsInput = c}
                                returnKeyType={"next"}
                                keyboardType='numeric'
                                value={this.state.repetitionsCount}
                                onChangeText={(text) => this.setState({ repetitionsCount: text })}
                                onSubmitEditing={(event) => {
                                    this._weightInput._root.focus();
                                }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Weight (kg)</Label>
                            <Input
                                getRef={(c) => this._weightInput = c}
                                returnKeyType={"done"}
                                keyboardType='numeric'
                                value={this.state.weight}
                                onChangeText={(text) => this.setState({ weight: text })}
                                onSubmitEditing={(event) => {
                                    this.submit();
                                }} />
                        </Item>
                        <Button block style={{ marginTop: 20 }} onPress={this.submit.bind(this)}>
                            <Text>Submit</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
    async submit() {
        this._exerciseService.postExercise({
            name: this.state.name,
            repetitionsCount: this.state.repetitionsCount,
            weight: this.state.weight,
            creationTime: new Date()
        }).then(() => {
            this.props.navigation.navigate('Profile');
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcfdff',
        flex: 1,
        paddingTop: 25
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        textAlign: 'center'
    }
});