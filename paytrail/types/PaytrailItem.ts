// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainProperty } from "../../types/explain";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../types/String";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainPaytrailComissionOrUndefined, isPaytrailComissionOrUndefined, PaytrailComission } from "./PaytrailComission";
import { explainNumber, isNumber } from "../../types/Number";

/**
 * @see https://docs.paytrail.com/#/?id=item
 */
export interface PaytrailItem {

    /**
     * Price per unit, in each country's minor unit, e.g. for Euros use cents.
     * By default price should include VAT, unless usePricesWithoutVat is set to
     * true. No negative values accepted. Maximum value of 2147483647, minimum
     * value is 0.
     *
     * Example: `1000`
     */
    readonly unitPrice: number;

    /**
     * Quantity, how many items ordered. Negative values are not supported.
     *
     * Example: `5`
     */
    readonly units: number;

    /**
     * VAT percentage
     *
     * Example: `24`
     */
    readonly vatPercentage: number;

    /**
     * Merchant product code. May appear on invoices of certain payment methods.
     * Maximum of 100 characters
     *
     * Example: `9a`
     */
    readonly productCode: string;

    /**
     * Item description. May appear on invoices of certain payment methods.
     * Maximum of 1000 characters.
     *
     * Example: `Toy dog`
     */
    readonly description ?: string;

    /**
     * Merchant specific item category
     *
     * Example: `happy toys`
     */
    readonly category ?: string;

    /**
     * Item level order ID (suborder ID). Mainly useful for Shop-in-Shop
     * purchases.
     */
    readonly orderId ?: string;

    /**
     * Unique identifier for this item. Required for Shop-in-Shop payments.
     * Required for item refunds.
     */
    readonly stamp ?: string;

    /**
     * Reference for this item. Required for Shop-in-Shop payments.
     *
     * Example: `dog-toy-5`
     */
    readonly reference ?: string;

    /**
     * Merchant ID for the item. Required for Shop-in-Shop payments, do not use
     * for normal payments.
     *
     * Example: `695874`
     */
    readonly merchant ?: string;

    /**
     * Shop-in-Shop commission. Do not use for normal payments.
     */
    readonly commission ?: PaytrailComission;

    /**
     * When is this item going to be delivered.
     *
     * This field is deprecated but remains here as a reference for old integrations.
     *
     * Example: `2019-12-31`
     *
     * @deprecated
     */
    readonly deliveryDate ?: string;

}

export function createPaytrailItem (
    unitPrice: number,
    units: number,
    vatPercentage: number,
    productCode: string,
    description ?: string,
    category ?: string,
    orderId ?: string,
    stamp ?: string,
    reference ?: string,
    merchant ?: string,
    commission ?: PaytrailComission,
    deliveryDate ?: string,
) : PaytrailItem {
    return {
        unitPrice,
        units,
        vatPercentage,
        productCode,
        description,
        category,
        orderId,
        stamp,
        reference,
        merchant,
        commission,
        deliveryDate
    };
}

export function isPaytrailItem (value: unknown) : value is PaytrailItem {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'unitPrice',
            'units',
            'vatPercentage',
            'productCode',
            'description',
            'category',
            'orderId',
            'stamp',
            'reference',
            'merchant',
            'commission',
            'deliveryDate'
        ])
        && isNumber(value?.unitPrice)
        && isNumber(value?.units)
        && isNumber(value?.vatPercentage)
        && isString(value?.productCode)
        && isStringOrUndefined(value?.description)
        && isStringOrUndefined(value?.category)
        && isStringOrUndefined(value?.orderId)
        && isStringOrUndefined(value?.stamp)
        && isStringOrUndefined(value?.reference)
        && isStringOrUndefined(value?.merchant)
        && isPaytrailComissionOrUndefined(value?.commission)
        && isStringOrUndefined(value?.deliveryDate)
    );
}

export function explainPaytrailItem (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'unitPrice',
                'units',
                'vatPercentage',
                'productCode',
                'description',
                'category',
                'orderId',
                'stamp',
                'reference',
                'merchant',
                'commission',
                'deliveryDate'
            ])
            , explainProperty("unitPrice", explainNumber(value?.unitPrice))
            , explainProperty("units", explainNumber(value?.units))
            , explainProperty("vatPercentage", explainNumber(value?.vatPercentage))
            , explainProperty("productCode", explainString(value?.productCode))
            , explainProperty("description", explainStringOrUndefined(value?.description))
            , explainProperty("category", explainStringOrUndefined(value?.category))
            , explainProperty("orderId", explainStringOrUndefined(value?.orderId))
            , explainProperty("stamp", explainStringOrUndefined(value?.stamp))
            , explainProperty("reference", explainStringOrUndefined(value?.reference))
            , explainProperty("merchant", explainStringOrUndefined(value?.merchant))
            , explainProperty("commission", explainPaytrailComissionOrUndefined(value?.commission))
            , explainProperty("deliveryDate", explainStringOrUndefined(value?.deliveryDate))
        ]
    );
}

export function parsePaytrailItem (value: unknown) : PaytrailItem | undefined {
    if (isPaytrailItem(value)) return value;
    return undefined;
}
