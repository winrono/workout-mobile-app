import React from 'react';
import { View } from 'react-native';
import { Item, Input, Label } from 'native-base';
import { Set } from '../models/set';

export default class SetEditor extends React.Component<
    { set: Set, autoFocus?; onSetChange: (set: Set) => void },
    { set: Set }
    > {
    _weightInput: any;
    _repsInput: any;
    constructor(props) {
        super(props);
        this.state = { set: props.set };
    }
    render() {
        return (
            <View>
                <Item floatingLabel>
                    <Label>Weight(kg)</Label>
                    <Input
                        getRef={c => (this._weightInput = c)}
                        returnKeyType={'next'}
                        keyboardType='numeric'
                        value={this.state.set.weight}
                        onChangeText={weight => {
                            this.setState({ set: { ...this.state.set, weight: weight } }, () => {
                                this.props.onSetChange(this.state.set);
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
                        value={this.state.set.repsCount}
                        onChangeText={repsCount => {
                            this.setState({ set: { ...this.state.set, repsCount: repsCount } }, () => {
                                this.props.onSetChange(this.state.set);
                            });
                        }}
                    />
                </Item>
            </View>
        );
    }
}