import React from 'react';
import { Header, Left, Button, Icon, Right } from 'native-base';
import { withNavigation } from 'react-navigation';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export const Navbar = withNavigation((props) => {
    return <Header style={{ marginBottom: 20 }}>
        <Left>
            <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                <Icon name='arrow-back' />
            </TouchableOpacity>
        </Left>
        <Right>
            <TouchableOpacity onPress={() => { props.navigation.toggleDrawer(); }}>
                <Icon name='menu' />
            </TouchableOpacity>
        </Right>
    </Header>
});