// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    explain,
    explainArrayOrUndefinedOf,
    explainBooleanOrUndefined,
    ExplainCallback,
    explainNoOtherKeys,
    explainNumber,
    explainProperty,
    explainRegularObject,
    explainString,
    hasNoOtherKeys,
    isArrayOrUndefinedOf,
    isBooleanOrUndefined,
    isNumber,
    isRegularObject,
    isString,
    TestCallbackNonStandard
} from "../../modules/lodash";
import { explainRepositoryMember, isRepositoryMember, RepositoryMember } from "./RepositoryMember";

export interface RepositoryEntry<T> {

    readonly data     : T;
    readonly id       : string;
    readonly version  : number;
    readonly deleted ?: boolean;

    /**
     * Users who have active access to the resource (eg. joined in the Matrix room)
     */
    readonly members ?: readonly RepositoryMember[];

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

export function explainRepositoryEntry<T> (
    value    : any,
    isT      : TestCallbackNonStandard,
    explainT : ExplainCallback
) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'data',
                'id',
                'version',
                'deleted',
                'members'
            ]),
            explainProperty("data", explainT(value?.data)),
            explainProperty("id", explainString(value?.id)),
            explainProperty("version", explainNumber(value?.version)),
            explainProperty("deleted", explainBooleanOrUndefined(value?.deleted)),
            explainProperty("members", explainArrayOrUndefinedOf<RepositoryMember>("RepositoryMember", explainRepositoryMember, value?.members, isRepositoryMember))
        ]
    );
}
