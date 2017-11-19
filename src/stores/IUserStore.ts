
import { injectable } from "inversify";

export abstract class IUserStore {
    get(name: String): void
}
