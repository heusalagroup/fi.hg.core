// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isBoolean } from "../../../types/Boolean";
import { isString } from "../../../types/String";
import { isNumber } from "../../../types/Number";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeys } from "../../../types/OtherKeys";

export interface ProductDTO {
    readonly productId         : string;
    readonly productGroupId    : string;
    readonly priceTypeId       : string;
    readonly updated           : string;
    readonly creation          : string;
    readonly number            : number;
    readonly name              : string;
    readonly description       : string;
    readonly expensePrice      : number;
    readonly price             : number;
    readonly vatPercent        : number;
    readonly onHold            : boolean;
    readonly isPublic          : boolean;
    readonly stockEnabled      : boolean;
    readonly stockAmount       : number;
}

export function createProductDTO (
    productId         : string,
    productGroupId    : string,
    priceTypeId       : string,
    updated           : string,
    creation          : string,
    number            : number,
    name              : string,
    description       : string,
    expensePrice      : number,
    price             : number,
    vatPercent        : number,
    onHold            : boolean,
    isPublic          : boolean,
    stockEnabled      : boolean,
    stockAmount       : number
): ProductDTO {
    return {
        productId,
        productGroupId,
        priceTypeId,
        updated,
        creation,
        number,
        name,
        description,
        expensePrice,
        price,
        vatPercent,
        onHold,
        isPublic,
        stockEnabled,
        stockAmount
    };
}

export function isProductDTO (value: any): value is ProductDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'productId',
            'productGroupId',
            'priceTypeId',
            'updated',
            'creation',
            'number',
            'name',
            'description',
            'expensePrice',
            'price',
            'vatPercent',
            'onHold',
            'isPublic',
            'stockEnabled',
            'stockAmount'
        ])
        && isString(value?.productId)
        && isString(value?.productGroupId)
        && isString(value?.priceTypeId)
        && isString(value?.updated)
        && isString(value?.creation)
        && isNumber(value?.number)
        && isString(value?.name)
        && isString(value?.description)
        && isNumber(value?.expensePrice)
        && isNumber(value?.price)
        && isNumber(value?.vatPercent)
        && isBoolean(value?.onHold)
        && isBoolean(value?.isPublic)
        && isBoolean(value?.stockEnabled)
        && isNumber(value?.stockAmount)
    );
}

export function stringifyProductDTO (value: ProductDTO): string {
    return `ProductDTO(${value})`;
}

export function parseProductDTO (value: any): ProductDTO | undefined {
    if ( isProductDTO(value) ) return value;
    return undefined;
}
