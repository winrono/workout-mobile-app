import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { lazyInject } from '../ioc/container';
import { ExerciseService } from '../data-access/exercise-service';
import { Form, Container, Content, Item, Label, Button, Input, View, Icon, Header, Left, Right } from 'native-base';
import SetEditor from '../components/set-editor';
import { SuperSet } from '../models/super-set';
import { Set } from '../models/set';
import { Navbar } from '../components/navbar';
import { connect } from 'react-redux';
import { setSupersetName, addSetToSuperset, removeSetFromSuperset } from '../actions/set';

class AddSuperset extends React.Component<{ superset: SuperSet }> {
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
                        <KeyboardAvoidingView behavior="padding" enabled>
                            <Item floatingLabel>
                                <Label>Superset name</Label>
                                <Input
                                    value={this.props.superset.name}
                                    returnKeyType={'next'}
                                    onChangeText={text => {
                                        this.props.onSupersetNameChange(text);
                                    }}
                                />
                            </Item>
                            {this.props.superset.sets.map((set, i) => (
                                <SetEditor name={set.name} repsCount={set.repsCount} weight={set.weight}></SetEditor>
                            ))}
                            <View style={styles.actionsCountainer}>
                                <Button
                                    rounded
                                    danger
                                    iconLeft
                                    style={[styles.button, { margin: 20 }]}
                                    onPress={() => this.props.onSupersetRemoveSet()}
                                >
                                    <Icon name="trash" />
                                    <Text>Remove set</Text>
                                </Button>
                                <Button
                                    rounded
                                    primary
                                    iconLeft
                                    style={[styles.button, { margin: 10 }]}
                                    onPress={() => this.props.onSupersetAddSet()}
                                >
                                    <Icon name="add" />
                                    <Text>Add set</Text>
                                </Button>
                            </View>
                            <Button block success onPress={this.submit.bind(this)}>
                                <Text>Save superset</Text>
                            </Button>
                        </KeyboardAvoidingView>
                    </Form>
                </Content>
            </Container>
        );
    }
    async submit() {
        this._exerciseService.postSuperSet({ ...this.props.superset, creationTime: new Date() });
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

function mapStateToProps(state) {
    return {
        superset: state.superset
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSupersetNameChange: text => {
            dispatch(setSupersetName(text));
        },
        onSupersetAddSet: () => {
            dispatch(addSetToSuperset());
        },
        onSupersetRemoveSet: () => {
            dispatch(removeSetFromSuperset());
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddSuperset);
