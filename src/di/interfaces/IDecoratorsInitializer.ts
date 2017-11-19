import { IInjectionDecotrators} from "./IInjectionDecorators";

export abstract class IDecoratorsInitializer {
    abstract initialize() : IInjectionDecotrators;
}
