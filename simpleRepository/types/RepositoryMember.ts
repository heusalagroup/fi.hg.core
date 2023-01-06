// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { explain, explainProperty } from "../../types/explain";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../types/String";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../types/OtherKeys";

export interface RepositoryMember {
    readonly id           : string;
    readonly displayName ?: string;
    readonly avatarUrl   ?: string;
}

export function isRepositoryMember (value: any): value is RepositoryMember {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'displayName',
            'avatarUrl'
        ])
        && isString(value?.id)
        && isStringOrUndefined(value?.displayName)
        && isStringOrUndefined(value?.avatarUrl)
    );
}

export function explainRepositoryMember (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'id',
                'displayName',
                'avatarUrl'
            ])
            , explainProperty("id", explainString(value?.id))
            , explainProperty("displayName", explainStringOrUndefined(value?.displayName))
            , explainProperty("avatarUrl", explainStringOrUndefined(value?.avatarUrl))
        ]
    );
}

export function stringifyRepositoryMember (value: RepositoryMember): string {
    return `RepositoryMember(${value})`;
}

export function parseRepositoryMember (value: any): RepositoryMember | undefined {
    if ( isRepositoryMember(value) ) return value;
    return undefined;
}
