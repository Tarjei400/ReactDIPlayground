export type IDecorator = (target: Object, name: string, descriptor?: any) => void;
export type IParametrizedDecorator = (...args: [any]) => IDecorator;
