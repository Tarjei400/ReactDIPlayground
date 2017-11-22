import { IDecoratorCreator } from "../interfaces/IDecoratorCreator";
import { IDIDecoratorFactory } from "../interfaces/IDIDecoratorFactory";
import { injectable , inject } from "inversify";
import { IDIConfig} from "../interfaces/IDIConfig";

/***
 * Const is used to tag configuiration classes in IoC container
 * @type {string}
 */
export const ENV_TAG = "ENVIRONMENT";

/***
 * Base creator for decorators
 *
 * @class BaseDecoratorCreator
 */
@injectable()
export class BaseDecoratorCreator implements IDecoratorCreator {
    /***
     * @property decoratorFactory
     */
    @inject(IDIDecoratorFactory)
    public decoratorFactory : IDIDecoratorFactory;

    /***
     * @property decoratorFactory
     */
    @inject(IDIConfig)
    private diConfig: IDIConfig;

    /***
     * Returns DI specific configuration of a creator
     * @returns {Object}
     */
    abstract get config() : object;

    /***
     * Returns a global name of a decorator
     * @returns {String}
     */
    abstract get name() : string;

    /***
     * DI specific decorator function of a creator
     */
    abstract decorator({type, target, name, descriptor});

    public create(){
        return this.decoratorFactory(this.config, this.decorator.bind(this))
    }
}