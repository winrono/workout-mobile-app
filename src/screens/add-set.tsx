import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { lazyInject } from '../ioc/container';
import { ExerciseService } from '../data-access/exercise-service';
import { Form, Container, Content, Item, Label, Button, Input } from 'native-base';
import { Navbar } from '../components/navbar';
import { connect } from 'react-redux';
import { setSetName, setSetRepsCount, setSetWeight, setSet } from '../actions/set';
import SetEditor from '../components/set-editor';
import { Set } from '../models/set';

class AddSet extends React.Component<{ set: Set }, { set: Set }> {
    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;
    _repsInput: any;
    _weightInput: any;

    constructor(props) {
        super(props);
        this.state = { set: props.set };
    }

    render() {
        return (
            <Container style={styles.container}>
                <Navbar />
                <Content>
                    <Form>
                        <SetEditor
                            name={this.state.set.name}
                            weight={this.state.set.weight}
                            repsCount={this.state.set.repsCount}
                            onSetChange={set => {
                                this.setState({
                                    set: set
                                });
                            }}
                        ></SetEditor>
                        <Button block style={{ marginTop: 20 }} onPress={this.submit.bind(this)}>
                            <Text>Submit</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
    async submit() {
        this._exerciseService
            .postSet({
                ...this.state.set,
                creationTime: new Date()
            })
            .then(() => {
                this.props.onAddSet(this.state.set);
                this.props.navigation.navigate('Dashboard');
            });
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

function mapStateToProps(state) {
    return {
        set: state.set
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onAddSet: set => {
            dispatch(setSet(set));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddSet);
