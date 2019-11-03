import React from 'react';
import { Container, Content, Form, Button } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import SetEditor from '../components/set-editor';
import { Set } from '../models/set';
import { ExerciseService } from '../data-access/exercise-service';
import { lazyInject } from '../ioc/container';
import { Navbar } from '../components/navbar';
import { connect } from 'react-redux';
import { setSet } from '../actions/set-set';

class EditSet extends React.Component<any, { set: Set }> {
    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;

    constructor(props) {
        super(props);
        this.state = { set: props.navigation.getParam('set', null) };
    }
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Navbar />
                    <Form>
                        <SetEditor
                            name={this.state.set.name}
                            weight={this.state.set.weight}
                            repsCount={this.state.set.repsCount}
                            onSetChange={set => {
                                this.setState({
                                    set: {
                                        ...this.state.set,
                                        ...set
                                    }
                                });
                            }}
                        ></SetEditor>
                        <Button block style={{ marginTop: 20 }} onPress={this.onSave.bind(this)}>
                            <Text>Save</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }

    async onSave() {
        await this._exerciseService.updateSet(this.state.set);
        this.props.onSaveSet(this.state.set);
        this.props.navigation.navigate('Dashboard');
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

function mapDispatchToProps(dispatch) {
    return {
        onSaveSet: set => {
            dispatch(setSet(set));
        }
    };
}

export default connect(
    undefined,
    mapDispatchToProps
)(EditSet);
