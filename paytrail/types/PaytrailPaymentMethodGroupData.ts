// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainString, isString } from "../../types/String";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainPaytrailPaymentMethodGroup, isPaytrailPaymentMethodGroup, PaytrailPaymentMethodGroup } from "./PaytrailPaymentMethodGroup";
import { explainPaytrailProvider, isPaytrailProvider, PaytrailProvider } from "./PaytrailProvider";
import { explainArrayOfOrUndefined, isArrayOfOrUndefined } from "../../types/Array";

/**
 * @see https://docs.paytrail.com/#/?id=paymentmethodgroupdata
 * @see https://docs.paytrail.com/#/?id=paymentmethodgroupdatawithproviders
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

    /**
     * Providers for the payment group
     * @see https://docs.paytrail.com/#/?id=paymentmethodgroupdatawithproviders
     */
    readonly providers ?: readonly PaytrailProvider[];

}

export function createPaytrailPaymentMethodGroupData (
    id         : PaytrailPaymentMethodGroup,
    name       : string,
    icon       : string,
    svg        : string,
    providers ?: readonly PaytrailProvider[]
) : PaytrailPaymentMethodGroupData {
    return {
        id,
        name,
        icon,
        svg,
        ...(providers ? {providers} : {})
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
            'providers',
        ])
        && isPaytrailPaymentMethodGroup(value?.id)
        && isString(value?.name)
        && isString(value?.icon)
        && isString(value?.svg)
        && isArrayOfOrUndefined<PaytrailProvider>(value?.providers, isPaytrailProvider)
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
                'providers',
            ])
            , explainProperty("id", explainPaytrailPaymentMethodGroup(value?.id))
            , explainProperty("name", explainString(value?.name))
            , explainProperty("icon", explainString(value?.icon))
            , explainProperty("svg", explainString(value?.svg))
            , explainProperty("providers", explainArrayOfOrUndefined<PaytrailProvider>("PaytrailProvider", explainPaytrailProvider, value?.providers, isPaytrailProvider))
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
