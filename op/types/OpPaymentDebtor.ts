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
 *          "name":"Debtor Name",
 *          "iban":"FI3859991620004143",
 *          "address":{
 *              "addressLine":["a1","a2"],
 *              "country":"FI"
 *           }
 *   }
 */

export interface OpPaymentDebtor {

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

export function createOpPaymentDebtor (
    name     : string,
    iban    ?: string,
    address ?: OpAddress,
) : OpPaymentDebtor {
    return {
        name,
        iban,
        address,
    };
}

export function isOpPaymentDebtor (value: unknown) : value is OpPaymentDebtor {
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

export function explainOpPaymentDebtor (value: any) : string {
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

export function parseOpPaymentDebtor (value: unknown) : OpPaymentDebtor | undefined {
    if (isOpPaymentDebtor(value)) return value;
    return undefined;
}

export function isOpPaymentDebtorOrUndefined (value: unknown): value is OpPaymentDebtor | undefined {
    return isUndefined(value) || isOpPaymentDebtor(value);
}

export function explainOpPaymentDebtorOrUndefined (value: unknown): string {
    return isOpPaymentDebtorOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpPaymentDebtor', 'undefined']));
}
