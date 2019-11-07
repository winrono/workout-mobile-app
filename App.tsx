import 'reflect-metadata';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import * as Font from 'expo-font';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { AppContainer } from './app-container';
import { Provider } from 'react-redux';
import store from './store';
import navigationService from './navigation-service';


class App extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        };
    }
    render() {
        if (this.state.isReady) {
            return (
                <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
                    <Provider store={store}>
                        <AppContainer ref={nav => {
                            navigationService.setTopLevelNavigator(nav);
                        }}></AppContainer>
                    </Provider>
                </View>
            );
        } else {
            return this.renderLoadingIndicator()
        }
    }

    renderLoadingIndicator() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font
        });
        this.setState({ isReady: true });
    }
}

export default App;
