// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, explainStringOrNull, isString, isStringOrNull } from "../../types/String";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainNumber, isNumber } from "../../types/Number";

/**
 * OP bank account details response DTO.
 *
 * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api#operation/account
 *
 * @example
 *
 *     {
 *       "bic": "OKOYFIHH",
 *       "iban": "FI7450009499999999",
 *       "dueDate": "29.11.2019",
 *       "ownerId": "1234567-8",
 *       "currency": "EUR",
 *       "netBalance": "222.22",
 *       "accountName": "Some name given by client",
 *       "creditLimit": 0,
 *       "surrogateId": "rNEl6nJ-VgIqbIfyNDBPo-Un2SBTa6zMDspKshS3J6fOlQ==",
 *       "accountOwner": "Firstname Lastname",
 *       "creationDate": "29.11.2011",
 *       "grossBalance": "222.22",
 *       "intraDayLimit": "222.22"
 *     }
 */
export interface OpAccountDetailsDTO {

    /**
     * Bank Identification Code
     */
    readonly bic: string;

    /**
     * International Bank Account Number
     */
    readonly iban: string;

    /**
     * Account due date for fixed term accounts
     */
    readonly dueDate: string | null;

    /**
     * Owner identifier
     */
    readonly ownerId: string;

    /**
     * ISO currency code
     */
    readonly currency : string;

    /**
     * Balance of the account including cover reservations
     */
    readonly netBalance : string;

    /**
     * Account name
     */
    readonly accountName : string | null;

    /**
     * Maximum credit amount for the account
     */
    readonly creditLimit : number;

    /**
     * Surrogate identifier used in place of actual iban in further requests
     */
    readonly surrogateId : string;

    /**
     * Account owner
     */
    readonly accountOwner : string;

    /**
     * Account creation date
     */
    readonly creationDate : string;

    /**
     * Gross balance of the account
     */
    readonly grossBalance : string;

    /**
     * Maximum allowed amount for negative balance per day
     */
    readonly intraDayLimit : string | null;

}

export function createOpAccountDetailsDTO (
    bic: string,
    iban: string,
    dueDate: string | null,
    ownerId: string,
    currency : string,
    netBalance : string,
    accountName : string | null,
    creditLimit : number,
    surrogateId : string,
    accountOwner : string,
    creationDate : string,
    grossBalance : string,
    intraDayLimit : string | null,
) : OpAccountDetailsDTO {
    return {
        bic,
        iban,
        dueDate,
        ownerId,
        currency,
        netBalance,
        accountName,
        creditLimit,
        surrogateId,
        accountOwner,
        creationDate,
        grossBalance,
        intraDayLimit,
    };
}

export function isOpAccountDetailsDTO (value: unknown) : value is OpAccountDetailsDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'bic',
            'iban',
            'dueDate',
            'ownerId',
            'currency',
            'netBalance',
            'accountName',
            'creditLimit',
            'surrogateId',
            'accountOwner',
            'creationDate',
            'grossBalance',
            'intraDayLimit',
        ])
        && isString(value?.bic)
        && isString(value?.iban)
        && isStringOrNull(value?.dueDate)
        && isString(value?.ownerId)
        && isString(value?.currency)
        && isString(value?.netBalance)
        && isStringOrNull(value?.accountName)
        && isNumber(value?.creditLimit)
        && isString(value?.surrogateId)
        && isString(value?.accountOwner)
        && isString(value?.creationDate)
        && isString(value?.grossBalance)
        && isStringOrNull(value?.intraDayLimit)
    );
}

export function explainOpAccountDetailsDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'bic',
                'iban',
                'dueDate',
                'ownerId',
                'currency',
                'netBalance',
                'accountName',
                'creditLimit',
                'surrogateId',
                'accountOwner',
                'creationDate',
                'grossBalance',
                'intraDayLimit',
            ])
            , explainProperty("bic", explainString(value?.bic))
            , explainProperty("iban", explainString(value?.iban))
            , explainProperty("dueDate", explainStringOrNull(value?.dueDate))
            , explainProperty("ownerId", explainString(value?.ownerId))
            , explainProperty("currency", explainString(value?.currency))
            , explainProperty("netBalance", explainString(value?.netBalance))
            , explainProperty("accountName", explainStringOrNull(value?.accountName))
            , explainProperty("creditLimit", explainNumber(value?.creditLimit))
            , explainProperty("surrogateId", explainString(value?.surrogateId))
            , explainProperty("accountOwner", explainString(value?.accountOwner))
            , explainProperty("creationDate", explainString(value?.creationDate))
            , explainProperty("grossBalance", explainString(value?.grossBalance))
            , explainProperty("intraDayLimit", explainStringOrNull(value?.intraDayLimit))
        ]
    );
}

export function parseOpAccountDetailsDTO (value: unknown) : OpAccountDetailsDTO | undefined {
    if (isOpAccountDetailsDTO(value)) return value;
    return undefined;
}

export function isOpAccountDetailsDTOOrUndefined (value: unknown): value is OpAccountDetailsDTO | undefined {
    return isUndefined(value) || isOpAccountDetailsDTO(value);
}

export function explainOpAccountDetailsDTOOrUndefined (value: unknown): string {
    return isOpAccountDetailsDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpAccountDetailsDTO', 'undefined']));
}
