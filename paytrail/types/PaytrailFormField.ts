// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainString, isString } from "../../types/String";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";

/**
 * The form field values are rendered as hidden <input> elements in the form. See form rendering example.
 *
 * @see https://docs.paytrail.com/#/?id=formfield
 */
export interface PaytrailFormField {

    /**
     * Name of the input
     */
    readonly name: string;

    /**
     * Value of the input
     */
    readonly value: string;

}

export function createPaytrailFormField (
    name : string,
    value : string
) : PaytrailFormField {
    return {
        name,
        value
    };
}

export function isPaytrailFormField (value: unknown) : value is PaytrailFormField {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'value',
        ])
        && isString(value?.name)
        && isString(value?.value)
    );
}

export function explainPaytrailFormField (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'value',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("value", explainString(value?.value))
        ]
    );
}

export function parsePaytrailFormField (value: unknown) : PaytrailFormField | undefined {
    if (isPaytrailFormField(value)) return value;
    return undefined;
}

export function isPaytrailFormFieldOrUndefined (value: unknown): value is PaytrailFormField | undefined {
    return isUndefined(value) || isPaytrailFormField(value);
}

export function explainPaytrailFormFieldOrUndefined (value: unknown): string {
    return isPaytrailFormFieldOrUndefined(value) ? explainOk() : explainNot(explainOr(['PaytrailFormField', 'undefined']));
}
