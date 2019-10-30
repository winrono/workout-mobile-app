import React from 'react';
import { ListItem, Body, Right } from 'native-base';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Set } from '../models/set';

export function SetView(props: SetViewProps) {
    return (<ListItem icon>
        <Body>
            <Text>
                {props.set.repetitionsCount} reps with {props.set.weight} kg
            </Text>
        </Body>
        <Right>
            <TouchableOpacity>
                <AntDesign onPress={() => {
                    props.onEdit();
                }} style={{ marginRight: 10 }} size={30} active name='edit' />
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign
                    onPress={() => {
                        props.onDelete();
                    }}
                    size={30}
                    active
                    name='delete'
                />
            </TouchableOpacity>
        </Right>
    </ListItem>);
}

interface SetViewProps {
    set: Set,
    onDelete: () => void;
    onEdit: () => void;
}