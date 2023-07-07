// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainString, isString } from "../../types/String";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainPaytrailPaymentMethodGroupData, isPaytrailPaymentMethodGroupData, PaytrailPaymentMethodGroupData } from "../types/PaytrailPaymentMethodGroupData";
import { explainPaytrailProvider, isPaytrailProvider, PaytrailProvider } from "../types/PaytrailProvider";
import { explainArrayOf, isArrayOf } from "../../types/Array";

/**
 * Response DTO for HTTP GET /merchants/payment-providers returns a list of
 * available providers for the merchant. This endpoint can be used for example
 * to show available payment methods in checkout without initializing a new
 * payment before the user actually proceeds to pay their order.
 *
 * @see https://docs.paytrail.com/#/?id=list-providers
 */
export interface PaytrailPaymentProviderListDTO {

    /**
     * Localized text with a link to the terms of payment
     */
    readonly terms: string;

    /**
     * Array of payment method group data with localized names and URLs to icons
     * and providers. Contains only the groups the merchant has providers in.
     * Can be limited by the request query parameters
     */
    readonly groups: readonly PaytrailPaymentMethodGroupData[];

    /**
     * A flat list of all the providers the merchant has. Can be limited by
     * query parameters.
     */
    readonly providers : readonly PaytrailProvider[];

}

export function createPaytrailPaymentProviderListDTO (
    terms : string,
    groups: readonly PaytrailPaymentMethodGroupData[],
    providers : readonly PaytrailProvider[]
) : PaytrailPaymentProviderListDTO {
    return {
        terms,
        groups,
        providers
    };
}

export function isPaytrailPaymentProviderListDTO (value: unknown) : value is PaytrailPaymentProviderListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'terms',
            'groups',
            'providers'
        ])
        && isString(value?.terms)
        && isArrayOf<PaytrailPaymentMethodGroupData>(value?.groups, isPaytrailPaymentMethodGroupData)
        && isArrayOf<PaytrailProvider>(value?.providers, isPaytrailProvider)
    );
}

export function explainPaytrailPaymentProviderListDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'terms',
                'groups',
                'providers'
            ])
            , explainProperty("terms", explainString(value?.terms))
            , explainProperty("groups", explainArrayOf<PaytrailPaymentMethodGroupData>("PaytrailPaymentMethodGroupData", explainPaytrailPaymentMethodGroupData, value?.groups, isPaytrailPaymentMethodGroupData))
            , explainProperty("providers", explainArrayOf<PaytrailProvider>("PaytrailProvider", explainPaytrailProvider, value?.providers, isPaytrailProvider))
        ]
    );
}

export function parsePaytrailPaymentProviderListDTO (value: unknown) : PaytrailPaymentProviderListDTO | undefined {
    if (isPaytrailPaymentProviderListDTO(value)) return value;
    return undefined;
}

export function isPaytrailPaymentProviderListDTOOrUndefined (value: unknown): value is PaytrailPaymentProviderListDTO | undefined {
    return isUndefined(value) || isPaytrailPaymentProviderListDTO(value);
}

export function explainPaytrailPaymentProviderListDTOOrUndefined (value: unknown): string {
    return isPaytrailPaymentProviderListDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['PaytrailPaymentProviderListDTO', 'undefined']));
}
