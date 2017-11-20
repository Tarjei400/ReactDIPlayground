
import { IDIConfig } from "./interfaces/IDIConfig";
import { injectable } from "inversify";

@injectable()
export class DIConfig implements IDIConfig {
    mockedKernel: false;
}

@injectable()
export class TestsDIConfig implements IDIConfig {
    mockedKernel : true;
}