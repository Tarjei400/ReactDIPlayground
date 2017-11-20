import { interfaces, inject, injectable } from "inversify"
import { IKernelProvider } from "./interfaces/IKernelProvider";
import { IDecoratorFactory, IParametrizedDecoratorFactory } from "./interfaces/IDecoratorFactory";
import { IDecorator, IParametrizedDecorator } from "./interfaces/IDecorator";
import { IDIConfig } from "./interfaces/IDIConfig";

const TYPE_TAG = "design:type";

@injectable()
export class ProviderDecoratorFactory implements IParametrizedDecoratorFactory {

    static TAG = "Provider";

    @inject(IKernelProvider)
    private kernelProvider: IKernelProvider;

    /***
     * Creates provider decorator, if mocked flag is true, dependencies will be binded to kernel with mocks
     *
     * @param mocked
     * @returns {(type:interfaces.ServiceIdentifier<any>)=>IParametrizedDecorator}
     */
    public make<T>(mocked : boolean = false): IParametrizedDecorator {
        let kernel = this.kernelProvider.get(mocked);
        return function(type: interfaces.ServiceIdentifier<any>) : IParametrizedDecorator {
            return <T>(target: any, name: string, descriptor?: any) : void => {
                injectable()(target, name,descriptor);
                kernel.bind<T>(type).to(target);
            }
        }
    }
}

@injectable()
export class InjectorDecoratorFactory implements IParametrizedDecoratorFactory {

    static TAG = "Injector";

    @inject(IKernelProvider)
    private kernelProvider: IKernelProvider;

    public make(mocked : boolean = false) : IParametrizedDecorator {
        let kernel = this.kernelProvider.get(mocked);

        return function(): IDecorator {
            return (target: any, name: string, descriptor?: any) : void => {
                let type: interfaces.ServiceIdentifier<any> = Reflect.getMetadata(TYPE_TAG, target, name);
                target[name] = kernel.get(type);
            }
        }
    }
}



