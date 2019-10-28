import { Credentials } from '../../models/credentials';
import { injectable } from 'inversify';

@injectable()
export class LocalCredentialsManager {
    getCredentials(): Promise<Credentials> {
        return Promise.resolve({
            name: 'test',
            password: 'test'
        });
    }
    setCredentials(credentials: Credentials): Promise<void> {
        return Promise.resolve();
    }
    clearCredentials(): Promise<void> {
        return;
    }
}