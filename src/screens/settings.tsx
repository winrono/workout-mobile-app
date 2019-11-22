import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Label, Picker } from 'native-base';
import localizationProvider from '../localization/localization-provider';
import { Language, WeightReps, TimeDistance, English, Russian, Cancel, Save } from '../localization/constants';
import { ExerciseType } from '../models/exercise-type';
import { connect } from 'react-redux';
import { saveSettings } from '../actions/save-settings';

class Settings extends React.Component<any, { settings: any }> {
    constructor(props) {
        super(props);
        this.state = { settings: { ...this.props.settings } };
    }
    render() {
        return (
            <View>
                <Label>{localizationProvider.getLocalizedString(Language)}</Label>
                <Picker
                    style={{ marginLeft: 10 }}
                    selectedValue={this.state.settings.language}
                    onValueChange={value => {
                        this.setState({ settings: { ...this.state.settings, language: value } });
                    }}
                >
                    <Picker.Item label="English" value="en" />
                    <Picker.Item label="Русский" value="ru" />
                </Picker>
                <View style={styles.footer}>
                    <Button
                        bordered
                        success
                        key={0}
                        style={styles.footerButton}
                        onPress={() => this.props.navigation.navigate('Dashboard')}
                    >
                        <Text>{localizationProvider.getLocalizedString(Cancel)}</Text>
                    </Button>
                    <Button
                        bordered
                        success
                        key={1}
                        style={styles.footerButton}
                        onPress={() => {
                            this.props.saveSettings(this.state.settings);
                            this.props.navigation.navigate('Dashboard');
                        }}
                    >
                        <Text>{localizationProvider.getLocalizedString(Save)}</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        settings: state.settings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveSettings: settings => {
            dispatch(saveSettings(settings));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    footer: {
        alignContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerButton: {
        margin: 10,
        flex: 1,
        justifyContent: 'center'
    }
});
