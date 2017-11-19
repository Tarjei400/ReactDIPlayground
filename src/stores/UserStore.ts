import { IUserStore } from "./IUserStore";

@provide(IUserStore)
export class UserStore implements IUserStore {
    public get(name) {
        return "Not mocked"
    }
}

@provideMock(IUserStore)
export class MockedUserStore extends UserStore implements IUserStore{
    public get(name) {
        return "mocked"
    }
}