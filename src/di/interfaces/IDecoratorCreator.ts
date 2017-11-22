import { IParametrizedDecorator } from "./IDecorator";

export abstract class IDecoratorCreator  {

    abstract get name();
    abstract get config();
    abstract create(): IParametrizedDecorator;
    abstract decorator( ...args : any[]): void;
}