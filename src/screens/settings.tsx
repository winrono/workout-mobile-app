import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

class Settings extends React.Component {
    render() {
        return <View>
            <Text>Not yet implemented, please be patient :)</Text>
            <Button onPress={() => this.props.navigation.navigate('Dashboard')}><Text>Get back</Text></Button>
        </View>
    }
}

export default Settings;