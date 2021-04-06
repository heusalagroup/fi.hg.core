export interface ParameterOrMethodDecoratorFunction {

    (
        target: any | Function,
        propertyKey ?: string,
        paramIndex  ?: number | PropertyDescriptor
    ): void;

}

export default ParameterOrMethodDecoratorFunction;
