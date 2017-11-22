import {interfaces, inject, injectable, tagged} from "inversify"
import {IKernelProvider} from "./interfaces/IKernelProvider";
import {IDecorator, IParametrizedDecorator} from "./interfaces/IDecorator";
import {IDIDecoratorFactory} from "./interfaces/IDIDecoratorFactory";

const TYPE_TAG = "design:type";

interface DecoratoråConfig {
    mocked: boolean,
    reflectType: boolean
}

@injectable()
export class DIDecoratorFactory implements IDIDecoratorFactory{

    /**
     * @property kernelProvioder
     */
    @inject(IKernelProvider)
    private kernelProvider: IKernelProvider;

    public make<T>(config: DecoratorConfig, cb: (args: Object) => void) : IParametrizedDecorator {
        let kernel = this.kernelProvider.get(config.mocked);

        return function (...args: any[]) {
            return <IDecorator>(target: any, name: string, descriptor?: any): void => {
                let type: interfaces.ServiceIdentifier<any>;
                if (config.reflectType) {
                    type = Reflect.getMetadata(TYPE_TAG, target, name);
                } else {
                    type = args.shift();
                }

                cb({
                    args,
                    kernel,
                    target,
                    name,
                    descriptor
                });
            }
        }
    }
}
