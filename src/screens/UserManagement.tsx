import React, { Component } from 'react';
import { Text, View, Button, TextInput, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class AuthScreen extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'stretch'
                }}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={text => this.setState({ username: text })}
                    value={this.state.username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.submitButton} onPress={this.onLogin.bind(this)}>
                    <Text style={styles.submitButtonText}>Login</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Text onPress={() => {this.props.navigation.navigate('CreateAccount')}} style={styles.accountManagementLink}>Create Account</Text>
                    <Text onPress={() => {this.props.navigation.navigate('ForgotPassword')}} style={styles.accountManagementLink}>Forgot Password</Text>
                </View>
            </View>
        );
    }
    async onLogin() {
        fetch(`http://localhost:55191/user/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.username,
                password: this.state.password
            })
        }).then(async res => {
            for (const [name, value] of res.headers) {
                if (name === 'set-cookie') {
                    await AsyncStorage.setItem('cookie', value);
                }
            }
            this.props.navigation.navigate('Profile');
        });
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        textAlign: 'center'
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
        width: '50%',
        alignSelf: 'center'
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center'
    },
    accountManagementLink: {
        flex: 1,
        textAlign: 'center',
        color: '#007AFF'
    }
});
