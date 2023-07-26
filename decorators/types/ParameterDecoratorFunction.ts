// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

/**
 * This is the decorator type for TypeScript's experimental stage 2 decorators.
 *
 * TypeScript 5 introduced the standard ES style by default, however it does not
 * yet support these parameter decorators.
 */
export interface ParameterDecoratorFunction {

    /**
     * Parameter decorator function.
     *
     * @param target
     * @param propertyKey
     * @param paramIndex
     */
    (
        target       : any | Function,
        propertyKey  : string,
        paramIndex   : number
    ): void;

}
