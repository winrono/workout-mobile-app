import { Container } from 'inversify';
import { ConfigurationProvider } from '../data-access/configuration-provider';
import { RemoteCredentialsManager } from '../data-access/remote/credentials-manager';
import { RemoteExerciseService } from '../data-access/remote/exercise-service';
import { RemoteUserService } from '../data-access/remote/user-service';
import { LocalCredentialsManager } from '../data-access/local/credentials-manager';
import { LocalExerciseService } from '../data-access/local/exercise-service';
import { LocalUserService } from '../data-access/local/user-service';

export class ContainerConfigurator {
    constructor(private _configurationProvider: ConfigurationProvider) {

    }
    configure(container: Container) {
        if (this._configurationProvider.isInLocalMode()) {
            container.bind('credentialsManager').to(LocalCredentialsManager).inSingletonScope();
            container.bind('exerciseService').to(LocalExerciseService).inSingletonScope();
            container.bind('userService').to(LocalUserService).inSingletonScope();
        } else {
            container.bind('credentialsManager').to(RemoteCredentialsManager).inSingletonScope();
            container.bind('exerciseService').to(RemoteExerciseService).inSingletonScope();
            container.bind('userService').to(RemoteUserService).inSingletonScope();
        }
    }
}