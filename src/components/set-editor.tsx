import React from 'react';
import { View } from 'react-native';
import { Item, Input, Label } from 'native-base';

export default class SetEditor extends React.Component<
    { repsCount; weight; autoFocus?; onSetChange: ({ name, repsCount, weight }) => void },
    { repsCount; weight }
    > {
    _weightInput: any;
    _repsInput: any;
    constructor(props) {
        super(props);
        this.state = { repsCount: props.repsCount, weight: props.weight };
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