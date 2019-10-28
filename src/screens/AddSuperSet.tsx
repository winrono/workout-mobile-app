import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { lazyInject } from '../ioc/container';
import { ExerciseService } from '../data-access/exercise-service';
import { Form, Container, Content, Item, Label, Button, Input, View } from 'native-base';
import { SetEditor } from '../components/set-editor';

const initialState = { name: '', repetitionsCount: '', weight: '', count: 0 };

export default class AddSet extends React.Component<any, { name, repetitionsCount, weight, count }> {

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
                        {[...Array(this.state.count)].map((x, i) =>
                            <SetEditor></SetEditor>
                        )}
                        <Button block style={{ marginTop: 20 }} onPress={this.test.bind(this)}>
                            <Text>Add set</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
    test() {
        let newCount = this.state.count + 1;
        this.setState({ count: newCount });
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