
export interface RequestMappingDecorator {

    (
        target: any | Function,
        propertyKey ?: string,
        descriptor  ?: PropertyDescriptor
    ): void;

}

export default RequestMappingDecorator;
