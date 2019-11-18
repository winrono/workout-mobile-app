import React from 'react';
import { View } from 'react-native';
import { Item, Input, Label } from 'native-base';
import { Set } from '../models/set';
import localizationProvider from '../localization/localization-provider';
import { Weight, Reps, Comment } from '../localization/constants';

export default class SetEditor extends React.Component<
    { set: Set; onEditDone: () => void; onSetChange: (set: Set) => void },
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
                    <Label>{localizationProvider.getLocalizedString(Weight)}</Label>
                    <Input
                        getRef={c => (this._weightInput = c)}
                        returnKeyType={'next'}
                        keyboardType="numeric"
                        value={this.state.set.weight}
                        selectTextOnFocus={true}
                        blurOnSubmit={false}
                        autoFocus={true}
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
                    <Label>{localizationProvider.getLocalizedString(Reps)}</Label>
                    <Input
                        getRef={c => (this._repsInput = c)}
                        returnKeyType={'done'}
                        keyboardType="numeric"
                        value={this.state.set.repsCount}
                        selectTextOnFocus={true}
                        onChangeText={repsCount => {
                            this.setState({ set: { ...this.state.set, repsCount: repsCount } }, () => {
                                this.props.onSetChange(this.state.set);
                            });
                        }}
                        onSubmitEditing={() => {
                            this.props.onEditDone();
                        }}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>{localizationProvider.getLocalizedString(Comment)}</Label>
                    <Input
                        returnKeyType={'done'}
                        value={this.state.set.comment}
                        selectTextOnFocus={true}
                        onChangeText={comment => {
                            this.setState({ set: { ...this.state.set, comment: comment } }, () => {
                                this.props.onSetChange(this.state.set);
                            });
                        }}
                        onSubmitEditing={() => {
                            this.props.onEditDone();
                        }}
                    />
                </Item>
            </View>
        );
    }
}
