// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainString, isString } from "../../types/String";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainPaytrailPaymentMethodGroup, isPaytrailPaymentMethodGroup, PaytrailPaymentMethodGroup } from "./PaytrailPaymentMethodGroup";

/**
 * @see https://docs.paytrail.com/#/?id=paymentmethodgroupdata
 */
export interface PaytrailPaymentMethodGroupData {

    /**
     * ID of the group
     */
    readonly id: PaytrailPaymentMethodGroup;

    /**
     * Localized name of the group
     */
    readonly name: string;

    /**
     * URL to PNG version of the group icon
     */
    readonly icon: string;

    /**
     * URL to SVG version of the group icon. Using the SVG icon is preferred.
     */
    readonly svg: string;

}

export function createPaytrailPaymentMethodGroupData (
    id : PaytrailPaymentMethodGroup,
    name : string,
    icon : string,
    svg : string,
) : PaytrailPaymentMethodGroupData {
    return {
        id,
        name,
        icon,
        svg,
    };
}

export function isPaytrailPaymentMethodGroupData (value: unknown) : value is PaytrailPaymentMethodGroupData {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'name',
            'icon',
            'svg',
        ])
        && isPaytrailPaymentMethodGroup(value?.id)
        && isString(value?.name)
        && isString(value?.icon)
        && isString(value?.svg)
    );
}

export function explainPaytrailPaymentMethodGroupData (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'name',
                'icon',
                'svg',
            ])
            , explainProperty("id", explainPaytrailPaymentMethodGroup(value?.id))
            , explainProperty("name", explainString(value?.name))
            , explainProperty("icon", explainString(value?.icon))
            , explainProperty("svg", explainString(value?.svg))
        ]
    );
}

export function parsePaytrailPaymentMethodGroupData (value: unknown) : PaytrailPaymentMethodGroupData | undefined {
    if (isPaytrailPaymentMethodGroupData(value)) return value;
    return undefined;
}

export function isPaytrailPaymentMethodGroupDataOrUndefined (value: unknown): value is PaytrailPaymentMethodGroupData | undefined {
    return isUndefined(value) || isPaytrailPaymentMethodGroupData(value);
}

export function explainPaytrailPaymentMethodGroupDataOrUndefined (value: unknown): string {
    return isPaytrailPaymentMethodGroupDataOrUndefined(value) ? explainOk() : explainNot(explainOr(['PaytrailPaymentMethodGroupData', 'undefined']));
}
