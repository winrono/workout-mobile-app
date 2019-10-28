import { Credentials } from '../../models/credentials';
import { UserService } from '../user-service';
import { injectable } from 'inversify';

@injectable()
export class LocalUserService implements UserService {
    signIn(credentials: Credentials): Promise<void> {
        throw new Error('Method not implemented.');
    }
    register(credentials: Credentials) {
        throw new Error('Method not implemented.');
    }
}