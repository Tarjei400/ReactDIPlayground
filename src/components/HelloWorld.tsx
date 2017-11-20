import * as React from "react";
import { IUserStore } from "../stores/IUserStore";
import { connect } from "react-redux";

interface IHelloWorldProps {
}

interface IHelloWorldState {
    counter: number;
}

function stateToProps(state, props) : IHelloWorldState{
    return {
        counter: state.counter
    }
}

@connect(stateToProps)
export class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {

    /***
     * @property userStore
     */
    @resolve()
    private userStore : IUserStore;

    constructor(props) {
        super(props);
    }

    private clickHandler() {
        this.props.dispatch( { type: 'INCREMENT', amount : 1 })
    }

    public render() {
        return (
            <button
                onClick={() => this.clickHandler()}
                className="btn btn-primary" type="button"
            >
                {this.userStore.get()}<span className="badge">{this.props.counter}</span>
            </button>
        );
    }
}
