// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainString, isString } from "../../types/String";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { Currency, explainCurrency, isCurrency } from "../../types/Currency";

export interface OpPaymentInstructedAmount {

    /**
     * Payment amount, ^\d{1,13}\.\d{2}$
     */
    readonly amount: string;

    /**
     * ISO 4217 code for currencies
     */
    readonly currency: Currency;

}

export function createOpPaymentInstructedAmount (
    amount   : string,
    currency : Currency,
) : OpPaymentInstructedAmount {
    return {
        amount,
        currency,
    };
}

export function isOpPaymentInstructedAmount (value: unknown) : value is OpPaymentInstructedAmount {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'amount',
            'currency',
        ])
        && isString(value?.amount)
        && isCurrency(value?.currency)
    );
}

export function explainOpPaymentInstructedAmount (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'amount',
                'currency',
            ])
            , explainProperty("amount", explainString(value?.amount))
            , explainProperty("currency", explainCurrency(value?.currency))
        ]
    );
}

export function parseOpPaymentInstructedAmount (value: unknown) : OpPaymentInstructedAmount | undefined {
    if (isOpPaymentInstructedAmount(value)) return value;
    return undefined;
}

export function isOpPaymentInstructedAmountOrUndefined (value: unknown): value is OpPaymentInstructedAmount | undefined {
    return isUndefined(value) || isOpPaymentInstructedAmount(value);
}

export function explainOpPaymentInstructedAmountOrUndefined (value: unknown): string {
    return isOpPaymentInstructedAmountOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpPaymentInstructedAmount', 'undefined']));
}
