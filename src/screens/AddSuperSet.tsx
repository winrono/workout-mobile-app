import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { lazyInject } from '../ioc/container';
import { ExerciseService } from '../data-access/exercise-service';
import { Form, Container, Content, Item, Label, Button, Input, View } from 'native-base';
import { SetEditor } from '../components/set-editor';
import { SuperSet } from '../models/super-set';
import { Set } from '../models/set';

const initialState = { name: '', repetitionsCount: '', weight: '', count: 0 };

export default class AddSet extends React.Component<any, { set: SuperSet }> {
    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;
    _repsInput: any;
    _weightInput: any;

    constructor(props) {
        super(props);
        this.state = { set: { name: 'Default SuperSet', sets: [new Set()] } };
    }
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Set name</Label>
                            <Input
                                value={this.state.set.name}
                                returnKeyType={'next'}
                                autoFocus={true}
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
                        <Button
                            block
                            style={{ marginTop: 20 }}
                            onPress={() =>
                                this.setState(prevState => ({
                                    set: { ...prevState.set, sets: [...prevState.set.sets, new Set()] }
                                }))
                            }
                        >
                            <Text>Add set</Text>
                        </Button>
                        <Button block style={{ marginTop: 20 }} onPress={this.submit.bind(this)}>
                            <Text>Submit</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
    async submit() {
        this._exerciseService.postSuperSet({ ...this.state.set, creationTime: new Date() });
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
