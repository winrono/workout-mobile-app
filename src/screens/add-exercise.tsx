import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { lazyInject } from '../ioc/container';
import { ExerciseService } from '../data-access/exercise-service';
import { Form, Container, Content, Button, Input, Item, Label } from 'native-base';
import { Navbar } from '../components/navbar';
import { connect } from 'react-redux';
import { AddExercise as AddExerciseAction } from '../actions/add-exercise';
import SetEditor from '../components/set-editor';
import { Set } from '../models/set';
import { Exercise } from '../models/exercise';

class AddExercise extends React.Component<{ set: Set, navigation: any }, { name: string, date: Date }> {
    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;
    _repsInput: any;
    _weightInput: any;

    constructor(props) {
        super(props);
        this.state = { name: '', date: this.props.navigation.getParam('date', new Date()) };
    }

    render() {
        return (
            <Container style={styles.container}>
                <Navbar />
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Exercise name</Label>
                            <Input
                                value={this.state.name}
                                returnKeyType={'done'}
                                autoFocus={true}
                                onChangeText={name => {
                                    this.setState({ name })
                                }}
                                onSubmitEditing={this.submit.bind(this)}
                            />
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
        let exercise: Exercise = { title: this.state.name, sets: [] };
        this.props.onAddExercise(exercise, this.state.date);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcfdff',
        flex: 1
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        textAlign: 'center'
    }
});

function mapDispatchToProps(dispatch) {
    return {
        onAddExercise: (exercise, date) => {
            dispatch((AddExerciseAction(exercise, date)));
        }
    };
}

export default connect(
    undefined,
    mapDispatchToProps
)(AddExercise);
