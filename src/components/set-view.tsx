import React from 'react';
import { Body, CardItem } from 'native-base';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Set } from '../models/set';
import localizationProvider from '../localization/localization-provider';
import { KgLowercase, RepsLowercase, KgAbbr, RepsAbbr, KmAbbr, MinAbbr, SecAbbr } from '../localization/constants';

export function SetView(props: SetViewProps) {
    let marker = props.set.comment != null && props.set.comment !== '' ? '*' : '';
    return (
        <CardItem cardBody={true} style={{ flexBasis: '20%' }}>
            <Body style={{ padding: 5 }}>
                <TouchableOpacity onPress={() => props.onEdit()}>
                    {props.set.weight != null ? renderWeightRepsView() : renderTimeDistanceView()}
                </TouchableOpacity>
            </Body>
        </CardItem>
    );

    function renderWeightRepsView() {
        return ([
            <Text>
                {props.set.weight} {localizationProvider.getLocalizedString(KgAbbr)}
                <Text style={{ fontWeight: 'bold' }}>{marker}</Text>
            </Text>,
            <Text>
                {props.set.repsCount} {localizationProvider.getLocalizedString(RepsAbbr)}
            </Text>
        ]);
    }

    function renderTimeDistanceView() {
        return ([
            <Text>
                {getTimeDisplay()}
                <Text style={{ fontWeight: 'bold' }}>{marker}</Text>
            </Text>,
            <Text>
                {props.set.distance} {localizationProvider.getLocalizedString(KmAbbr)}
            </Text>
        ]);
    }

    function getTimeDisplay() {
        let minutes = Math.floor(props.set.time / 60);
        let seconds = props.set.time % 60;
        let result = `${minutes}${localizationProvider.getLocalizedString(MinAbbr)}`;
        if (seconds) {
            if (!minutes) {
                result = `${seconds}${localizationProvider.getLocalizedString(SecAbbr)}`;
            } else {
                result += ` ${seconds}${localizationProvider.getLocalizedString(SecAbbr)}`;
            }
        }
        return result;
    }
}

interface SetViewProps {
    set: Set;
    onDelete: () => void;
    onEdit: () => void;
}
