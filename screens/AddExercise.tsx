import React from 'react';
import { View, TextInput, AsyncStorage, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default class AddExercise extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { name: '', 'repetitionsCount': '', weight: '' };
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TextInput placeholder="Exercise" style={styles.input} onChangeText={(text) => this.setState({ name: text })} value={this.state.name} />
                <TextInput placeholder="Repetitions count" keyboardType='numeric' style={styles.input} onChangeText={(text) => this.setState({ repetitionsCount: text })} value={this.state.repetitionsCount} />
                <TextInput placeholder="Weight" keyboardType='numeric' style={styles.input} onChangeText={(text) => this.setState({ weight: text })} value={this.state.weight} />
                <Button title="Submit" onPress={this.submit.bind(this)}></Button>
            </View>
        );
    }
    async submit() {
        axios.post('http://localhost:55191/exercise/exercises', {
            name: this.state.name,
            repetitionsCount: this.state.repetitionsCount,
            weight: this.state.weight
        }, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Cookie: await AsyncStorage.getItem('cookie')
                }
            }).then((res) => {
                this.props.navigation.navigate('Profile');
            });
    }
}

const styles = StyleSheet.create({
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        textAlign: 'center'
    }
});