import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { lazyInject } from '../ioc/container';
import { Types } from '../ioc/types';
import { ExerciseService } from '../data-access/exercise-service';
import { Form, Container, Content, Item, Label, Header, Button, ListItem, Input } from 'native-base';
import AutoComplete from "native-base-autocomplete";
import AutoSuggest from 'react-native-autosuggest';

export default class AddExercise extends React.Component<any, { name, repetitionsCount, weight, suggestions, clicked }> {

    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;

    constructor(props) {
        super(props);
        this.state = { name: '', 'repetitionsCount': '', weight: '', suggestions: ["work", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "tee", "boom"], clicked: false };
    }
    findSuggestsions(query) {
        if (query === '') {
            return [];
        }

        const { suggestions } = this.state;
        return suggestions.filter((suggestion: string) => {
            return suggestion.startsWith(query);
        });

    }
    render() {
        const { name } = this.state;
        let suggestions = this.findSuggestsions(name);
        return (
            <Container style={styles.container}>
                <Content>
                    <View>
                        <AutoComplete
                            data={suggestions.length == 0 || this.state.clicked ? [] : suggestions}
                            defaultValue={name}
                            returnKeyType={"next"}
                            placeholder="Exercise name"
                            autoFocus={true}
                            onChangeText={text => {
                                this.setState({ clicked: false, name: text });
                            }}
                            listStyle={{ maxHeight: 200 }}
                            renderItem={item => (
                                <ListItem style={{
                                    backgroundColor: 'gray'
                                }} onPress={() => this.setState({ name: item, clicked: true })}>
                                    <Text>{item}</Text>
                                </ListItem>
                            )}
                            onSubmitEditing={(event) => {
                                this.setState({ clicked: true })
                                this._repsInput._root.focus();
                            }}
                        />
                    </View>
                    <Input
                        ref={(c) => this._repsInput = c}
                        returnKeyType={"next"}
                        keyboardType='numeric'
                        placeholder="Repetitions count"
                        value={this.state.repetitionsCount}
                        onChangeText={(text) => this.setState({ repetitionsCount: text })}
                        onSubmitEditing={(event) => {
                            this._weightInput._root.focus();
                        }} />
                    <Input
                        ref={(c) => this._weightInput = c}
                        returnKeyType={"done"}
                        keyboardType='numeric'
                        value={this.state.weight}
                        placeholder="Weight (kg)"
                        onChangeText={(text) => this.setState({ weight: text })}
                        onSubmitEditing={(event) => {
                            this.submit();
                        }} />
                    <TouchableOpacity onPress={this.submit.bind(this)}>
                        <View style={{
                            backgroundColor: 'red', alignItems: 'center',
                            justifyContent: 'center', borderRadius: 15
                        }}
                        >
                            <Text style={{ color: 'white' }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: 500, backgroundColor: 'transparent' }} />
                </Content>
            </Container>
        );
    }
    async submit() {
        this._exerciseService.postExercise({
            name: this.state.name,
            repetitionsCount: this.state.repetitionsCount,
            weight: this.state.weight,
            creationTime: new Date()
        }).then(() => {
            this.props.navigation.navigate('Profile');
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcfdff',
        flex: 1,
        paddingTop: 25
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    descriptionContainer: {
        marginTop: 10
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        textAlign: 'center'
    }
});