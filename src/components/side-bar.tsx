import React from 'react';
import { View, Text, Button } from 'react-native';
import { ListItem, Left, Icon, Body, Right } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

class SideBar extends React.Component<any, any> {
    render() {
        return <View style={{ backgroundColor: '#F0F0F0', flex: 1 }}>
            <View style={{ height: 40 }}></View>
            <ListItem icon onPress={() => this.props.navigation.navigate('Settings')}>
                <Left>
                    <AntDesign size={30} name='setting' />
                </Left>
                <Body>
                    <Text>Settings</Text>
                </Body>
            </ListItem>
        </View>
    }
}

export default withNavigation(SideBar);