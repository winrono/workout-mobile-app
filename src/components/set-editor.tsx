import React from 'react';
import { View } from 'react-native';
import { Item, Input, Label } from 'native-base';

export class SetEditor extends React.Component<{ name?, repetitionsCount?, weight?, autoFocus?, onChange: ({ name, repetitionsCount, weight }) => void }, { name, repetitionsCount, weight }> {
    _weightInput: any;
    _repsInput: any;
    state = { name: this.props.name, repetitionsCount: this.props.repetitionsCount, weight: this.props.weight };
    render() {
        return (<View><Item floatingLabel>
            <Label>Name</Label>
            <Input
                value={this.state.name}
                returnKeyType={'next'}
                autoFocus={this.props.autoFocus}
                onChangeText={text => {
                    this.setState({ name: text }, () => this.props.onChange(this.state));
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
                    onChangeText={(text) => {
                        this.setState({ repetitionsCount: text }, () => this.props.onChange(this.state));
                    }}
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
                    onChangeText={(text) => {
                        this.setState({ weight: text }, () => this.props.onChange(this.state));
                    }} />
            </Item>
        </View>);
    }
}