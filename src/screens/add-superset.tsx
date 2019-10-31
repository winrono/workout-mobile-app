import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { lazyInject } from '../ioc/container';
import { ExerciseService } from '../data-access/exercise-service';
import { Form, Container, Content, Item, Label, Button, Input, View, Icon, Header, Left, Right } from 'native-base';
import { SetEditor } from '../components/set-editor';
import { SuperSet } from '../models/super-set';
import { Set } from '../models/set';
import { Navbar } from '../components/navbar';

export default class AddSuperset extends React.Component<any, { set: SuperSet }> {
    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;
    _repsInput: any;
    _weightInput: any;

    constructor(props) {
        super(props);
        this.state = { set: { name: 'Default', sets: [new Set()] } };
    }
    render() {
        return (
            <Container style={styles.container}>
                <Navbar />
                <Content>
                    <Form>
                        <KeyboardAvoidingView behavior='padding' enabled>
                            <Item floatingLabel>
                                <Label>Superset name</Label>
                                <Input
                                    value={this.state.set.name}
                                    returnKeyType={'next'}
                                    onChangeText={text => {
                                        this.setState({ set: { ...this.state.set, name: text } });
                                    }}
                                />
                            </Item>
                            {this.state.set.sets.map((set, i) => (
                                <SetEditor
                                    onChange={editedSet => {
                                        const sets = [...this.state.set.sets];
                                        sets[i] = editedSet;
                                        this.setState(prevState => ({
                                            set: { ...prevState.set, sets: sets }
                                        }));
                                    }}
                                ></SetEditor>
                            ))}
                            <View style={styles.actionsCountainer}>
                                <Button rounded danger iconLeft
                                    style={[styles.button, { margin: 20 }]}
                                    onPress={() => {
                                        const sets = [...this.state.set.sets];
                                        if (sets.length > 1) {
                                            sets.pop();
                                            this.setState(prevState => ({
                                                set: { ...prevState.set, sets: sets }
                                            }));
                                        }
                                    }}>
                                    <Icon name='trash' />
                                    <Text>Remove set</Text>
                                </Button>
                                <Button rounded primary iconLeft
                                    style={[styles.button, { margin: 10 }]}
                                    onPress={() =>
                                        this.setState(prevState => ({
                                            set: { ...prevState.set, sets: [...prevState.set.sets, new Set()] }
                                        }))
                                    }>
                                    <Icon name='add' />
                                    <Text>Add set</Text>
                                </Button>
                            </View>
                            <Button block success onPress={this.submit.bind(this)}>
                                <Text>Save superset</Text>
                            </Button>
                        </KeyboardAvoidingView>
                    </Form>
                </Content>
            </Container >
        );
    }
    async submit() {
        this._exerciseService.postSuperSet({ ...this.state.set, creationTime: new Date() });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcfdff',
        flex: 1
    },
    actionsCountainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        flex: 1
    }
});
