// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

export interface ParameterOrMethodDecoratorFunction {

    (
        target: any | Function,
        propertyKey ?: string,
        paramIndex  ?: number | PropertyDescriptor
    ): void;

}


