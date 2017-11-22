import {BaseDecoratorCreator} from "./BaseDecoratorCreator";

/***
 * Creator for `@resolve` decorator
 *
 * @class ResolveConfig
 */
export class ResolveCreator extends BaseDecoratorCreator {
    /***
     * @inherit
     */
    public name() { return "resolve"}

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
        target[name] = kernel.get(type);
    }
}