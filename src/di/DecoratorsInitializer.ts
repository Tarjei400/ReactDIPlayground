import {  named, inject , injectable } from "inversify";
import { ProviderDecoratorFactory, InjectorDecoratorFactory } from "./DecoratorFactory";
import { IDecoratorFactory } from "./interfaces/IDecoratorFactory";
import { IParametrizedDecoratorFactory } from "./interfaces/IDecoratorFactory";
import { IInjectionDecotrators } from "./interfaces/IInjectionDecorators"
import { IDecoratorsInitializer } from "./interfaces/IDecoratorsInitializer"
import { IDIConfig } from "./interfaces/IDIConfig"

const TAGS = {
    SERVICE :'SERVICE',
    FACTORY : 'FACTORY'
};

@injectable()
export class DecoratorsInitializer implements IDecoratorsInitializer {

    @inject(IParametrizedDecoratorFactory)
    @named(ProviderDecoratorFactory.TAG)
    public providerFactory : IDecoratorFactory;

    @inject(IParametrizedDecoratorFactory)
    @named(InjectorDecoratorFactory.TAG)
    public injectorFactory: IDecoratorFactory;

    @inject(IDIConfig)
    private config: IDIConfig;

    public initialize() : IInjectionDecotrators {
        return {

            resolve:  this.injectorFactory.make(this.config.mockedKernel),
            provide: this.providerFactory.make(),
            provideMock: this.providerFactory.make(true),

        }
    }
}





