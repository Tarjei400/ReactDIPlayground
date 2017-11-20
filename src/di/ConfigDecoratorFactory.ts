import { interfaces, inject, injectable, tagged } from "inversify"
import { IKernelProvider } from "./interfaces/IKernelProvider";
import { IParametrizedDecoratorFactory } from "./interfaces/IDecoratorFactory";
import { IDecorator, IParametrizedDecorator } from "./interfaces/IDecorator";

const ENV_TAG = "ENVIRONMENT";

@injectable()
export class ConfigInjectorDecoratorFactory implements IParametrizedDecoratorFactory {

    static TAG = "ConfigProvider";

    @inject(IKernelProvider)
    private kernelProvider: IKernelProvider;

    public make<T>(type: interfaces.ServiceIdentifier<any> ) : IParametrizedDecorator {
        let kernel = this.kernelProvider.get();
        return function() : IDecorator {
            return <T>(target: Object, name: string, descriptor?: any) : void => {
                tagged(ENV_TAG, envName)(target,name, descriptor);
                inject()(target,name, descriptor);
            }
        }
    }
}

@injectable()
export class ConfigProviderDecoratorFactory implements IParametrizedDecoratorFactory {

    static TAG = "Provider";

    @inject(IKernelProvider)
    private kernelProvider: IKernelProvider;

    public make<T>(type: interfaces.ServiceIdentifier<any> ) : IParametrizedDecorator {
        let kernel = this.kernelProvider.get();
        return function() : IDecorator {
            return <T>(target: Object, name: string, descriptor?: any) : void => {
                kernel.bind<T>(type).to(target).whenTagged(ENV_TAG, NODE_ENV)
            }
        }
    }
}