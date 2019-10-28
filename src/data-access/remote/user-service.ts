import { Credentials } from '../../models/credentials';
import { UserService } from '../user-service';
import { injectable } from 'inversify';

@injectable()
export class RemoteUserService implements UserService {
    signIn(credentials: Credentials): Promise<Response> {
        return fetch(`http://localhost:55191/user/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
    }
    register(credentials: Credentials) {

    }
}