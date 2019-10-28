import 'reflect-metadata';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AuthScreen from './src/screens/Auth';
import DashboardScreen from './src/screens/Dashboard';
import InitialScreen from './src/screens/Initial';
import CreateAccountScreen from './src/screens/CreateAccount';
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import AddSetScreen from './src/screens/AddSet';
import AddSuperSetScreen from './src/screens/AddSuperSet';
import DummyScreen from './src/screens/Dummy';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import * as Font from 'expo-font';
import { ContainerConfigurator } from './src/ioc/container-configurator';
import { ConfigurationProvider } from './src/data-access/configuration-provider';
import { container } from './src/ioc/container';

let configurationProvider = new ConfigurationProvider();
new ContainerConfigurator(configurationProvider).configure(container);

let bottomTabNavigatorRoutes = {
    Profile: {
        screen: DashboardScreen,
        navigationOptions: {
            tabBarLabel: 'Dashboard',
            tabBarIcon: () => <Ionicons name='md-home' size={30} />
        }
    },
    AddSet: {
        screen: AddSetScreen,
        navigationOptions: {
            tabBarLabel: 'Add set',
            tabBarIcon: () => <Ionicons name='md-add' size={30} />
        }
    },
    AddSuperSet: {
        screen: AddSuperSetScreen,
        navigationOptions: {
            tabBarLabel: 'Add superset',
            tabBarIcon: () => <Ionicons name='md-add' size={30} />
        }
    }
};

if (!configurationProvider.isInLocalMode()) {
    bottomTabNavigatorRoutes['SignOut'] = {
        // dirty hack to navigate to parent navigator's route: simply navigating 
        // to 'Login' route instead of redirecting to relevant component
        screen: DummyScreen,
        navigationOptions: {
            tabBarLabel: 'Log out',
            tabBarIcon: () => <Ionicons name='md-log-out' size={30} />
        }
    }
}

const mainAppNavigator = createBottomTabNavigator(bottomTabNavigatorRoutes);

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
