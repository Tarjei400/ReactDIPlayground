import { IParametrizedDecorator } from "./IDecorator";

export interface IInjectionDecotrators {
    resolve: IParametrizedDecorator,
    provide: IParametrizedDecorator
    provideMock: IParametrizedDecorator
}
