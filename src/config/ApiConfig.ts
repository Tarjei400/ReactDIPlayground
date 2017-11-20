import { IApiConfig } from "./interfaces/IConfig";

@config(IApiConfig, "development")
class DevConfig implements IApiConfig {
    baseUrl: string = "http://devendpoint.url"
}

@config(IApiConfig, "production")
class ProdConfig implements IApiConfig {
    baseUrl: string = "http://prodendpoint.url"
}