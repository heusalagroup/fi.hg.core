// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, isString } from "../../types/String";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainOpPaymentIdentification, isOpPaymentIdentification, OpPaymentIdentification } from "./OpPaymentIdentification";
import { explainOpAddress, isOpAddress, OpAddress } from "./OpPaymentAddress";

export interface OpUltimateCreditor {
    readonly name: string;
    readonly identification: OpPaymentIdentification;
    readonly address: OpAddress;
}

export function createOpUltimateCreditor (
    name : string,
    identification : OpPaymentIdentification,
    address : OpAddress,
) : OpUltimateCreditor {
    return {
        name,
        identification,
        address,
    };
}

export function isOpUltimateCreditor (value: unknown) : value is OpUltimateCreditor {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'identification',
            'address',
        ])
        && isString(value?.name)
        && isOpPaymentIdentification(value?.identification)
        && isOpAddress(value?.address)
    );
}

export function explainOpUltimateCreditor (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'identification',
                'address',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("identification", explainOpPaymentIdentification(value?.identification))
            , explainProperty("address", explainOpAddress(value?.address))
        ]
    );
}

export function parseOpUltimateCreditor (value: unknown) : OpUltimateCreditor | undefined {
    if (isOpUltimateCreditor(value)) return value;
    return undefined;
}

export function isOpUltimateCreditorOrUndefined (value: unknown): value is OpUltimateCreditor | undefined {
    return isUndefined(value) || isOpUltimateCreditor(value);
}

export function explainOpUltimateCreditorOrUndefined (value: unknown): string {
    return isOpUltimateCreditorOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpUltimateCreditor', 'undefined']));
}
