import React from 'react';
import { View, Item, Label, Input, Button, Text } from 'native-base';
import { lazyInject } from '../ioc/container';

export class AddSet extends React.Component {

    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;
    _repsInput: any;
    _weightInput: any;

    constructor(props){
        super(props);
        this.state = {name: '', weight: '', repetitionsCount: ''};
    }

    render() {
        return (<View>
            <Item floatingLabel>
                <Label>Name</Label>
                <Input
                    value={this.state.name}
                    returnKeyType={'next'}
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
                    keyboardType='numeric'
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
                    keyboardType='numeric'
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
        </View>);
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