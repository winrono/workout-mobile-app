import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import UserManagementScreen from './src/screens/UserManagement';
import DashboardScreen from './src/screens/Dashboard';
import InitialScreen from './src/screens/Initial';
import CreateAccountScreen from './src/screens/CreateAccount';
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import AddExerciseScreen from './src/screens/AddExercise';
import DummyScreen from './src/screens/Dummy';
import { Ionicons } from '@expo/vector-icons';
import { Button, AsyncStorage } from 'react-native';
import * as React from 'react';

const mainAppNavigator = createBottomTabNavigator({
    Profile: {
        screen: DashboardScreen, navigationOptions: {
            tabBarLabel: "Dashboard", tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-home" size={30} />
            )
        }
    },
    AddExercise: {
        screen: AddExerciseScreen, navigationOptions: {
            tabBarLabel: "Add exercise", tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-add" size={30} />
            )
        }
    },
    SignOut: {
        // dirty hack to navigate to parent navigator's route: simply navigating to 'Login' route instead of redirecting to relevant component
        screen: DummyScreen, navigationOptions: {
            tabBarLabel: "Log out", tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-log-out" size={30} />
            ),
            tabBarOnPress: (context) => {
                AsyncStorage.removeItem('cookie');
                context.navigation.navigate('UserManagement');
            }
        }
    },
});

const switchNavigator = createSwitchNavigator({
    Initial: InitialScreen,
    AuthorizedApp: mainAppNavigator as any,
    UserManagement: UserManagementScreen,
    CreateAccount: CreateAccountScreen,
    ForgotPassword: ForgotPasswordScreen
});

const App = createAppContainer(switchNavigator);

export default App;
