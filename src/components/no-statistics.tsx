import React from 'react';
import { View, Text } from 'react-native';
import localizationProvider from '../localization/localization-provider';
import { NoWorkoutStatistics } from '../localization/constants';

export function NoStatistics(props) {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch'
            }}
        >
            <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>
                {localizationProvider.getLocalizedString(NoWorkoutStatistics)}
            </Text>
        </View>
    );
}
