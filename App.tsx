import 'reflect-metadata';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import AuthScreen from './src/screens/auth';
import DashboardScreen from './src/screens/dashboard';
import InitialScreen from './src/screens/initial';
import CreateAccountScreen from './src/screens/create-account';
import ForgotPasswordScreen from './src/screens/forgot-password';
import AddSetScreen from './src/screens/add-set';
import AddSuperSetScreen from './src/screens/add-superset';
import DummyScreen from './src/screens/dummy';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import * as Font from 'expo-font';
import { ContainerConfigurator } from './src/ioc/container-configurator';
import { ConfigurationProvider } from './src/data-access/configuration-provider';
import { container } from './src/ioc/container';
import EditSetScreen from './src/screens/edit-set';
import { Text, View, ActivityIndicator, StatusBar } from 'react-native';

let configurationProvider = new ConfigurationProvider();
new ContainerConfigurator(configurationProvider).configure(container);

const dashboardStack = createStackNavigator({
    Dashboard: { screen: DashboardScreen },
    EditSet: { screen: EditSetScreen }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false
    }
});

let drawerNavigatorRouteConfig = {
    Dashboard: {
        screen: dashboardStack,
        navigationOptions: {
            drawerLabel: 'Dashboard',
            drawerIcon: () => <Ionicons name='md-home' size={30} />,
            headerRight: <Text>Boom</Text>
        }
    },
    AddSet: {
        screen: AddSetScreen,
        navigationOptions: {
            drawerLabel: 'Add set',
            drawerIcon: () => <Ionicons name='md-add' size={30} />
        }
    },
    AddSuperSet: {
        screen: AddSuperSetScreen,
        navigationOptions: {
            drawerLabel: 'Add superset',
            drawerIcon: () => <Ionicons name='md-add' size={30} />
        }
    }
};

if (!configurationProvider.isInLocalMode()) {
    drawerNavigatorRouteConfig['SignOut'] = {
        // dirty hack to navigate to parent navigator's route: simply navigating 
        // to 'Login' route instead of redirecting to relevant component
        screen: DummyScreen,
        navigationOptions: {
            drawerLabel: 'Log out',
            tabBarIcon: () => <Ionicons name='md-log-out' size={30} />
        }
    }
}

const mainAppNavigator = createDrawerNavigator(drawerNavigatorRouteConfig);

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
        if (this.state.isReady) {
            return <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}><AppContainer></AppContainer></View>;
        } else {
            return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        }
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
