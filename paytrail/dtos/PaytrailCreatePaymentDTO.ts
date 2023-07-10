// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainString, isString } from "../../types/String";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainReadonlyJsonObjectOrUndefined, isReadonlyJsonObjectOrUndefined, ReadonlyJsonObject } from "../../Json";
import { explainPaytrailProvider, isPaytrailProvider, PaytrailProvider } from "../types/PaytrailProvider";
import { explainArrayOf, isArrayOf } from "../../types/Array";
import { explainPaytrailPaymentMethodGroupData, isPaytrailPaymentMethodGroupData, PaytrailPaymentMethodGroupData } from "../types/PaytrailPaymentMethodGroupData";

/**
 * The response JSON object contains the transaction ID of the payment and list
 * of provider forms.
 *
 * It is highly recommended to render the icons and forms in
 * the shop, but if this is not possible the response also contains a link to
 * the hosted payment gateway.
 *
 * The response contains also HMAC verification
 * headers and cof-request-id header. Storing or logging the request ID header
 * is advised for possible debug needs.
 */
export interface PaytrailCreatePaymentDTO {

    /**
     * Assigned transaction ID for the payment
     */
    readonly transactionId: string;

    /**
     * URL to hosted payment gateway. Redirect (HTTP GET) user here if the
     * payment forms cannot be rendered directly inside the web shop.
     */
    readonly href: string;

    /**
     * Localized text with a link to the terms of payment
     */
    readonly terms: string;

    /**
     * Array of payment method group data with localized names and URLs to icons.
     * Contains only the groups found in the providers of the response
     */
    readonly groups: readonly PaytrailPaymentMethodGroupData[];

    /**
     * The bank reference used for the payments
     */
    readonly reference: string;

    /**
     * Array of providers. Render these elements as HTML forms
     */
    readonly providers: readonly PaytrailProvider[];

    /**
     * Providers which require custom implementation. Currently used only by
     * Apple Pay.
     */
    readonly customProviders ?: ReadonlyJsonObject;

}

export function createPaytrailCreatePaymentDTO (
    transactionId: string,
    href: string,
    terms: string,
    groups: readonly PaytrailPaymentMethodGroupData[],
    reference: string,
    providers: readonly PaytrailProvider[],
    customProviders: ReadonlyJsonObject | undefined
) : PaytrailCreatePaymentDTO {
    return {
        transactionId,
        href,
        terms,
        groups,
        reference,
        providers,
        ...(customProviders ? {customProviders} : {}),
    };
}

export function isPaytrailCreatePaymentDTO (value: unknown) : value is PaytrailCreatePaymentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'transactionId',
            'href',
            'terms',
            'groups',
            'reference',
            'providers',
            'customProviders',
        ])
        && isString(value?.transactionId)
        && isString(value?.href)
        && isString(value?.terms)
        && isArrayOf<PaytrailPaymentMethodGroupData>(value?.groups, isPaytrailPaymentMethodGroupData)
        && isString(value?.reference)
        && isArrayOf<PaytrailProvider>(value?.providers, isPaytrailProvider)
        && isReadonlyJsonObjectOrUndefined(value?.customProviders)
    );
}

export function explainPaytrailCreatePaymentDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'transactionId',
                'href',
                'terms',
                'groups',
                'reference',
                'providers',
                'customProviders',
            ])
            , explainProperty("transactionId", explainString(value?.transactionId))
            , explainProperty("href", explainString(value?.href))
            , explainProperty("terms", explainString(value?.terms))
            , explainProperty("groups", explainArrayOf<PaytrailPaymentMethodGroupData>("PaytrailPaymentMethodGroupData", explainPaytrailPaymentMethodGroupData, value?.groups, isPaytrailPaymentMethodGroupData))
            , explainProperty("reference", explainString(value?.reference))
            , explainProperty("providers", explainArrayOf<PaytrailProvider>("PaytrailProvider", explainPaytrailProvider, value?.providers, isPaytrailProvider))
            , explainProperty("customProviders", explainReadonlyJsonObjectOrUndefined(value?.customProviders))
        ]
    );
}

export function parsePaytrailCreatePaymentDTO (value: unknown) : PaytrailCreatePaymentDTO | undefined {
    if (isPaytrailCreatePaymentDTO(value)) return value;
    return undefined;
}

export function isPaytrailCreatePaymentDTOOrUndefined (value: unknown): value is PaytrailCreatePaymentDTO | undefined {
    return isUndefined(value) || isPaytrailCreatePaymentDTO(value);
}

export function explainPaytrailCreatePaymentDTOOrUndefined (value: unknown): string {
    return isPaytrailCreatePaymentDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['PaytrailCreatePaymentDTO', 'undefined']));
}

