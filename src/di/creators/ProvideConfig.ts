import { injectable } from "inversify";
import { ENV_TAG, BaseDecoratorCreator} from "./BaseDecoratorCreator";

/***
 * Creator for `@provideConfig` decorator
 *
 * @class ProvideConfigCreator
 */
export class ProvideConfigCreator extends BaseDecoratorCreator {
    /***
     * @inherit
     */
    public name() { return "provideConfig"}

    /**
     * @inherit
     */
    public get config() {
        return {
            mocked: false,
            reflectType: false
        };
    }

    public decorator({kernel, args, type, target, name, descriptor}){
        injectable()(target, name,descriptor);
        kernel.bind(type).to(target).whenTagged(ENV_TAG, args.shift());
    }
}