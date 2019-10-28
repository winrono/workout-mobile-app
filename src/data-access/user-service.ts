import { Credentials } from '../models/credentials';

export interface UserService {
    signIn(credentials: Credentials): Promise<any>;
    register(credentials: Credentials);
}