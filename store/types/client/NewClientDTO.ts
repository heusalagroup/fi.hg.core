// Copyright (c) 2020-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    isArrayOrUndefinedOf,
    isBoolean, isBooleanOrUndefined, isRegularObject,
    isString,
    isStringOrUndefined
} from "../../../modules/lodash";

/**
 * The client object used in the REST API communication when creating a new client record
 */
export interface NewClientDTO {
    readonly company              ?: string;
    readonly companyCode          ?: string;
    readonly firstName            ?: string;
    readonly lastName             ?: string;
    readonly address              ?: string | string[];
    readonly postCode             ?: string;
    readonly postName             ?: string;
    readonly country              ?: string;
    readonly email                ?: string | string[];
    readonly phone                ?: string;
    readonly mobile               ?: string;
    readonly fax                  ?: string;
    readonly billingLang          ?: string;
    readonly sendEmail            ?: boolean;
    readonly sendPost             ?: boolean;
}

export function isNewClientDTO (value: any): value is NewClientDTO {
    return (
        isRegularObject(value)
        && isStringOrUndefined(value?.company)
        && isStringOrUndefined(value?.companyCode)
        && isStringOrUndefined(value?.firstName)
        && isStringOrUndefined(value?.lastName)
        && (isString(value?.address) || isArrayOrUndefinedOf<string>(value?.address, isString))
        && isStringOrUndefined(value?.postCode)
        && isStringOrUndefined(value?.postName)
        && isStringOrUndefined(value?.country)
        && (isString(value?.email) || isArrayOrUndefinedOf<string>(value?.email, isString))
        && isStringOrUndefined(value?.phone)
        && isStringOrUndefined(value?.mobile)
        && isStringOrUndefined(value?.fax)
        && isStringOrUndefined(value?.billingLang)
        && isBooleanOrUndefined(value?.sendEmail)
        && isBooleanOrUndefined(value?.sendPost)
    );
}

export function stringifyNewClientDTO (value: NewClientDTO): string {
    if ( !isNewClientDTO(value) ) throw new TypeError(`Not NewClientDTO: ${value}`);
    return `NewClientDTO(${value})`;
}

export function parseNewClientDTO (value: any): NewClientDTO | undefined {
    if ( isNewClientDTO(value) ) return value;
    return undefined;
}
