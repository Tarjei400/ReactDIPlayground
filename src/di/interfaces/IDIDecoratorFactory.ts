import { IParametrizedDecorator } from "./IDecorator";

export abstract class IDIDecoratorFactory {
    abstract make() : IParametrizedDecorator;
}