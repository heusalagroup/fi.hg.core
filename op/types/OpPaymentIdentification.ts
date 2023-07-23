// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../types/String";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainOpIdentificationScheme, isOpIdentificationScheme, OpIdentificationScheme } from "./OpIdentificationScheme";

export interface OpPaymentIdentification {

    /**
     * An identifier for the ultimate creditor, e.g. Business ID (Y-tunnus) or
     * personal identity code (social security number). To be interpreted in the
     * context of schemeName and issuer.
     */
    readonly id: string;

    /**
     * Type of identification used for identifying the ultimate creditor.
     */
    readonly schemeName: OpIdentificationScheme;

    /**
     * Name of the id issuer.
     */
    readonly issuer ?: string;

}

export function createOpPaymentIdentification (
    id : string,
    schemeName : OpIdentificationScheme,
    issuer ?: string,
) : OpPaymentIdentification {
    return {
        id,
        schemeName,
        ...(issuer !== undefined ? {issuer} : {}),
    };
}

export function isOpPaymentIdentification (value: unknown) : value is OpPaymentIdentification {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'schemeName',
            'issuer',
        ])
        && isString(value?.id)
        && isOpIdentificationScheme(value?.schemeName)
        && isStringOrUndefined(value?.issuer)
    );
}

export function explainOpPaymentIdentification (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'schemeName',
                'issuer',
            ])
            , explainProperty("id", explainString(value?.id))
            , explainProperty("schemeName", explainOpIdentificationScheme(value?.schemeName))
            , explainProperty("issuer", explainStringOrUndefined(value?.issuer))
        ]
    );
}

export function parseOpPaymentIdentification (value: unknown) : OpPaymentIdentification | undefined {
    if (isOpPaymentIdentification(value)) return value;
    return undefined;
}

export function isOpPaymentIdentificationOrUndefined (value: unknown): value is OpPaymentIdentification | undefined {
    return isUndefined(value) || isOpPaymentIdentification(value);
}

export function explainOpPaymentIdentificationOrUndefined (value: unknown): string {
    return isOpPaymentIdentificationOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpPaymentIdentification', 'undefined']));
}
