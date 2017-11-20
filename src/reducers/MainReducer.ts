import { IMainReducer}  from "./interfaces/IMainReducer";
import { combineReducers } from "redux";
import { IReducer } from "./interfaces/IReducer";
import { multiInject } from "inversify";

@provide(IMainReducer)
export class MainReducer implements IMainReducer {

    /***
     * @property {ICounterReducer} counterReducer
     */
    @multiInject(IReducer)
    private reducers: IReducer[];

    /***
     * Combines reducers, stores binded reducers under stateNode key.
     * @returns {Reducer}
     */
    public combine(): Reducer {
        let reducerCallbacks = this.reducers.reduce((arr: Object, reducer : IReducer) => {

            if (arr[reducer.stateNode] !== undefined) {
                throw new Error(`Duplicated state node name '${reducer.stateNode}' in reducers from IoC container.`)
            }

            arr[reducer.stateNode] = reducer.reduce.bind(reducer);
            return arr;
        }, {});

        return combineReducers.apply(null, reducerCallbacks);
    }
}