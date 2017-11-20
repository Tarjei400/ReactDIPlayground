import { IReducer } from "./interfaces/IReducer";
import { ACTIONS } from "./actions"

const STATE_NODE = "counter";

@provide(IReducer)
export class CounterReducer implements IReducer {

    /***
     * Name of a property in state object.
     * @type {string} stateNode
     */
    public get stateNode() : string {
        return STATE_NODE;
    }

    /**
     * Counter reducer
     *
     * @param state
     * @param action
     * @returns {any}
     */
    public reduce(state, action){
        switch (action.type) {
            case ACTIONS.INCREMENT:
                return {...state, counter: state.counter + 1};

            default:
                return state
        }
    }
}