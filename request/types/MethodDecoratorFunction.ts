// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

export interface MethodDecoratorFunction {

    (
        target       : any | Function,
        propertyKey ?: string,
        descriptor  ?: PropertyDescriptor
    ): void;

}


