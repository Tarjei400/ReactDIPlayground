import { ICounterReducer } from "./interfaces/ICounterReducer";

@provide(ICounterReducer)
export class CounterReducer implements ICounterReducer {

    public reduce(state, action){
        return state;
    }
}