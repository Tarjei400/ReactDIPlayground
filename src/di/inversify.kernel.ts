import { interfaces } from "inversify";
import { KernelProvider } from "./KernelProvider"
import { IDecoratorFactory, IParametrizedDecoratorFactory } from "./interfaces/IDecoratorFactory";
import { InjectorDecoratorFactory, ProviderDecoratorFactory } from "./DecoratorFactory";
import { DecoratorsInitializer } from "./DecoratorsInitializer"
import { IDecoratorsInitializer } from "./interfaces/IDecoratorsInitializer"
import { IKernelProvider } from "./interfaces/IKernelProvider"
import { IParametrizedDecorator } from "./interfaces/IDecorator";
import { IDIConfig } from "./interfaces/IDIConfig";
import { DIConfig, TestsDIConfig } from "./DIConfig";

function shouldMock(): boolean{
    try{
        return !!MOCK_INJECTOR
    } catch (e){
        return false;
    }
}

let kernel : interfaces.Container = (new KernelProvider()).get();

kernel.bind<IKernelProvider>(IKernelProvider).to(KernelProvider);
kernel.bind<IDecoratorFactory>(IParametrizedDecoratorFactory)
    .to(ProviderDecoratorFactory)
    .whenTargetNamed(ProviderDecoratorFactory.TAG);

kernel.bind<IDecoratorFactory>(IParametrizedDecoratorFactory)
    .to(InjectorDecoratorFactory)
    .whenTargetNamed(InjectorDecoratorFactory.TAG);

kernel.bind<IDecoratorsInitializer>(IDecoratorsInitializer).to(DecoratorsInitializer);

if (shouldMock()){
    kernel.bind<IDIConfig>(IDIConfig).to(DIConfig);
} else {
    kernel.bind<IDIConfig>(IDIConfig).to(TestsDIConfig);
}


let decoratorsInitializer = kernel.get(IDecoratorsInitializer);

let { resolve, provide, provideMock } = decoratorsInitializer.initialize();

interface Window {
    resolve : IParametrizedDecorator
    provide : IParametrizedDecorator
    provideMock : IParametrizedDecorator
}

window.resolve = resolve;
window.provide = provide;
window.provideMock = provideMock;

