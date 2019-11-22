import React from 'react';
import { View, Text, Button } from 'react-native';
import { ListItem, Left, Icon, Body, Right } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import localizationProvider from '../localization/localization-provider';
import { Settings } from '../localization/constants';

class SideBar extends React.Component<{ drawer: any }, any> {
    render() {
        return (
            <View style={{ backgroundColor: '#F0F0F0', flex: 1 }}>
                <View style={{ height: 40 }}></View>
                <ListItem
                    icon
                    onPress={() => {
                        this.props.drawer._root.close();
                        this.props.navigation.navigate('Settings');
                    }}
                >
                    <Left>
                        <AntDesign size={30} name="setting" />
                    </Left>
                    <Body>
                        <Text>{localizationProvider.getLocalizedString(Settings)}</Text>
                    </Body>
                </ListItem>
            </View>
        );
    }
}

export default withNavigation(SideBar);
