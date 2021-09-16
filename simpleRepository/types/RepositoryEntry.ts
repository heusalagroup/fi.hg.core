// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    hasNoOtherKeys,
    isArrayOrUndefinedOf,
    isBooleanOrUndefined,
    isNumber,
    isRegularObject,
    isString,
    TestCallbackNonStandard
} from "../../modules/lodash";
import { isRepositoryMember, RepositoryMember } from "./RepositoryMember";

export interface RepositoryEntry<T> {

    readonly data     : T;
    readonly id       : string;
    readonly version  : number;
    readonly deleted ?: boolean;

    /**
     * Users who have active access to the resource (eg. joined in the Matrix room)
     */
    readonly members ?: RepositoryMember[];

}

export function isRepositoryEntry<T> (
    value : any,
    isT   : TestCallbackNonStandard
): value is RepositoryEntry<T> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'data',
            'id',
            'version',
            'deleted',
            'members'
        ])
        && isT(value?.data)
        && isString(value?.id)
        && isNumber(value?.version)
        && isBooleanOrUndefined(value?.deleted)
        && isArrayOrUndefinedOf<RepositoryMember>(value?.members, isRepositoryMember)
    );
}

export default RepositoryEntry;
