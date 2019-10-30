import React from 'react';
import { Container, Content, Form, Button } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import { SetEditor } from '../components/set-editor';
import { Set } from '../models/set';
import { ExerciseService } from '../data-access/exercise-service';
import { lazyInject } from '../ioc/container';
import { Navbar } from '../components/navbar';

export default class EditSet extends React.Component<any, Set> {

    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;

    constructor(props) {
        super(props);
        this.state = props.navigation.getParam('set', null);
    }
    render() {
        return (<Container style={styles.container}>
            <Content>
                <Navbar />
                <Form>
                    <SetEditor
                        name={this.state.name}
                        weight={this.state.weight}
                        repetitionsCount={this.state.repetitionsCount}
                        onChange={editedSet => {
                            this.setState({ ...editedSet }, () => {
                                console.log(this.state);
                            });
                        }}>
                    </SetEditor>
                    <Button block style={{ marginTop: 20 }} onPress={this.onSave.bind(this)}>
                        <Text>Save</Text>
                    </Button>
                </Form>
            </Content>
        </Container>);
    }

    async onSave() {
        console.log(this.setState);
        await this._exerciseService.updateSet(this.state);
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
