export abstract class IStoreFactory {
    abstract make(): Store<any>;
}