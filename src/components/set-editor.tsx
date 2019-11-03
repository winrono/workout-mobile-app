import React from 'react';
import { View } from 'react-native';
import { Item, Input, Label } from 'native-base';

export default class SetEditor extends React.Component<
    { name; repsCount; weight; autoFocus?; onSetChange: ({ name, repsCount, weight }) => void },
    { name; repsCount; weight }
    > {
    _weightInput: any;
    _repsInput: any;
    constructor(props) {
        super(props);
        this.state = { name: props.name, repsCount: props.repsCount, weight: props.weight };
    }
    render() {
        return (
            <View>
                <Item floatingLabel>
                    <Label>Name</Label>
                    <Input
                        value={this.state.name}
                        returnKeyType={'next'}
                        autoFocus={this.props.autoFocus}
                        onChangeText={name => {
                            this.setState({ name }, () => {
                                this.props.onSetChange(this.state);
                            });
                        }}
                        onSubmitEditing={() => {
                            this._weightInput._root.focus();
                        }}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Weight(kg)</Label>
                    <Input
                        getRef={c => (this._weightInput = c)}
                        returnKeyType={'next'}
                        keyboardType='numeric'
                        value={this.state.weight}
                        onChangeText={weight => {
                            this.setState({ weight }, () => {
                                this.props.onSetChange(this.state);
                            });
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
                        returnKeyType={'done'}
                        keyboardType='numeric'
                        value={this.state.repsCount}
                        onChangeText={repsCount => {
                            this.setState({ repsCount }, () => {
                                this.props.onSetChange(this.state);
                            });
                        }}
                    />
                </Item>
            </View>
        );
    }
}