// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { hasNoOtherKeysInDevelopment, isRegularObject, isString } from "../../modules/lodash";
import { HeadersObject, isHeadersObject } from "../../request/types/HeadersObject";

export interface WordpressContentDTO {
    readonly Body : string;
    readonly Headers : HeadersObject;
}

export function isWordpressContentDTO (value: any): value is WordpressContentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'Body'
            ,'Headers'
        ])
        && isString(value?.Body)
        && isHeadersObject(value?.Headers)
    );
}

export function stringifyWordpressContent (value: WordpressContentDTO): string {
    return `WordpressContentDTO(${value})`;
}

export function parseWordpressContentDTO (value: any): WordpressContentDTO | undefined {
    if ( isWordpressContentDTO(value) ) return value;
    return undefined;
}
