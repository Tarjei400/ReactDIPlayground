import { inject, tagged } from "inversify";
import { ENV_TAG, BaseDecoratorCreator} from "./BaseDecoratorCreator";

/***
 * Creator for `@injectConfig` decorator
 *
 * @class InjectConfigCreator
 */
export class InjectConfigCreator extends BaseDecoratorCreator {
    /***
     * @inherit
     */
    public name() { return "injectConfig"}

    /**
     * @inherit
     */
    public get config() {
        return {
            mocked: false,
            reflectType: true
        };
    }

    public decorator({type, target, name, descriptor}){
        tagged(ENV_TAG, NODE_ENV)(target, name, descriptor);
        inject(type)(target, name, descriptor);
    }
}