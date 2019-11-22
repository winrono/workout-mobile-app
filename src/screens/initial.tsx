import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { CredentialsManager } from '../data-access/credentials-manager';
import { lazyInject } from '../ioc/container';
import { injectable } from 'inversify';
import { initialize } from '../actions/initialize';
import { connect } from 'react-redux';

@injectable()
export class Initial extends React.Component<{ initialize: () => void }> {
    @lazyInject('credentialsManager') private readonly _credentialsManager: CredentialsManager;

    render() {
        this.navigate();
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    async navigate() {
        const credentials = await this._credentialsManager.getCredentials();
        this.props.initialize();
        if (credentials) {
            this.props.navigation.navigate('AuthorizedApp');
        } else {
            this.props.navigation.navigate('Auth');
        }
    }
}

function mapStateToProps(state) {
    return {
        activeWorkouts: [state.previousWorkout, state.activeWorkout, state.nextWorkout],
        ready: state.ready
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initialize: () => {
            dispatch(initialize());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Initial);
