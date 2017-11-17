import * as React from "react";
import { IUserStore } from "../stores/IUserStore";

interface IHelloWorldProps {
}

interface IHelloWorldState {
    counter: number;
}

export class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {

    /***
     * @property userStore
     */


    public state: IHelloWorldState = {
        counter: 0
    };

    constructor(props) {
        super(props);
    }

    private clickHandler() {
        this.setState({counter: ++this.state.counter})
    }

    public render() {
        return (
            <button
                onClick={() => this.clickHandler()}
                className="btn btn-primary" type="button"
            >
                "TEST" <span className="badge">{this.state.counter}</span>
            </button>
        );
    }
}
