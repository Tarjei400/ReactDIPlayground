import "reflect-metadata";
import "./di/inversify.kernel";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { HelloWorld } from "./components/HelloWorld";
import "./styles/main.scss";

import { KernelProvider } from "./di/KernelProvider";
import {IStoreFactory} from "./reducers/interfaces/IStoreFactory";

declare global {
    namespace HelloSomeNameSpace {
        interface IError {
            error: string | number;
            reason?: string;
            details?: string;
        }
    }
}

let kernel = KernelProvider.get();
let store = kernel.get<IStoreFactory>().make();

/**
 * Render application into a div
 */
export const render = (element) => {
    // our app
    ReactDOM.render(
        <div className="test">
            <HelloWorld />
        </div>
        ,
        document.querySelector(element) as HTMLElement
    );
};
