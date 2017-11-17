import { IUserStore } from "./IUserStore";

export class UserStore implements IUserStore {
    public get(name) {
        return "Not mocked"
    }
}

export class MockedUserStore extends UserStore implements IUserStore{
    public get(name) {
        return "mocked"
    }
}