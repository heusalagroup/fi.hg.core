// Copyright (c) 2020-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isArray, isArrayOrUndefinedOf } from "../../../types/Array";
import { isBooleanOrUndefined } from "../../../types/Boolean";
import { isString, isStringOrUndefined } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeys } from "../../../types/OtherKeys";

/**
 * The client object used in the REST API communication
 */
export interface ClientDTO {
    readonly id                    : string;
    readonly updated              ?: string;
    readonly created              ?: string;
    readonly date                 ?: string;
    readonly company              ?: string;
    readonly companyCode          ?: string;
    readonly firstname            ?: string;
    readonly lastname             ?: string;
    readonly address              ?: string[];
    readonly postCode             ?: string;
    readonly postName             ?: string;
    readonly country              ?: string;
    readonly email                ?: string[];
    readonly phone                ?: string;
    readonly mobile               ?: string;
    readonly fax                  ?: string;
    readonly billingLang          ?: string;
    readonly sendEmail            ?: boolean;
    readonly sendPost             ?: boolean;
    readonly isTerminated         ?: boolean;
}

export function createClientDTO (
    id            : string,
    updated       : string,
    created       : string,
    date          : string,
    company       : string,
    companyCode   : string,
    firstname     : string,
    lastname      : string,
    address       : string | readonly string[] | undefined,
    postCode      : string,
    postName      : string,
    country       : string,
    email         : string | readonly string[] | undefined,
    phone         : string,
    mobile        : string,
    fax           : string,
    billingLang   : string,
    sendEmail     : boolean,
    sendPost      : boolean,
    isTerminated  : boolean
) : ClientDTO {
    return {
        id,
        updated,
        created,
        date,
        company,
        companyCode,
        firstname,
        lastname,
        address: (!address) ? [] : (isArray(address) ? [...address] : [address]),
        postCode,
        postName,
        country,
        email: (!email) ? [] : (isArray(email) ? [...email] : [email]),
        phone,
        mobile,
        fax,
        billingLang,
        sendEmail,
        sendPost,
        isTerminated
    };
}

export function isClientDTO (value: any): value is ClientDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            "id",
            "updated",
            "created",
            "date",
            "company",
            "companyCode",
            "firstname",
            "lastname",
            "address",
            "postCode",
            "postName",
            "country",
            "email",
            "phone",
            "mobile",
            "fax",
            "billingLang",
            "sendEmail",
            "sendPost",
            "isTerminated"
        ])
        && isString(value?.id)
        && isStringOrUndefined(value?.updated)
        && isStringOrUndefined(value?.created)
        && isStringOrUndefined(value?.date)
        && isStringOrUndefined(value?.company)
        && isStringOrUndefined(value?.companyCode)
        && isStringOrUndefined(value?.firstname)
        && isStringOrUndefined(value?.lastname)
        && isArrayOrUndefinedOf<string>(value?.address, isString)
        && isStringOrUndefined(value?.postCode)
        && isStringOrUndefined(value?.postName)
        && isStringOrUndefined(value?.country)
        && isArrayOrUndefinedOf<string>(value?.email, isString)
        && isStringOrUndefined(value?.phone)
        && isStringOrUndefined(value?.mobile)
        && isStringOrUndefined(value?.fax)
        && isStringOrUndefined(value?.billingLang)
        && isBooleanOrUndefined(value?.sendEmail)
        && isBooleanOrUndefined(value?.sendPost)
        && isBooleanOrUndefined(value?.isTerminated)
    );
}

export function stringifyClientDTO (value: ClientDTO): string {
    if ( !isClientDTO(value) ) throw new TypeError(`Not ClientDTO: ${value}`);
    return `ClientDTO(${value})`;
}

export function parseClientDTO (value: any): ClientDTO | undefined {
    if ( isClientDTO(value) ) return value;
    return undefined;
}
