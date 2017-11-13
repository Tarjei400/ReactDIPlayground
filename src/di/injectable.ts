import BindingScope = interfaces.BindingScope;
import { interfaces, Container, named, inject as _inject } from "inversify";

const INJECT = 'dev';
const INJECT_MOCK = 'mock';

let selector = INJECT;

let kernel: interfaces.Container = new Container();
let mocksKernel: interfaces.Container = new Container();
let useMocks = false;

function injectableDecorator<INTERFACE>(target: INTERFACE, name: string, descriptor?: any) : void {
    let type: interfaces.ServiceIdentifier<any> = Reflect.getMetadata("design:type", target, name);
    kernel.bind<INTERFACE>(this).to(target).whenTargetNamed(INJECT);
}

function injectableMockDecorator<INTERFACE>(target: INTERFACE, name: string, descriptor?: any) : void {
    let type: interfaces.ServiceIdentifier<any> = Reflect.getMetadata("design:type", target, name);
    kernel.bind<INTERFACE>(this).to(target).whenTargetNamed(INJECT_MOCK);
}

function injectPropertyDecorator(target: Object, name: string, descriptor?: any) : void {
    let type: interfaces.ServiceIdentifier<any> = Reflect.getMetadata("design:type", target, name);

    let resolved = [];

    try {
       resolved = kernel.getAllNamed(type, selector);
    } catch (e) {
        //Suppressed exception, in case no named dependency is in container.
    }

    if (resolved.length === 0 ){
        resolved = kernel.getAllNamed(type, INJECT);
    }
    target[name] = resolved[0];
}

interface Window {
    inject : () => any;
    provide : (ToType: any) => any;
    provideMock : (ToType: any) => any;
    installMocks : () => void;
}


function provide(ToType: any) : any{
    return injectableDecorator.bind(ToType);
}

function provideMock(ToType: any) : any{

    return injectableMockDecorator.bind(ToType);

}

function inject(): any {
    return injectPropertyDecorator;
}

function installMocks(): void {
    useMocks = true;
    selector = INJECT_MOCK;
    kernel = Container.merge(kernel, mocksKernel)
}

window.provideMock = provideMock;
window.provide = provide;
window.inject = inject;
window.installMocks = installMocks;


