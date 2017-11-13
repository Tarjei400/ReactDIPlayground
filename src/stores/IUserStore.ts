
import { injectable } from "inversify";

export interface IUserStore {
    get(name: String): void
}

@injectable()
export abstract class IUserStore implements IUserStore {}
