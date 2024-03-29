import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Credentials } from '../models/credentials';
import { lazyInject } from '../ioc/container';
import { CredentialsManager } from '../data-access/credentials-manager';

export default class CreateAccount extends React.Component<{ navigation }, { username, password }> {

    @lazyInject('credentialsManager') private readonly _credentialsManager: CredentialsManager;

    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
    }
    render() {
        return (<View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch'
            }}
        >
            <TextInput
                style={styles.input}
                placeholder='Username'
                onChangeText={text => this.setState({ username: text })}
                value={this.state.username}
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
            />
            <TouchableOpacity style={styles.submitButton} onPress={this.onRegister.bind(this)}>
                <Text style={styles.submitButtonText}>Register</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Text onPress={() => { this.props.navigation.navigate('CreateAccount') }} style={styles.accountManagementLink}>Create Account</Text>
                <Text onPress={() => { this.props.navigation.navigate('ForgotPassword') }} style={styles.accountManagementLink}>Forgot Password</Text>
            </View>
        </View>);
    }
    onRegister() {
        let credentials: Credentials = {
            name: this.state.username,
            password: this.state.password
        }
        fetch(`http://localhost:55191/user/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                name: this.state.username,
                password: this.state.password
            })
        }).then(async () => {
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
