import configurationProvider from './src/data-access/configuration-provider';
import { ContainerConfigurator } from './src/ioc/container-configurator';
import { container } from './src/ioc/container';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthScreen from './src/screens/auth';
import DashboardScreen from './src/screens/dashboard';
import InitialScreen from './src/screens/initial';
import CreateAccountScreen from './src/screens/create-account';
import ForgotPasswordScreen from './src/screens/forgot-password';
import SettingsScreen from './src/screens/settings';
import ExportDataScreen from './src/screens/export-data';

new ContainerConfigurator(configurationProvider).configure(container);

const dashboardStack = createStackNavigator(
    {
        Dashboard: { screen: DashboardScreen },
        Settings: { screen: SettingsScreen },
        ExportData: { screen: ExportDataScreen }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    }
);

const switchNavigator = createSwitchNavigator({
    Initial: InitialScreen,
    AuthorizedApp: dashboardStack,
    Auth: AuthScreen,
    CreateAccount: CreateAccountScreen,
    ForgotPassword: ForgotPasswordScreen
});

const AppContainer = createAppContainer(switchNavigator);

export { AppContainer };
