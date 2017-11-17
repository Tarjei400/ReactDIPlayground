import { interfaces } from "inversify";
import { KernelProvider } from "./KernelProvider"
import { IDecoratorFactory, IParametrizedDecoratorFactory } from "./interfaces/IDecoratorFactory";
import { InjectorDecoratorFactory, ProviderDecoratorFactory } from "./DecoratorFactory";
import { DecoratorsInitializer } from "./DecoratorsInitializer"
import { IDecoratorsInitializer } from "./interfaces/IDecoratorsInitializer"

export let kernel : interfaces.Container = (new KernelProvider()).get();

kernel.bind<IDecoratorFactory>(IParametrizedDecoratorFactory).to(ProviderDecoratorFactory).whenTargetNamed(ProviderDecoratorFactory.TAG);
kernel.bind<IDecoratorFactory>(IDecoratorFactory).to(InjectorDecoratorFactory).whenTargetNamed(InjectorDecoratorFactory.TAG);
kernel.bind<IDecoratorsInitializer>(IDecoratorsInitializer).to(DecoratorsInitializer);

let decoratorsInitializer = kernel.get(IDecoratorsInitializer);

let { inject, provide } = decoratorsInitializer.initialize();

window.inject = inject;
window.provide = provide;

console.log(inject, provide);