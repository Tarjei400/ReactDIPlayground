import { injectable } from "inversify";
import {BaseDecoratorCreator} from "./BaseDecoratorCreator";

/***
 * Creator for `@provide` decorator
 *
 * @class ProvideCreator
 */
export class ProvideCreator extends BaseDecoratorCreator {
    /***
     * @inherit
     */
    public name() { return "provide"}

    /**
     * @inherit
     */
    public get config() {
        return {
            mocked : false,
            reflectType : false,
        }
    };

    public decorator({kernel, type, target, name, descriptor}) : void {
        injectable()(target, name,descriptor);
        kernel.bind(type).to(target);
    }
}