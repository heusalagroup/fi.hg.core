// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, isString } from "../../types/String";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainOpPaymentIdentification, isOpPaymentIdentification, OpPaymentIdentification } from "./OpPaymentIdentification";
import { explainOpAddress, isOpAddress, OpAddress } from "./OpPaymentAddress";

export interface OpUltimateDebtor {
    readonly name: string;
    readonly identification: OpPaymentIdentification;
    readonly address: OpAddress;
}

export function createOpUltimateDebtor (
    name : string,
    identification : OpPaymentIdentification,
    address : OpAddress,
) : OpUltimateDebtor {
    return {
        name,
        identification,
        address,
    };
}

export function isOpUltimateDebtor (value: unknown) : value is OpUltimateDebtor {
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

export function explainOpUltimateDebtor (value: any) : string {
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

export function parseOpUltimateDebtor (value: unknown) : OpUltimateDebtor | undefined {
    if (isOpUltimateDebtor(value)) return value;
    return undefined;
}

export function isOpUltimateDebtorOrUndefined (value: unknown): value is OpUltimateDebtor | undefined {
    return isUndefined(value) || isOpUltimateDebtor(value);
}

export function explainOpUltimateDebtorOrUndefined (value: unknown): string {
    return isOpUltimateDebtorOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpUltimateDebtor', 'undefined']));
}
