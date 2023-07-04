// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainString, isString } from "../../types/String";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";

export interface CreatePaymentResponseDTO {
    readonly foo: string;
}

export function createCreatePaymentResponseDTO (
    foo : string
) : CreatePaymentResponseDTO {
    return {
        foo
    };
}

export function isCreatePaymentResponseDTO (value: unknown) : value is CreatePaymentResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'foo',
        ])
        && isString(value?.foo)
    );
}

export function explainCreatePaymentResponseDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'foo',
            ])
            , explainProperty("foo", explainString(value?.foo))
        ]
    );
}

export function stringifyCreatePaymentResponseDTO (value : CreatePaymentResponseDTO) : string {
    return `CreatePaymentResponseDTO(${value})`;
}

export function parseCreatePaymentResponseDTO (value: unknown) : CreatePaymentResponseDTO | undefined {
    if (isCreatePaymentResponseDTO(value)) return value;
    return undefined;
}

export function isCreatePaymentResponseDTOOrUndefined (value: unknown): value is CreatePaymentResponseDTO | undefined {
    return isUndefined(value) || isCreatePaymentResponseDTO(value);
}

export function explainCreatePaymentResponseDTOOrUndefined (value: unknown): string {
    return isCreatePaymentResponseDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['CreatePaymentResponseDTO', 'undefined']));
}

