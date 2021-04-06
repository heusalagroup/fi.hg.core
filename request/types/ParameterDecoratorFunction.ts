export interface ParameterDecoratorFunction {

    (
        target       : any | Function,
        propertyKey ?: string,
        paramIndex  ?: number
    ): void;

}

export default ParameterDecoratorFunction;
