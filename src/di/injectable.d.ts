
declare global {
    export function provide(ToType: any): any;
    export function provideMock(ToType: any): any;
    export function inject(): any;
    export function installMocks(): void;
}
