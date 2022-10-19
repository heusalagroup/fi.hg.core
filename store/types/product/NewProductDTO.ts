// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    hasNoOtherKeys,
    isBoolean,
    isNumber,
    isRegularObject,
    isString
} from "../../../modules/lodash";

export interface NewProductDTO {
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

export function createNewProductDTO (
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
): NewProductDTO {
    return {
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

export function isNewProductDTO (value: any): value is NewProductDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
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

export function stringifyNewProductDTO (value: NewProductDTO): string {
    return `NewProductDTO(${value})`;
}

export function parseNewProductDTO (value: any): NewProductDTO | undefined {
    if ( isNewProductDTO(value) ) return value;
    return undefined;
}
