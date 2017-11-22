import { injectable, multiInject } from "inversify";
import { IInjectionDecotrators } from "./interfaces/IInjectionDecorators"
import { IDecoratorsInitializer } from "./interfaces/IDecoratorsInitializer"
import { IDecoratorCreator } from "./interfaces/IDecoratorCreator";

@injectable()
export class DecoratorsInitializer implements IDecoratorsInitializer {

    /**
     * Contains all registered decorator creators.
     *
     * @property decoratorCreators
     */
    @multiInject(IDecoratorCreator)
    private decoratorCreators : IDecoratorCreator[];

    public initialize() : IInjectionDecotrators {
        return this.decoratorCreators.reduce((arr, creator: IDecoratorCreator) => {
            arr[creator.name] = creator;
        }, {});
    }
}





