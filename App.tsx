import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AuthScreen from './screens/Auth';
import ProfileScreen from './screens/Profile';
import InitialScreen from './screens/Initial';
import AddExercise from './screens/AddExercise';

const MainNavigator = createDrawerNavigator({
    Initial: { screen: InitialScreen },
    Auth: { screen: AuthScreen },
    Profile: { screen: ProfileScreen },
    AddExercise: { screen: AddExercise }
});

const App = createAppContainer(MainNavigator);

export default App;
