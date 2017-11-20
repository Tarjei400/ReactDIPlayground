import { injectable } from "inversify";
import { ISampleConfig } from "./ISampleConfig"
export interface IConfig {

}

@injectable()
export abstract class IConfig implements IConfig {}
