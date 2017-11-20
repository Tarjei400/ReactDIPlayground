export abstract class IReducer {
    public get stateNode() : String;
    abstract reduce() : Object;
}