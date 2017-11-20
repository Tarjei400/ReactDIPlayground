import { IConfig } from "./interfaces/IConfig";

@config(IConfig, "development")
export class DevConfig implements IConfig {

}

@config(IConfig, "production")
export class ProdConfig implements IConfig {

}