// Copyright (c) 2021-2023. Heusala Group Oy <info@hg.fi>. All rights reserved.
// Copyright (c) 2021-2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explain, explainProperty } from "../../types/explain";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../types/String";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../types/OtherKeys";

export interface SimpleRepositoryMember {
    readonly id           : string;
    readonly displayName ?: string;
    readonly avatarUrl   ?: string;
}

export function createSimpleRepositoryMember (
    id           : string,
    displayName ?: string,
    avatarUrl   ?: string,
) : SimpleRepositoryMember {
    return {
        id,
        displayName,
        avatarUrl
    };
}

export function isSimpleRepositoryMember (value: any): value is SimpleRepositoryMember {
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

export function explainSimpleRepositoryMember (value: any) : string {
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

export function stringifySimpleRepositoryMember (value: SimpleRepositoryMember): string {
    return `RepositoryMember(${value})`;
}

export function parseSimpleRepositoryMember (value: any): SimpleRepositoryMember | undefined {
    if ( isSimpleRepositoryMember(value) ) return value;
    return undefined;
}
