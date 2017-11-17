import { interfaces, Container, injectable } from "inversify";
import { IKernelProvider } from "./interfaces/IKernelProvider"

@injectable()
export class KernelProvider implements IKernelProvider {
    private kernel : interfaces.Container;

    constructor(){
        this.kernel = new Container();
        this.kernel.bind<IKernelProvider>(IKernelProvider).to(KernelProvider);
    }
    public get() : interfaces.Container {
        return this.kernel
    };
}
