import {  named, inject , injectable } from "inversify";
import { ProviderDecoratorFactory, InjectorDecoratorFactory } from "./DecoratorFactory";
import { IDecoratorFactory } from "./interfaces/IDecoratorFactory";
import { IInjectionDecotrators } from "./interfaces/IInjectionDecorators"
import { IDecoratorsInitializer } from "./interfaces/IDecoratorsInitializer"

const TAGS = {
    SERVICE :'SERVICE',
    FACTORY : 'FACTORY'
};

@injectable()
export class DecoratorsInitializer implements IDecoratorsInitializer {

    @inject(IDecoratorFactory)
    @named(ProviderDecoratorFactory.TAG)
    public providerFactory : IDecoratorFactory;

    @inject(IDecoratorFactory)
    @named(InjectorDecoratorFactory.TAG)
    public injectorFactory: IDecoratorFactory;

    public initialize() : IInjectionDecotrators {
        return {

            inject: this.injectorFactory.make(),
            provide: this.providerFactory.make(),

        }
    }
}





