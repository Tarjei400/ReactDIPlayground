interface ILocalApiConfig {
    post : string,
    get : string,
}
interface IApiConfig {
    baseUrl: string
    post : string,
    get : string,
}

export interface ISampleConfig {
    baseUrl : string;
    users: ILocalApiConfig
    consents: IApiConfig
}

@config("env", "Testing")
let userTestingConfig: ILocalApiConfig = {
    post : "http://url/user",
    get : "http://url/user"
};

@config("env", "Staging")
let userStagingConfig: ILocalApiConfig = {
    post : "http://url/user",
    get : "http://url/user"
};

@config("env", "Production")
let userProductionConfig: ILocalApiConfig = {
    post : "http://url/user",
    get : "http://url/user"
};

export class SampleConfig implements ISampleConfig {
    public baseUrl: string = "asd";

    @config()
    public users : ILocalApiConfig = {
        post : "http://url/user",
        get : "http://url/user"
    };

    @config()
    public consents : IApiConfig = {
        baseUrl: "Url to ext api",
        post : "http://url/user",
        get : "http://url/user"
    }
}