import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { lazyInject } from '../ioc/container';
import { ExerciseService } from '../data-access/exercise-service';
import { Form, Container, Content, Item, Label, Button, Input, Picker, Icon } from 'native-base';
import { Navbar } from '../components/navbar';
import AddSuperSet from './add-superset';

const initialState = { name: '', repetitionsCount: '', weight: '', activityType: 'Set' };

export default class AddActivity extends React.Component<{ name; repetitionsCount; weight }, any> {
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
                <Navbar />
                <Content>
                    <Form>
                        <Picker
                            mode="dropdown"
                            headerBackButtonText="Back"
                            selectedValue={this.state.activityType}
                            placeholder="Select activity type"
                            onValueChange={value => this.setState({ activityType: value })}
                        >
                            <Picker.Item label="Set" value="Set" />
                            <Picker.Item label="Superset" value="Superset" />
                            <Picker.Item label="Time exercise" value="Time" />
                        </Picker>
                        {this.renderActivityEditor()}
                    </Form>
                </Content>
            </Container>
        );
    }

    renderActivityEditor() {
        switch (this.state.activityType) {
            case 'Set': {
                return (
                    <View>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input
                                value={this.state.name}
                                returnKeyType={'next'}
                                autoFocus={true}
                                onChangeText={text => {
                                    this.setState({ name: text });
                                }}
                                onSubmitEditing={() => {
                                    this._repsInput._root.focus();
                                }}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Reps</Label>
                            <Input
                                getRef={c => (this._repsInput = c)}
                                returnKeyType={'next'}
                                keyboardType="numeric"
                                value={this.state.repetitionsCount}
                                onChangeText={text => this.setState({ repetitionsCount: text })}
                                onSubmitEditing={() => {
                                    this._weightInput._root.focus();
                                }}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Weight(kg)</Label>
                            <Input
                                getRef={c => (this._weightInput = c)}
                                returnKeyType={'done'}
                                keyboardType="numeric"
                                value={this.state.weight}
                                onChangeText={text => this.setState({ weight: text })}
                                onSubmitEditing={() => {
                                    this.submit();
                                }}
                            />
                        </Item>
                        <Button block style={{ marginTop: 20 }} onPress={this.submit.bind(this)}>
                            <Text>Submit</Text>
                        </Button>
                    </View>
                );
            }
            case 'Superset': {
                return <AddSuperSet></AddSuperSet>;
            }
        }
    }
    async submit() {
        this._exerciseService
            .postSet({
                name: this.state.name,
                repetitionsCount: this.state.repetitionsCount,
                weight: this.state.weight,
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
