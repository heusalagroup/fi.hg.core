// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainJokerStringObject, isJokerStringObject, JokerStringObject } from "./JokerStringObject";
import { explainJokerComApiUserAccess, isJokerComApiUserAccess, JokerComApiUserAccess } from "./JokerComApiUserAccess";
import { explainJokerComApiCurrency, isJokerComApiCurrency, JokerComApiCurrency } from "./JokerComApiCurrency";
import { explainJokerComApiPriceAmount, isJokerComApiPriceAmount, JokerComApiPriceAmount } from "./JokerComApiPriceAmount";
import { explain, explainProperty } from "../../../../types/explain";
import { explainString, isString } from "../../../../types/String";
import { explainNumber, isNumber } from "../../../../types/Number";
import { explainStringArray, isStringArray } from "../../../../types/StringArray";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../../types/OtherKeys";

/**
 * @see https://joker.com/faq/content/26/14/en/login.html
 */
export interface JokerComApiLoginDTO {

    readonly headers                 : JokerStringObject;
    readonly authSID                 : string;
    readonly uid                     : string;
    readonly userLogin               : string;
    readonly sessionTimeout          : number;
    readonly userAccess              : JokerComApiUserAccess;
    readonly accountCurrency         : JokerComApiCurrency;
    readonly accountBalance          : JokerComApiPriceAmount;
    readonly accountPendingAmount    : JokerComApiPriceAmount;
    readonly accountRebate           : number;
    readonly accountContractDate     : string;
    readonly statsNumberOfDomains    : number;
    readonly statsLastLogin          : string;
    readonly statsLastIp             : string;
    readonly statsLastError          : string;
    readonly statsLastErrorIp        : string;
    readonly statsNumberOfAutoRenew  : number;

    /**
     * List of domain TLDs which are available to the reseller.
     */
    readonly tldList                 : readonly string[];

}

export function createJokerComApiLoginDTO (
    headers                 : JokerStringObject,
    authSID                 : string,
    uid                     : string,
    userLogin               : string,
    sessionTimeout          : number,
    userAccess              : JokerComApiUserAccess,
    accountCurrency         : JokerComApiCurrency,
    accountBalance          : JokerComApiPriceAmount,
    accountPendingAmount    : JokerComApiPriceAmount,
    accountRebate           : number,
    accountContractDate     : string,
    statsNumberOfDomains    : number,
    statsLastLogin          : string,
    statsLastIp             : string,
    statsLastError          : string,
    statsLastErrorIp        : string,
    statsNumberOfAutoRenew  : number,
    tldList                 : readonly string[]
) : JokerComApiLoginDTO {
    return {
        authSID,
        uid,
        userLogin,
        sessionTimeout,
        userAccess,
        accountCurrency,
        accountBalance,
        accountPendingAmount,
        accountRebate,
        accountContractDate,
        statsNumberOfDomains,
        statsLastLogin,
        statsLastIp,
        statsLastError,
        statsLastErrorIp,
        statsNumberOfAutoRenew,
        tldList,
        headers
    };
}

export function isJokerComApiLoginDTO (value: any) : value is JokerComApiLoginDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'headers',
            'authSID',
            'uid',
            'userLogin',
            'sessionTimeout',
            'userAccess',
            'accountCurrency',
            'accountBalance',
            'accountPendingAmount',
            'accountRebate',
            'accountContractDate',
            'statsNumberOfDomains',
            'statsLastLogin',
            'statsLastIp',
            'statsLastError',
            'statsLastErrorIp',
            'statsNumberOfAutoRenew',
            'tldList'
        ])
        && isJokerStringObject(value?.headers)
        && isString(value?.authSID)
        && isString(value?.uid)
        && isString(value?.userLogin)
        && isNumber(value?.sessionTimeout)
        && isJokerComApiUserAccess(value?.userAccess)
        && isJokerComApiCurrency(value?.accountCurrency)
        && isJokerComApiPriceAmount(value?.accountBalance)
        && isJokerComApiPriceAmount(value?.accountPendingAmount)
        && isNumber(value?.accountRebate)
        && isString(value?.accountContractDate)
        && isNumber(value?.statsNumberOfDomains)
        && isString(value?.statsLastLogin)
        && isString(value?.statsLastIp)
        && isString(value?.statsLastError)
        && isString(value?.statsLastErrorIp)
        && isNumber(value?.statsNumberOfAutoRenew)
        && isStringArray(value?.tldList)
    );
}

export function explainJokerComApiLoginDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'headers',
                'authSID',
                'uid',
                'userLogin',
                'sessionTimeout',
                'userAccess',
                'accountCurrency',
                'accountBalance',
                'accountPendingAmount',
                'accountRebate',
                'accountContractDate',
                'statsNumberOfDomains',
                'statsLastLogin',
                'statsLastIp',
                'statsLastError',
                'statsLastErrorIp',
                'statsNumberOfAutoRenew',
                'tldList'
            ]),
            explainProperty("authSID", explainString(value?.authSID)),
            explainProperty("uid",     explainString(value?.uid)),
            explainProperty("userLogin",              explainString(value?.userLogin)),
            explainProperty("sessionTimeout",         explainNumber(value?.sessionTimeout)),
            explainProperty("userAccess",             explainJokerComApiUserAccess(value?.userAccess)),
            explainProperty("accountCurrency",        explainJokerComApiCurrency(value?.accountCurrency)),
            explainProperty("accountBalance",         explainJokerComApiPriceAmount(value?.accountBalance)),
            explainProperty("accountPendingAmount",   explainJokerComApiPriceAmount(value?.accountPendingAmount)),
            explainProperty("accountRebate",          explainNumber(value?.accountRebate)),
            explainProperty("accountContractDate",    explainString(value?.accountContractDate)),
            explainProperty("statsNumberOfDomains",   explainNumber(value?.statsNumberOfDomains)),
            explainProperty("statsLastLogin",         explainString(value?.statsLastLogin)),
            explainProperty("statsLastIp",            explainString(value?.statsLastIp)),
            explainProperty("statsLastError",         explainString(value?.statsLastError)),
            explainProperty("statsLastErrorIp",       explainString(value?.statsLastErrorIp)),
            explainProperty("statsNumberOfAutoRenew", explainNumber(value?.statsNumberOfAutoRenew)),
            explainProperty("tldList", explainStringArray(value?.tldList)),
            explainProperty("headers", explainJokerStringObject(value?.headers))
        ]
    );
}

export function stringifyJokerComApiLoginDTO (value : JokerComApiLoginDTO) : string {
    return `JokerComApiLoginDTO(${value})`;
}

export function parseJokerComApiLoginDTO (value: any) : JokerComApiLoginDTO | undefined {
    if (isJokerComApiLoginDTO(value)) return value;
    return undefined;
}
