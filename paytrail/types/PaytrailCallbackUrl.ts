// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, isString } from "../../types/String";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

/**
 * @see https://docs.paytrail.com/#/?id=callbackurl
 */
export interface PaytrailCallbackUrl {
    readonly success: string;
    readonly cancel: string;
}

export function createPaytrailCallbackUrl (
    success : string,
    cancel : string,
) : PaytrailCallbackUrl {
    return {
        success,
        cancel
    };
}

export function isPaytrailCallbackUrl (value: unknown) : value is PaytrailCallbackUrl {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'success',
            'cancel',
        ])
        && isString(value?.success)
        && isString(value?.cancel)
    );
}

export function explainPaytrailCallbackUrl (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'success',
                'cancel',
            ])
            , explainProperty("success", explainString(value?.success))
            , explainProperty("cancel", explainString(value?.cancel))
        ]
    );
}

export function parsePaytrailCallbackUrl (value: unknown) : PaytrailCallbackUrl | undefined {
    if (isPaytrailCallbackUrl(value)) return value;
    return undefined;
}

export function isPaytrailCallbackUrlOrUndefined (value: unknown): value is PaytrailCallbackUrl | undefined {
    return isUndefined(value) || isPaytrailCallbackUrl(value);
}

export function explainPaytrailCallbackUrlOrUndefined (value: unknown): string {
    return isPaytrailCallbackUrlOrUndefined(value) ? explainOk() : explainNot(explainOr(['PaytrailCallbackUrl', 'undefined']));
}
