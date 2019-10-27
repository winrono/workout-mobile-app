import 'reflect-metadata';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AuthScreen from './src/screens/Auth';
import DashboardScreen from './src/screens/Dashboard';
import InitialScreen from './src/screens/Initial';
import CreateAccountScreen from './src/screens/CreateAccount';
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import AddExerciseScreen from './src/screens/AddExercise';
import DummyScreen from './src/screens/Dummy';
import { Ionicons } from '@expo/vector-icons';
import { Button, AsyncStorage } from 'react-native';
import * as React from 'react';
import * as Font from 'expo-font';
import { lastUsedCredentials } from './src/constants';
import { CredentialsManager } from './src/data-access/credentials-manager';
import { ContainerConfigurator } from './src/ioc/container-configurator';
import { ConfigurationProvider } from './src/data-access/configuration-provider';
import { container, lazyInject } from './src/ioc/container';
import { UserService } from './src/data-access/user-service';

new ContainerConfigurator(new ConfigurationProvider()).configure(container);

const mainAppNavigator = createBottomTabNavigator({
    Profile: {
        screen: DashboardScreen,
        navigationOptions: {
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ tintColor }) => <Ionicons name="md-home" size={30} />
        }
    },
    AddExercise: {
        screen: AddExerciseScreen,
        navigationOptions: {
            tabBarLabel: 'Add exercise',
            tabBarIcon: ({ tintColor }) => <Ionicons name="md-add" size={30} />
        }
    },
    SignOut: {
        // dirty hack to navigate to parent navigator's route: simply navigating to 'Login' route instead of redirecting to relevant component
        screen: DummyScreen,
        navigationOptions: {
            tabBarLabel: 'Log out',
            tabBarIcon: ({ tintColor }) => <Ionicons name="md-log-out" size={30} />
        }
    }
});

const switchNavigator = createSwitchNavigator({
    Initial: InitialScreen,
    AuthorizedApp: mainAppNavigator as any,
    Auth: AuthScreen,
    CreateAccount: CreateAccountScreen,
    ForgotPassword: ForgotPasswordScreen
});

const AppContainer = createAppContainer(switchNavigator);

class App extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        };
    }
    render() {
        return <AppContainer></AppContainer>;
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
