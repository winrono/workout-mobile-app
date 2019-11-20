import React from 'react';
import { View, TextInput } from 'react-native';
import { Item, Input, Label } from 'native-base';
import { Set } from '../models/set';
import localizationProvider from '../localization/localization-provider';
import { CommentProperty } from '../localization/constants';

export default class SetEditor extends React.Component<
    { set: Set; onEditDone: () => void; onSetChange: (set: Set) => void },
    { set: Set }
    > {
    _weightInput: any;
    _repsInput: any;
    _inputs: Input[] = [];
    constructor(props) {
        super(props);
        this.state = { set: props.set };
    }
    render() {
        let items: JSX.Element[] = [];
        let properties = this.getRenderableProperties();
        properties.forEach((prop, index) => {
            items.push(<Item floatingLabel>
                <Label>{localizationProvider.getLocalizedString(prop.toUpperCase() + '_PROPERTY')}</Label>
                <Input
                    getRef={c => this._inputs.push(c)}
                    returnKeyType={prop === 'comment' ? 'done' : 'next'}
                    keyboardType='numeric'
                    value={this.state.set[prop]}
                    selectTextOnFocus={true}
                    blurOnSubmit={false}
                    autoFocus={index === 0 ? true : false}
                    onChangeText={value => {
                        let newState = { ...this.state.set };
                        newState[prop] = value;
                        this.setState({ set: newState }, () => {
                            this.props.onSetChange(this.state.set);
                        });
                    }}
                    onSubmitEditing={prop === 'comment' ? this.props.onEditDone.bind(this) : this.onInputSubmitEditing.bind(this, index)}
                />
            </Item>)
        });
        return (
            <View>
                {items}
                <Item floatingLabel>
                    <Label>{localizationProvider.getLocalizedString(CommentProperty)}</Label>
                    <Input
                        getRef={c => this._inputs.push(c)}
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

    onInputSubmitEditing(id) {
        let nextInput = this._inputs[id + 1];
        if (nextInput) {
            nextInput._root.focus();
        }
    }

    private getRenderableProperties(): string[] {
        let props = Object.keys(this.state.set);
        return props.filter((prop) => {
            return prop !== 'comment' && prop !== 'id'
        });
    }
}
