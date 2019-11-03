import React from 'react';
import { View, Text } from 'react-native';

export function NoStatistics(props) {
    return (<View
        style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch'
        }}
    >
        <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>No workout statistics</Text>
    </View>);
}