export interface RequestMethodParamDecorator {

    (
        target: any | Function,
        propertyKey ?: string,
        paramIndex  ?: number
    ): void;

}

export default RequestMethodParamDecorator;
