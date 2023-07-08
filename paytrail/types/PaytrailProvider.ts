// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../types/String";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainPaytrailPaymentMethodGroup, isPaytrailPaymentMethodGroup, PaytrailPaymentMethodGroup } from "./PaytrailPaymentMethodGroup";
import { explainPaytrailFormField, isPaytrailFormField, PaytrailFormField } from "./PaytrailFormField";
import { explainArrayOfOrUndefined, isArrayOfOrUndefined } from "../../types/Array";

/**
 * @see https://docs.paytrail.com/#/?id=provider
 */
export interface PaytrailProvider {

    /**
     * Form target URL. Use POST as method.
     */
    readonly url ?: string;

    /**
     * URL to PNG version of the provider icon
     */
    readonly icon: string;

    /**
     * URL to SVG version of the provider icon. Using the SVG icon is preferred.
     */
    readonly svg: string;

    /**
     * Provider group. Provider groups allow presenting same type of providers
     * in separate groups which usually makes it easier for the customer to
     * select a payment method.
     */
    readonly group: PaytrailPaymentMethodGroup;

    /**
     * Display name of the provider.
     */
    readonly name : string;

    /**
     * ID of the provider
     */
    readonly id : string;

    /**
     * Array of form fields
     *
     * May be undefined for `.getMerchantsPaymentProviders()` end-point
     */
    readonly parameters ?: readonly PaytrailFormField[];

}

export function createPaytrailProvider (
    icon: string,
    svg: string,
    group: PaytrailPaymentMethodGroup,
    name : string,
    id : string,
    url ?: string,
    parameters ?: readonly PaytrailFormField[],
) : PaytrailProvider {
    return {
        icon,
        svg,
        group,
        name,
        id,
        ...(url !== undefined ? {url} : {}),
        ...(parameters ? {parameters}: {}),
    };
}

export function isPaytrailProvider (value: unknown) : value is PaytrailProvider {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'url',
            'icon',
            'svg',
            'group',
            'name',
            'id',
            'parameters',
        ])
        && isStringOrUndefined(value?.url)
        && isString(value?.icon)
        && isString(value?.svg)
        && isPaytrailPaymentMethodGroup(value?.group)
        && isString(value?.name)
        && isString(value?.id)
        && isArrayOfOrUndefined<PaytrailFormField>(value?.parameters, isPaytrailFormField)
    );
}

export function explainPaytrailProvider (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'url',
                'icon',
                'svg',
                'group',
                'name',
                'id',
                'parameters',
            ])
            , explainProperty("url", explainStringOrUndefined(value?.url))
            , explainProperty("icon", explainString(value?.icon))
            , explainProperty("svg", explainString(value?.svg))
            , explainProperty("group", explainPaytrailPaymentMethodGroup(value?.group))
            , explainProperty("name", explainString(value?.name))
            , explainProperty("id", explainString(value?.id))
            , explainProperty("parameters", explainArrayOfOrUndefined<PaytrailFormField>("PaytrailFormField", explainPaytrailFormField, value?.parameters, isPaytrailFormField))
        ]
    );
}

export function parsePaytrailProvider (value: unknown) : PaytrailProvider | undefined {
    if (isPaytrailProvider(value)) return value;
    return undefined;
}

export function isPaytrailProviderOrUndefined (value: unknown): value is PaytrailProvider | undefined {
    return isUndefined(value) || isPaytrailProvider(value);
}

export function explainPaytrailProviderOrUndefined (value: unknown): string {
    return isPaytrailProviderOrUndefined(value) ? explainOk() : explainNot(explainOr(['PaytrailProvider', 'undefined']));
}
