import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from './screens/Login';
import ProfileScreen from './screens/Profile';
import InitialScreen from './screens/Initial';
import AddExerciseScreen from './screens/AddExercise';
import DummyScreen from './screens/Dummy';
import { Ionicons } from '@expo/vector-icons';
import { Button, AsyncStorage } from 'react-native';
import * as React from 'react';

const tabNavigator = createBottomTabNavigator({
    Profile: {
        screen: ProfileScreen, navigationOptions: {
            tabBarLabel: "Profile", tabBarIcon: ({ tintColor }) => (
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
                context.navigation.navigate('Login');
            }
        }
    },
});

const switchNavigator = createSwitchNavigator({
    Initial: InitialScreen,
    App: tabNavigator as any,
    Login: LoginScreen
});

const App = createAppContainer(switchNavigator);

export default App;
