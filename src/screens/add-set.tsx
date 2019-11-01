import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { lazyInject } from '../ioc/container';
import { ExerciseService } from '../data-access/exercise-service';
import { Form, Container, Content, Item, Label, Button, Input } from 'native-base';
import { Navbar } from '../components/navbar';
import { connect } from 'react-redux';
import { setSetName, setSetRepsCount, setSetWeight } from '../actions/set';
import SetEditor from '../components/set-editor';
import { Set } from '../models/set';

class AddSet extends React.Component<{ set: Set }, any> {
    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;
    _repsInput: any;
    _weightInput: any;

    render() {
        return (
            <Container style={styles.container}>
                <Navbar />
                <Content>
                    <Form>
                        <SetEditor
                            name={this.props.set.name}
                            weight={this.props.set.weight}
                            repsCount={this.props.set.repsCount}
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
                name: this.props.set.name,
                repsCount: this.props.set.repsCount,
                weight: this.props.set.weight,
                creationTime: new Date()
            })
            .then(() => {
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
    console.log(state);
    return {
        set: state.set
    };
}

export default connect(
    mapStateToProps
)(AddSet);
