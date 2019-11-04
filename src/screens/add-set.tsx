import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { lazyInject } from '../ioc/container';
import { ExerciseService } from '../data-access/exercise-service';
import { Form, Container, Content, Button } from 'native-base';
import { Navbar } from '../components/navbar';
import { connect } from 'react-redux';
import { setSet } from '../actions/set-set';
import SetEditor from '../components/set-editor';
import { Set } from '../models/set';

class AddSet extends React.Component<{ set: Set, navigation: any }, { set: Set, date: Date }> {
    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;
    _repsInput: any;
    _weightInput: any;

    constructor(props) {
        super(props);
        this.state = { set: props.set, date: this.props.navigation.getParam('date', new Date()) };
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
                creationTime: this.state.date.toISOString()
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
