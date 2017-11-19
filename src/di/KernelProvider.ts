import { interfaces, Container, injectable } from "inversify";
import { IKernelProvider } from "./interfaces/IKernelProvider"

@injectable()
export class KernelProvider implements IKernelProvider {
    static kernelInstance : interfaces.Container;
    static mocksInstance : interfaces.Container;

    constructor() {
        if(!KernelProvider.kernelInstance) {
            KernelProvider.kernelInstance = new Container();
            KernelProvider.mocksInstance = KernelProvider.kernelInstance.createChild();
        }
    }
    public get(mock: boolean = false) : interfaces.Container {
        if (mock){
            return KernelProvider.mocksInstance
        }
        return KernelProvider.kernelInstance
    };
}
