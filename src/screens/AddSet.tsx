import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { lazyInject } from '../ioc/container';
import { ExerciseService } from '../data-access/exercise-service';
import { Form, Container, Content, Item, Label, Button, Input } from 'native-base';

const initialState = { name: '', repetitionsCount: '', weight: '' };

export default class AddSet extends React.Component<{name, repetitionsCount, weight}, any> {

    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;
    _repsInput: any;
    _weightInput: any;

    constructor(props) {
        super(props);
        this.state = initialState;
    }
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input
                                value={this.state.name}
                                returnKeyType={'next'}
                                autoFocus={true}
                                onChangeText={text => {
                                    this.setState({ name: text });
                                }}
                                onSubmitEditing={() => {
                                    this._repsInput._root.focus();
                                }}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Reps</Label>
                            <Input
                                getRef={(c) => this._repsInput = c}
                                returnKeyType={'next'}
                                keyboardType='numeric'
                                value={this.state.repetitionsCount}
                                onChangeText={(text) => this.setState({ repetitionsCount: text })}
                                onSubmitEditing={() => {
                                    this._weightInput._root.focus();
                                }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Weight(kg)</Label>
                            <Input
                                getRef={(c) => this._weightInput = c}
                                returnKeyType={'done'}
                                keyboardType='numeric'
                                value={this.state.weight}
                                onChangeText={(text) => this.setState({ weight: text })}
                                onSubmitEditing={() => {
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
        this._exerciseService.postSet({
            name: this.state.name,
            repetitionsCount: this.state.repetitionsCount,
            weight: this.state.weight,
            creationTime: new Date()
        }).then(() => {
            this.setState(initialState);
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