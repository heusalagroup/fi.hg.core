// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../types/String";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainOpAddressOrUndefined, isOpAddressOrUndefined, OpAddress } from "./OpPaymentAddress";

/**
 * @example
 *   {
 *          "name":"Creditor Name",
 *          "iban":"FI3859991620004143",
 *          "address":{
 *              "addressLine":["a1","a2"],
 *              "country":"FI"
 *           }
 *   }
 */

export interface OpPaymentCreditor {

    /**
     * Size: 1..70 characters
     */
    readonly name     : string;

    /**
     * Site: 1..34 characteds
     */
    readonly iban    ?: string;
    readonly address ?: OpAddress;

}

export function createOpPaymentCreditor (
    name     : string,
    iban    ?: string,
    address ?: OpAddress,
) : OpPaymentCreditor {
    return {
        name,
        iban,
        address,
    };
}

export function isOpPaymentCreditor (value: unknown) : value is OpPaymentCreditor {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'iban',
            'address',
        ])
        && isString(value?.name)
        && isStringOrUndefined(value?.iban)
        && isOpAddressOrUndefined(value?.address)
    );
}

export function explainOpPaymentCreditor (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'iban',
                'address',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("iban", explainStringOrUndefined(value?.iban))
            , explainProperty("address", explainOpAddressOrUndefined(value?.address))
        ]
    );
}

export function parseOpPaymentCreditor (value: unknown) : OpPaymentCreditor | undefined {
    if (isOpPaymentCreditor(value)) return value;
    return undefined;
}

export function isOpPaymentCreditorOrUndefined (value: unknown): value is OpPaymentCreditor | undefined {
    return isUndefined(value) || isOpPaymentCreditor(value);
}

export function explainOpPaymentCreditorOrUndefined (value: unknown): string {
    return isOpPaymentCreditorOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpPaymentCreditor', 'undefined']));
}
