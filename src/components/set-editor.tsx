import React from 'react';
import { View, TextInput } from 'react-native';
import { Item, Input, Label } from 'native-base';
import { Set } from '../models/set';
import localizationProvider from '../localization/localization-provider';
import { Distance, Reps, Weight, Comment, Minutes, Seconds } from '../localization/constants';

export default class SetEditor extends React.Component<
    { set: Set; onEditDone: () => void; onSetChange: (set: Set) => void },
    { set: Set, minutes: string, seconds: string }
    > {
    _firstInput: any;
    _secondInput: any;
    _thirdInput: any;
    constructor(props) {
        super(props);
        const minutes = Math.floor(props.set.time / 60).toString();
        const seconds = (props.set.time % 60).toString();
        console.log(minutes);
        this.state = { set: props.set, minutes: minutes, seconds: seconds };
    }
    render() {
        return (
            <View>
                {this.state.set.weight != null ? this.renderWeightRepsBasedInputs() : this.renderTimeDistanceBasedInputs()}
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

    private renderWeightRepsBasedInputs() {
        return ([
            <Item floatingLabel>
                <Label>{localizationProvider.getLocalizedString(Weight)}</Label>
                <Input
                    getRef={c => this._firstInput = c}
                    returnKeyType={'next'}
                    keyboardType='numeric'
                    value={this.state.set.weight}
                    selectTextOnFocus={true}
                    blurOnSubmit={false}
                    autoFocus={true}
                    onChangeText={value => {
                        let newState = { ...this.state.set };
                        newState.weight = value;
                        this.setState({ set: newState }, () => {
                            this.props.onSetChange(this.state.set);
                        });
                    }}
                    onSubmitEditing={() => {
                        this._secondInput._root.focus();
                    }}
                />
            </Item>,
            <Item floatingLabel>
                <Label>{localizationProvider.getLocalizedString(Reps)}</Label>
                <Input
                    getRef={c => this._secondInput = c}
                    returnKeyType={'next'}
                    keyboardType='numeric'
                    value={this.state.set.repsCount}
                    selectTextOnFocus={true}
                    blurOnSubmit={false}
                    onChangeText={value => {
                        let newState = { ...this.state.set };
                        newState.repsCount = value;
                        this.setState({ set: newState }, () => {
                            this.props.onSetChange(this.state.set);
                        });
                    }}
                    onSubmitEditing={() => {
                        this.props.onEditDone();
                    }}
                />
            </Item>
        ]);
    }

    private renderTimeDistanceBasedInputs() {
        return ([
            <View style={{ flexDirection: 'row' }}>
                <Item floatingLabel style={{ flex: 1 }} >
                    <Label>{localizationProvider.getLocalizedString(Minutes)}</Label>
                    <Input
                        getRef={c => this._firstInput = c}
                        returnKeyType={'next'}
                        keyboardType='numeric'
                        value={this.state.minutes}
                        selectTextOnFocus={true}
                        blurOnSubmit={false}
                        autoFocus={true}
                        onChangeText={value => {
                            this.setState({ minutes: value }, () => {
                                this.handleTimeChange();
                            });
                        }}
                        onSubmitEditing={() => {
                            this._secondInput._root.focus();
                        }}
                    />
                </Item>
                <Item floatingLabel style={{ flex: 1 }}>
                    <Label>{localizationProvider.getLocalizedString(Seconds)}</Label>
                    <Input
                        getRef={c => this._secondInput = c}
                        returnKeyType={'next'}
                        keyboardType='numeric'
                        value={this.state.seconds}
                        selectTextOnFocus={true}
                        blurOnSubmit={false}
                        onChangeText={value => {
                            this.setState({ seconds: value }, () => {
                                this.handleTimeChange();
                            });
                        }}
                        onSubmitEditing={() => {
                            this._thirdInput._root.focus();
                        }}
                    />
                </Item>
            </View>,
            <Item floatingLabel>
                <Label>{localizationProvider.getLocalizedString(Distance)}</Label>
                <Input
                    getRef={c => this._thirdInput = c}
                    returnKeyType={'next'}
                    keyboardType='numeric'
                    value={this.state.set.distance}
                    selectTextOnFocus={true}
                    blurOnSubmit={false}
                    autoFocus={false}
                    onChangeText={value => {
                        let newState = { ...this.state.set };
                        newState.distance = value;
                        this.setState({ set: newState }, () => {
                            this.props.onSetChange(this.state.set);
                        });
                    }}
                    onSubmitEditing={() => {
                        this.props.onEditDone();
                    }}
                />
            </Item>
        ]);
    }

    private handleTimeChange() {
        const time = Number(this.state.minutes) * 60 + Number(this.state.seconds);
        this.setState({ set: { ...this.state.set, time } }, () => {
            this.props.onSetChange(this.state.set);
        });
    }
}
