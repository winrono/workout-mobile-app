import { Credentials } from '../models/credentials';

export interface CredentialsManager {
    getCredentials(): Promise<Credentials>;
    setCredentials(credentials: Credentials): Promise<void>;
    clearCredentials(): Promise<void>;
}