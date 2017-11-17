import { interfaces, inject, injectable } from "inversify"
import { IKernelProvider } from "./interfaces/IKernelProvider";
import { IDecoratorFactory, IParametrizedDecoratorFactory } from "./interfaces/IDecoratorFactory";
import { IDecorator, IParametrizedDecorator } from "./interfaces/IDecorator";

const TYPE_TAG = "design:type";

@injectable()
export class ProviderDecoratorFactory implements IParametrizedDecoratorFactory {

    static TAG = "Provider";

    @inject(IKernelProvider)
    private kernelProvider: IKernelProvider;

    public make<T>(type: interfaces.ServiceIdentifier<any> ) : IParametrizedDecorator {
        let kernel = this.kernelProvider.get();
        return function() : IDecorator {
            return <T>(target: Object, name: string, descriptor?: any) : void => {
                target[name] = kernel.get<T>(type);
                kernel.bind<T>()
            }
        }
    }
}

@injectable()
export class InjectorDecoratorFactory implements IDecoratorFactory {

    static TAG = "Injector";

    @inject(IKernelProvider)
    private kernelProvider: IKernelProvider;

    public make() : IDecorator {
        return (target: Object, name: string, descriptor?: any) : void => {
            let type: interfaces.ServiceIdentifier<any> = Reflect.getMetadata(TYPE_TAG, target, name);
            target[name] = kernel.get<T>(type);
        }
    }
}



