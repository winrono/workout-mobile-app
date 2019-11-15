import React from 'react';
import configurationProvider from './src/data-access/configuration-provider';
import { ContainerConfigurator } from './src/ioc/container-configurator';
import { container } from './src/ioc/container';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthScreen from './src/screens/auth';
import DashboardScreen from './src/screens/dashboard';
import InitialScreen from './src/screens/initial';
import CreateAccountScreen from './src/screens/create-account';
import ForgotPasswordScreen from './src/screens/forgot-password';
import DummyScreen from './src/screens/dummy';
import { Text } from 'react-native';
import AddTimesetScreen from './src/screens/add-timeset';
import AddExerciseScreen from './src/screens/add-exercise';
import AddCompoundExerciseScreen from './src/screens/add-compound-exercise';

new ContainerConfigurator(configurationProvider).configure(container);

const dashboardStack = createStackNavigator(
    {
        Dashboard: { screen: DashboardScreen },
        AddExercise: { screen: AddExerciseScreen },
        AddCompoundExercise: { screen: AddCompoundExerciseScreen },
        AddTimeset: { screen: AddTimesetScreen }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    }
);

let drawerNavigatorRouteConfig = {
    Dashboard: {
        screen: dashboardStack,
        navigationOptions: {
            drawerLabel: 'Dashboard',
            drawerIcon: () => <Ionicons name="md-home" size={30} />,
            headerRight: <Text>Boom</Text>
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
            tabBarIcon: () => <Ionicons name="md-log-out" size={30} />
        }
    };
}

const mainAppNavigator = createDrawerNavigator(drawerNavigatorRouteConfig, { edgeWidth: 100 });

const switchNavigator = createSwitchNavigator({
    Initial: InitialScreen,
    AuthorizedApp: dashboardStack,
    Auth: AuthScreen,
    CreateAccount: CreateAccountScreen,
    ForgotPassword: ForgotPasswordScreen
});

const AppContainer = createAppContainer(switchNavigator);

export { AppContainer };
