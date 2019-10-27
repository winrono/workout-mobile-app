import React from 'react';
import { lazyInject } from '../ioc/container';
import { CredentialsManager } from '../data-access/credentials-manager';

// Empty component created on purpose. Used in tricky cases when full-fledged React Component isn't required
export default class Dummy extends React.Component {
    @lazyInject('credentialsManager') private readonly _credentialsManager: CredentialsManager;

    render() {
        this._credentialsManager.clearCredentials();
        this.props.navigation.navigate('Auth');
        return null;
    }
}