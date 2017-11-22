import { interfaces } from "inversify";
import { KernelProvider } from "./KernelProvider"
import { IDIDecoratorFactory } from "./interfaces/IDIDecoratorFactory";
import { DIDecoratorFactory } from "./DIDecoratorFactory";
import { DecoratorsInitializer } from "./DecoratorsInitializer"
import { IDecoratorsInitializer } from "./interfaces/IDecoratorsInitializer"
import { IKernelProvider } from "./interfaces/IKernelProvider"
import { IDIConfig } from "./interfaces/IDIConfig";
import { DIConfig, TestsDIConfig } from "./DIConfig";
import { IDecoratorCreator } from "./interfaces/IDecoratorCreator";
import { InjectConfigCreator} from "./creators/InejectConfig";
import { InjectCreator} from "./creators/Inject";
import { ProvideCreator} from "./creators/Provide";
import { ProvideConfigCreator} from "./creators/ProvideConfig";
import { ProvideMockCreator} from "./creators/ProvideMock";
import { ResolveCreator} from "./creators/Resolve";
import { ResolveConfigCreator} from "./creators/ResolveConfig";

function shouldMock(): boolean{
    try{
        return !!MOCK_INJECTOR
    } catch (e){
        return false;
    }
}

let kernel : interfaces.Container = (new KernelProvider()).get();

kernel.bind<IKernelProvider>(IKernelProvider).to(KernelProvider);
kernel.bind<IDIDecoratorFactory>(IDIDecoratorFactory)
    .to(DIDecoratorFactory);

kernel.bind<IDecoratorsInitializer>(IDecoratorsInitializer).to(DecoratorsInitializer);

if (shouldMock()){
    kernel.bind<IDIConfig>(IDIConfig).to(DIConfig);
} else {
    kernel.bind<IDIConfig>(IDIConfig).to(TestsDIConfig);
}

kernel.bind<IDecoratorCreator>(IDecoratorCreator).to(InjectConfigCreator);
kernel.bind<IDecoratorCreator>(IDecoratorCreator).to(InjectCreator);

kernel.bind<IDecoratorCreator>(IDecoratorCreator).to(ProvideCreator);
kernel.bind<IDecoratorCreator>(IDecoratorCreator).to(ProvideMockCreator);
kernel.bind<IDecoratorCreator>(IDecoratorCreator).to(ProvideConfigCreator);

kernel.bind<IDecoratorCreator>(IDecoratorCreator).to(ResolveCreator);
kernel.bind<IDecoratorCreator>(IDecoratorCreator).to(ResolveConfigCreator);

let decoratorsInitializer = kernel.get(IDecoratorsInitializer);

let decorators = decoratorsInitializer.initialize();
window = Object.assign(window, decorators);

