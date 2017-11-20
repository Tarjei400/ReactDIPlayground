import { IMainReducer } from "./interfaces/IMainReducer";
import { createStore} from "redux";
import { IStoreFactory } from "./interfaces/IStoreFactory";
import { inject } from "inversify";

@provide(IStoreFactory)
export class StoreFactory {

    /***
     * @property {IMainReducer} mainReducer
     */
    @inject(IMainReducer)
    private mainReducer : IMainReducer;

    /***
     * Creates Redux store, with all reducers registered to dependency injection
     *
     * @method make
     * @returns {Store<any>}
     */
    public make() : Store<any> {
        return createStore( this.mainReducer.combine() )
    }
}