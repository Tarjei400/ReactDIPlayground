import { IMainReducer } from "./interfaces/IMainReducer";
import { createStore} from "redux";
import { IStoreFactory } from "./interfaces/IStoreFactory";

@provide(IStoreFactory)
export class StoreFactory {

    /***
     * @property {IMainReducer} mainReducer
     */
    @inject()
    private mainReducer : IMainReducer;

    /***
     * Creates Redux store, with combined reducers
     * @method {Store} make
     * @returns {Store<any>}
     */
    public make() : Store<any> {
        return createStore( this.mainReducer.combine())
    }
}