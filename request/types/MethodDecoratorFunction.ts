
export interface MethodDecoratorFunction {

    (
        target       : any | Function,
        propertyKey ?: string,
        descriptor  ?: PropertyDescriptor
    ): void;

}

export default MethodDecoratorFunction;
