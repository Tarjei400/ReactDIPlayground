import { KernelProvider } from "./KernelProvider";

abstract class IFoo {
    abstract execute() : number;
}

abstract class IBar {
    abstract execute() : number;
}

abstract class IBaz {
    abstract execute() : number;
}

@provide(IFoo)
class Foo implements IFoo {
    public execute() {
        return 0
    }
}

@provide(IBaz)
class Baz implements IBaz {
    public execute() {
        return 3
    }
}

@provideMock(IFoo)
class MockFoo implements IFoo{
    public execute() : number {
        return 2;
    }
}

@provide(IBar)
class Bar implements IBar{
    @resolve()
    public fooInstance : IFoo;

    @resolve()
    public bazInstance : IBaz;

    public execute() : number {
        return 2 + this.fooInstance.execute() + this.bazInstance.execute();
    }

}

let kernel = KernelProvider.kernelInstance;

it("Should use mocked implementation of Foo", () => {
    let bar = kernel.get(IBar);
    expect(bar.execute()).toBe(7);
});
