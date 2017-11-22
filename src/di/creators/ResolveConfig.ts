import { ENV_TAG, BaseDecoratorCreator} from "./BaseDecoratorCreator";

/***
 * Creator for `@resolveConfig` decorator
 *
 * @class ResolveConfigCreator
 */
export class ResolveConfigCreator extends BaseDecoratorCreator {
    /***
     * @inherit
     */
    public name() { return "resolveConfig"}

    /**
     * @inherit
     */
    public get config() {
        return {
            mocked : this.diConfig.mockedKernel,
            reflectType : true,
        }
    };

    public decorator({kernel, type, target, name, descriptor}) : void {
        target[name] = kernel.getTagged(type, ENV_TAG, NODE_ENV);
    }
}