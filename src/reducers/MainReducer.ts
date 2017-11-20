import {IMainReducer} from "./interfaces/IMainReducer";
import { combineReducers } from "redux";
import {ICounterReducer} from "./interfaces/ICounterReducer";

@provide(IMainReducer)
export class MainReducer implements IMainReducer {

    /***
     * @property {ICounterReducer} counterReducer
     */
    @inject
    private counterReducer: ICounterReducer;

    public combine(): Object {
        return combineReducers(
            this.counterReducer.reduce.bind(this.counterReducer),

        )
    }
}