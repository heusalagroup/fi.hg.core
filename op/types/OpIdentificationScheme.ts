// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";

/**
 * Type of identification used for identifying the ultimate creditor.
 */
export enum OpIdentificationScheme {

    /**
     * BIC - Bank Identification Code
     */
    BIC = "BIC",

    /**
     * COID - Country Identifier Code for an organization (e.g. Business ID)
     */
    COID = "COID",

    /**
     * TXID - Tax Identification Number for an organization (e.g. VAT code)
     */
    TXID = "TXID",

    /**
     * SOSE - Personal identity code (social security number) for a person
     */
    SOSE = "SOSE",

    /**
     * UNSTRUCTURED_ORG - Unstructured identifier for an organization
     */
    UNSTRUCTURED_ORG = "UNSTRUCTURED_ORG",

    /**
     * UNSTRUCTURED_PERSON - Unstructured identifier for a person
     */
    UNSTRUCTURED_PERSON = "UNSTRUCTURED_PERSON",

}

export function isOpIdentificationScheme (value: unknown) : value is OpIdentificationScheme {
    return isEnum(OpIdentificationScheme, value);
}

export function explainOpIdentificationScheme (value : unknown) : string {
    return explainEnum("OpIdentificationScheme", OpIdentificationScheme, isOpIdentificationScheme, value);
}

export function stringifyOpIdentificationScheme (value : OpIdentificationScheme) : string {
    return stringifyEnum(OpIdentificationScheme, value);
}

export function parseOpIdentificationScheme (value: any) : OpIdentificationScheme | undefined {
    return parseEnum(OpIdentificationScheme, value) as OpIdentificationScheme | undefined;
}

export function isOpIdentificationSchemeOrUndefined (value: unknown): value is OpIdentificationScheme | undefined {
    return isUndefined(value) || isOpIdentificationScheme(value);
}

export function explainOpIdentificationSchemeOrUndefined (value: unknown): string {
    return isOpIdentificationSchemeOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpIdentificationScheme', 'undefined']));
}
