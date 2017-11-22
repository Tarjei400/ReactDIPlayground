import { interfaces } from "inversify";

export abstract class IKernelProvider {
    abstract get(mock: boolean ) : interfaces.Container;
}