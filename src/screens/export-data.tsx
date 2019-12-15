import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import localizationProvider from '../localization/localization-provider';
import { Back } from '../localization/constants';
import * as FileSystem from 'expo-file-system';
import rnfs from 'react-native-fs';

export default class ExportData extends React.Component {
    render() {
        return (<View>
            <Button
                bordered
                success
                key={0}
                onPress={() => this.props.navigation.navigate('Dashboard')}
            >
                <Text>{localizationProvider.getLocalizedString(Back)}</Text>
            </Button>
            <Button
                bordered
                success
                key={0}
                onPress={() => this.test()}
            >
                <Text>Save data</Text>
            </Button>
        </View>);
    }
    test() {
        alert(rnfs.DocumentDirectoryPath)
        rnfs.writeFile(rnfs.DocumentDirectoryPath + 'test.txt', 'teeeeeeeeest', 'utf8');
    }
}