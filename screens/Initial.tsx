import React from 'react';
import { Text, AsyncStorage } from 'react-native';
function App(props) {
    navigate(props);
    return (<Text>Загужаюсь :)</Text>);
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