import React from 'react';
import { View } from 'react-native';
import { Item, Input, Label } from 'native-base';

export class SetEditor extends React.Component<any, { name, repetitionsCount, weight }> {
    _weightInput: any;
    _repsInput: any;
    constructor(props) {
        super(props);
        this.state = { name: '', repetitionsCount: '', weight: '' }
    }
    render() {
        return (<View><Item floatingLabel>
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
                    getRef={(c) => this._repsInput = c}
                    returnKeyType={'next'}
                    keyboardType='numeric'
                    value={this.state.repetitionsCount}
                    onChangeText={(text) => this.setState({ repetitionsCount: text })}
                    onSubmitEditing={() => {
                        this._weightInput._root.focus();
                    }} />
            </Item>
            <Item floatingLabel>
                <Label>Weight(kg)</Label>
                <Input
                    getRef={(c) => this._weightInput = c}
                    returnKeyType={'done'}
                    keyboardType='numeric'
                    value={this.state.weight}
                    onChangeText={(text) => this.setState({ weight: text })} />
            </Item>
        </View>);
    }
}