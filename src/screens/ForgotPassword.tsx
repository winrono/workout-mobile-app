import React from 'react';
import { View, Text, Button } from 'react-native';

export default class ForgotPassword extends React.Component {
    render() {
        return (<View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch'
        }}><Text style={{ textAlign: 'center' }}>This page isn't yet implemented, be patient :)</Text>
            <Button title="Return" onPress={() => { this.props.navigation.navigate('Profile') }}></Button>
        </View>)
    }
}