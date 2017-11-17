// React 16 needs a mock for requestAnimationFrame in test environment

import * as React from 'react';
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import "reflect-metadata"
import "../di/injectable"

Enzyme.configure({ adapter: new Adapter() });

window.requestAnimationFrame = function(callback: FrameRequestCallback): number{
    setTimeout(callback, 0);
    return 1;
};

export {}
