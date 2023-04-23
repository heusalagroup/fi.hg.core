// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isBoolean } from "../../../types/Boolean";
import { isString } from "../../../types/String";
import { isNumber } from "../../../types/Number";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface NewProductDTO {
    readonly productGroupId    : string;
    readonly priceTypeId       : string;
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
        && hasNoOtherKeysInDevelopment(value, [
            'productGroupId',
            'priceTypeId',
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
