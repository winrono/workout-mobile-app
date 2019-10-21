import React from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
function App(props) {
    navigate(props);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    );
}
async function navigate(props) {
    const cookie = await AsyncStorage.getItem('cookie');
    if (cookie) {
        props.navigation.navigate('Profile');
    } else {
        props.navigation.navigate('Auth');
    }
}
export default App;
