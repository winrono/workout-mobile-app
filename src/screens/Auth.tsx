import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Credentials } from '../models/credentials';
import { lazyInject } from '../ioc/container';
import { CredentialsManager } from '../data-access/credentials-manager';
import { UserService } from '../data-access/user-service';

export default class AuthScreen extends Component<any, { username, password }> {

    @lazyInject('credentialsManager') private readonly _credentialsManager: CredentialsManager;
    @lazyInject('userService') private readonly _userService: UserService;

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
                }}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    onChangeText={text => this.setState({ username: text })}
                    value={this.state.username}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    textContentType={'password'}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.submitButton} onPress={this.onLogin.bind(this)}>
                    <Text style={styles.submitButtonText}>Login</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Text onPress={() => { this.props.navigation.navigate('CreateAccount') }} style={styles.accountManagementLink}>Create Account</Text>
                    <Text onPress={() => { this.props.navigation.navigate('ForgotPassword') }} style={styles.accountManagementLink}>Forgot Password</Text>
                </View>
            </View>
        );
    }
    async onLogin() {
        const credentials: Credentials = {
            name: this.state.username,
            password: this.state.password
        };
        this._userService.signIn(credentials).then(async () => {
            await this._credentialsManager.setCredentials(credentials);
            this.props.navigation.navigate('Dashboard');
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
