import { injectable } from "inversify";
import {BaseDecoratorCreator} from "./BaseDecoratorCreator";

/***
 * Creator for `@provideMock` decorator
 *
 * @class ProvideMockCreator
 */
export class ProvideMockCreator extends BaseDecoratorCreator {
    /***
     * @inherit
     */
    public name() { return "provideMock"}

    /**
     * @inherit
     */
    public get config() {
        return {
            mocked : true,
            reflectType : false,
        }
    };

    public decorator({kernel, type, target, name, descriptor}) : void {
        injectable()(target, name,descriptor);
        kernel.bind(type).to(target);
    }
}