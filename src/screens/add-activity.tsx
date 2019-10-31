import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { lazyInject } from '../ioc/container';
import { ExerciseService } from '../data-access/exercise-service';
import { Form, Container, Content, Item, Label, Button, Input, Picker, Icon } from 'native-base';
import { Navbar } from '../components/navbar';
import AddSuperSet from './add-superset';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { AddSet } from '../components/add-set';

const initialState = { name: '', repetitionsCount: '', weight: '', activityType: 'Set' };

const AddActivityStack = createStackNavigator(
    {
        AddSet: { screen: AddSet },
        AddSuperSet: { screen: AddSuperSet }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    }
);

export default class AddActivity extends React.Component<{ name; repetitionsCount; weight }, any> {
    @lazyInject('exerciseService') private readonly _exerciseService: ExerciseService;
    _repsInput: any;
    _weightInput: any;

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    static router = AddActivityStack.router;

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Navbar />
                    <Picker
                        mode='dropdown'
                        headerBackButtonText='Back'
                        selectedValue={this.state.activityType}
                        placeholder='Select activity type'
                        onValueChange={(val) => this.navigateToActivity(val)}
                    >
                        <Picker.Item label='Set' value='Set' />
                        <Picker.Item label='Superset' value='Superset' />
                        <Picker.Item label='Time exercise' value='Time' />
                    </Picker>
                </View>
                <View style={{ flex: 3 }}>
                    <AddActivityStack navigation={this.props.navigation} />
                </View>
            </View >
        );
    }

    navigateToActivity(type) {
        this.setState({ activityType: type });
        console.log(type);
        switch (type) {
            case 'Set':
                this.props.navigation.navigate('AddSet');
                break;
            case 'Superset':
                this.props.navigation.navigate('AddSuperSet');
                break;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcfdff',
        flex: 1
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        textAlign: 'center'
    }
});
