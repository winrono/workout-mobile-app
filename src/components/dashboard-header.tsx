import React from 'react';
import { Header, Left, Icon, Right } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Text } from 'react-native';

export class DashboardHeader extends React.Component<{ date: string, navigation?: any, onOpenCalendar: () => void, onOpenSideBar: () => void }> {
    render() {
        return <Header style={{ backgroundColor: '#f0f5f7' }}>
            <Left>
                <TouchableOpacity onPress={() => { this.props.onOpenSideBar() }}>
                    <Icon name='menu' />
                </TouchableOpacity>
            </Left>
            <Right>
                <TouchableOpacity
                    onPress={() => {
                        this.props.onOpenCalendar();
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Text>{new Date(this.props.date).toDateString()}</Text>
                    <AntDesign size={30} name='calendar' />
                </TouchableOpacity>
            </Right>
        </Header>
    }
}