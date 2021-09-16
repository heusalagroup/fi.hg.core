// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    hasNoOtherKeys,
    isRegularObject,
    isString,
    isStringOrUndefined
} from "../../modules/lodash";

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

export function stringifyRepositoryMember (value: RepositoryMember): string {
    return `RepositoryMember(${value})`;
}

export function parseRepositoryMember (value: any): RepositoryMember | undefined {
    if ( isRepositoryMember(value) ) return value;
    return undefined;
}

export default RepositoryMember;
