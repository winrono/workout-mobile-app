import React from 'react';
import { ListItem, Body, Right, View, CardItem } from 'native-base';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Set } from '../models/set';

export function SetView(props: SetViewProps) {
    return (
        <CardItem cardBody={true} style={{ flexBasis: '20%' }}>
            <Body style={{ padding: 5 }}>
                <TouchableOpacity onPress={() => props.onEdit()}>
                    <Text>
                        {props.set.weight} kg
            </Text>
                    <Text>
                        {props.set.repsCount} reps
            </Text>
                </TouchableOpacity>
            </Body>
        </CardItem>
    );
}

interface SetViewProps {
    set: Set,
    onDelete: () => void;
    onEdit: () => void;
}