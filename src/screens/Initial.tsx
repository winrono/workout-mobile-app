import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { CredentialsManager } from '../data-access/credentials-manager';
import { lazyInject } from '../ioc/container';
import { Types } from '../ioc/types';
import { injectable } from 'inversify';

@injectable()
export class App extends React.Component {

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
        if (credentials) {
            this.props.navigation.navigate('AuthorizedApp');
        } else {
            this.props.navigation.navigate('Auth');
        }
    }
}
export default App;
