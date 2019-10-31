import React from 'react';
import { ConfigurationProvider } from './src/data-access/configuration-provider';
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
import AddActivityScreen from './src/screens/add-activity';
import AddSuperSetScreen from './src/screens/add-superset';
import EditSetScreen from './src/screens/edit-set';
import DummyScreen from './src/screens/dummy';
import { Text } from 'react-native';

let configurationProvider = new ConfigurationProvider();
new ContainerConfigurator(configurationProvider).configure(container);

const dashboardStack = createStackNavigator(
    {
        Dashboard: { screen: DashboardScreen },
        // EditSet: { screen: EditSetScreen }
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
            drawerIcon: () => <Ionicons name='md-home' size={30} />,
            headerRight: <Text>Boom</Text>
        }
    },
    AddActivity: {
        screen: AddActivityScreen,
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
    };
}

const mainAppNavigator = createDrawerNavigator(drawerNavigatorRouteConfig, { edgeWidth: 100 });

const switchNavigator = createSwitchNavigator({
    Initial: InitialScreen,
    AuthorizedApp: mainAppNavigator as any,
    Auth: AuthScreen,
    CreateAccount: CreateAccountScreen,
    ForgotPassword: ForgotPasswordScreen
});

const AppContainer = createAppContainer(switchNavigator);

export { AppContainer };
