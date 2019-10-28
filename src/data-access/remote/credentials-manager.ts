import { Credentials } from '../../models/credentials';
import { AsyncStorage } from 'react-native';
import { lastUsedCredentials } from '../../constants';
import { injectable } from 'inversify';

@injectable()
export class RemoteCredentialsManager {
    getCredentials(): Promise<Credentials> {
        return AsyncStorage.getItem(lastUsedCredentials).then((credentials) => {
            return JSON.parse(credentials);
        })
    }
    setCredentials(credentials: Credentials): Promise<void> {
        return AsyncStorage.setItem(lastUsedCredentials, JSON.stringify(credentials));
    }
    clearCredentials(): Promise<void> {
        return AsyncStorage.removeItem(lastUsedCredentials);
    }
}