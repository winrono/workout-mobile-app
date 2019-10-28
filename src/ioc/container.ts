import { Container, interfaces } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

let container = new Container();


const decorators = getDecorators(container);

interface IBabelPropertyDescriptor extends PropertyDescriptor {
    initializer(): any;
}

let lazyInject = function (serviceIdentifier: interfaces.ServiceIdentifier<any>) {
    const original = decorators.lazyInject(serviceIdentifier);
    return function (this: any, proto: any, key: string, descriptor?: IBabelPropertyDescriptor): void {
        original.call(this, proto, key);
        descriptor.initializer = function () {
            return proto[key];
        };
    };
};

export { container, lazyInject }