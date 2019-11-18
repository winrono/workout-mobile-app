import React from 'react';
import { Body, CardItem } from 'native-base';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Set } from '../models/set';
import localizationProvider from '../localization/localization-provider';
import { KgLowercase, RepsLowercase } from '../localization/constants';

export function SetView(props: SetViewProps) {
    let marker = props.set.comment != null && props.set.comment !== '' ? '*' : '';
    return (
        <CardItem cardBody={true} style={{ flexBasis: '20%' }}>
            <Body style={{ padding: 5 }}>
                <TouchableOpacity onPress={() => props.onEdit()}>
                    <Text>
                        {props.set.weight} {localizationProvider.getLocalizedString(KgLowercase)}{' '}
                        <Text style={{ fontWeight: 'bold' }}>{marker}</Text>
                    </Text>
                    <Text>
                        {props.set.repsCount} {localizationProvider.getLocalizedString(RepsLowercase)}
                    </Text>
                </TouchableOpacity>
            </Body>
        </CardItem>
    );
}

interface SetViewProps {
    set: Set;
    onDelete: () => void;
    onEdit: () => void;
}
