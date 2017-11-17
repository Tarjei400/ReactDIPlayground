import { interfaces } from "inversify";

export abstract class IKernelProvider {
    abstract get() : interfaces.Container;
}