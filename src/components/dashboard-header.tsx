import React from 'react';
import { Header, Left, Icon, Right } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Text } from 'react-native';

export class DashboardHeader extends React.Component<{ date: string, navigation?: any, onOpenCalendar: () => void, onOpenSideBar: () => void }> {
    render() {
        return <Header style={{ height: 40 }} transparent={true}>
            <Left>
                <TouchableOpacity onPress={() => { this.props.onOpenSideBar() }}>
                    <Icon name='menu' />
                </TouchableOpacity>
            </Left>
            <Right style={{ alignItems: 'center' }}>
                <Text>{new Date(this.props.date).toDateString()}</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.props.onOpenCalendar();
                    }}
                >
                    <AntDesign size={30} name='calendar' />
                </TouchableOpacity>
            </Right>
        </Header>
    }
}