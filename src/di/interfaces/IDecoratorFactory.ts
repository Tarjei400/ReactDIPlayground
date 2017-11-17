import { IDecorator, IParametrizedDecorator } from "./IDecorator";

export abstract class IDecoratorFactory {
    abstract make() : IDecorator;
}

export abstract class IParametrizedDecoratorFactory {
    abstract make() : IParametrizedDecorator;
}