// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainString, isString } from "../../types/String";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNumber, isNumber } from "../../types/Number";
import { isUndefined } from "../../types/undefined";

/**
 * @see https://docs.paytrail.com/#/?id=commission
 */
export interface PaytrailComission {

    /**
     * Merchant who gets the commission
     *
     * Example: `695874`
     */
    readonly merchant: string;

    /**
     * Amount of commission in currency's minor units, e.g. for Euros use cents.
     * VAT not applicable.
     *
     * Example: `250`
     */
    readonly amount: number;

}

export function createPaytrailComission (
    merchant : string,
    amount   : number,
) : PaytrailComission {
    return {
        merchant,
        amount,
    };
}

export function isPaytrailComission (value: unknown) : value is PaytrailComission {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'merchant',
            'amount',
        ])
        && isString(value?.merchant)
        && isNumber(value?.amount)
    );
}

export function explainPaytrailComission (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'merchant',
                'amount',
            ])
            , explainProperty("merchant", explainString(value?.merchant))
            , explainProperty("amount", explainNumber(value?.amount))
        ]
    );
}

export function parsePaytrailComission (value: unknown) : PaytrailComission | undefined {
    if (isPaytrailComission(value)) return value;
    return undefined;
}

export function isPaytrailComissionOrUndefined (value: unknown): value is PaytrailComission | undefined {
    return isUndefined(value) || isPaytrailComission(value);
}

export function explainPaytrailComissionOrUndefined (value: unknown): string {
    return isPaytrailComissionOrUndefined(value) ? explainOk() : explainNot(explainOr(['PaytrailComission', 'undefined']));
}
