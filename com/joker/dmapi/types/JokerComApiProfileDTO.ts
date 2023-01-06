// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainJokerStringObject, isJokerStringObject, JokerStringObject } from "./JokerStringObject";
import { explain, explainProperty } from "../../../../types/explain";
import { explainString, isString } from "../../../../types/String";
import { explainNumber, isNumber } from "../../../../types/Number";
import { explainStringArray, isStringArray } from "../../../../types/StringArray";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../../types/OtherKeys";

export interface JokerComApiProfileDTO {
    readonly body         : JokerStringObject;
    readonly headers      : JokerStringObject;
    readonly customerId   : string;
    readonly firstName    : string;
    readonly lastName     : string;
    readonly organization : string;
    readonly city         : string;
    readonly address      : readonly string[];
    readonly postalCode   : string;
    readonly state        : string;
    readonly phone        : string;
    readonly fax          : string;
    readonly balance      : number;
    readonly vatId        : string;
    readonly lastPayment  : string;
    readonly lastAccess   : string;
    readonly adminEmail   : string;
    readonly robotEmail   : string;
    readonly checkdIp     : readonly string[];
    readonly http         : string;
    readonly url          : string;
    readonly whois        : readonly string[];
}

export function createJokerComApiProfileDTO (
    headers      : JokerStringObject,
    body         : JokerStringObject,
    customerId   : string,
    firstName    : string,
    lastName     : string,
    organization : string,
    city         : string,
    address      : readonly string[],
    postalCode   : string,
    state        : string,
    phone        : string,
    fax          : string,
    balance      : number,
    vatId        : string,
    lastPayment  : string,
    lastAccess   : string,
    adminEmail   : string,
    robotEmail   : string,
    checkdIp     : readonly string[],
    http         : string,
    url          : string,
    whois        : readonly string[]
) : JokerComApiProfileDTO {
    return {
        headers,
        body,
        customerId,
        firstName,
        lastName,
        organization,
        city,
        address,
        postalCode,
        state,
        phone,
        fax,
        balance,
        vatId,
        lastPayment,
        lastAccess,
        adminEmail,
        robotEmail,
        checkdIp,
        http,
        url,
        whois
    };
}

export function isJokerComApiProfileDTO (value: any) : value is JokerComApiProfileDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'headers',
            'body',
            'customerId',
            'firstName',
            'lastName',
            'organization',
            'city',
            'address',
            'postalCode',
            'state',
            'phone',
            'fax',
            'balance',
            'vatId',
            'lastPayment',
            'lastAccess',
            'adminEmail',
            'robotEmail',
            'checkdIp',
            'http',
            'url',
            'whois'
        ])
        && isJokerStringObject(value?.headers)
        && isJokerStringObject(value?.body)
        && isString(value?.customerId)
        && isString(value?.firstName)
        && isString(value?.lastName)
        && isString(value?.organization)
        && isString(value?.city)
        && isStringArray(value?.address)
        && isString(value?.postalCode)
        && isString(value?.state)
        && isString(value?.phone)
        && isString(value?.fax)
        && isNumber(value?.balance)
        && isString(value?.vatId)
        && isString(value?.lastPayment)
        && isString(value?.lastAccess)
        && isString(value?.adminEmail)
        && isString(value?.robotEmail)
        && isStringArray(value?.checkdIp)
        && isString(value?.http)
        && isString(value?.url)
        && isStringArray(value?.whois)
    );
}

export function explainJokerComApiProfileDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'headers',
                'body',
                'customerId',
                'firstName',
                'lastName',
                'organization',
                'city',
                'address',
                'postalCode',
                'state',
                'phone',
                'fax',
                'balance',
                'vatId',
                'lastPayment',
                'lastAccess',
                'adminEmail',
                'robotEmail',
                'checkdIp',
                'http',
                'url',
                'whois'
            ]),
            explainProperty("headers", explainJokerStringObject(value?.headers)),
            explainProperty("body", explainJokerStringObject(value?.body)),
            explainProperty("customerId", explainString(value?.customerId)),
            explainProperty("firstName", explainString(value?.firstName)),
            explainProperty("lastName", explainString(value?.lastName)),
            explainProperty("organization", explainString(value?.organization)),
            explainProperty("city", explainString(value?.city)),
            explainProperty("address", explainStringArray(value?.address)),
            explainProperty("postalCode", explainString(value?.postalCode)),
            explainProperty("state", explainString(value?.state)),
            explainProperty("phone", explainString(value?.phone)),
            explainProperty("fax", explainString(value?.fax)),
            explainProperty("balance", explainNumber(value?.balance)),
            explainProperty("vatId", explainString(value?.vatId)),
            explainProperty("lastPayment", explainString(value?.lastPayment)),
            explainProperty("lastAccess", explainString(value?.lastAccess)),
            explainProperty("adminEmail", explainString(value?.adminEmail)),
            explainProperty("robotEmail", explainString(value?.robotEmail)),
            explainProperty("checkdIp", explainStringArray(value?.checkdIp)),
            explainProperty("http", explainString(value?.http)),
            explainProperty("url", explainString(value?.url)),
            explainProperty("whois", explainStringArray(value?.whois))
        ]
    );
}

export function stringifyJokerComApiProfileDTO (value : JokerComApiProfileDTO) : string {
    return `JokerComApiProfileDTO(${value})`;
}

export function parseJokerComApiProfileDTO (value: any) : JokerComApiProfileDTO | undefined {
    if (isJokerComApiProfileDTO(value)) return value;
    return undefined;
}
