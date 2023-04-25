// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2021-2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explainRepositoryMember, isRepositoryMember, RepositoryMember } from "./RepositoryMember";
import { ExplainCallback } from "../../types/ExplainCallback";
import { TestCallbackNonStandard } from "../../types/TestCallback";
import { explain, explainProperty } from "../../types/explain";
import { explainBooleanOrUndefined, isBooleanOrUndefined } from "../../types/Boolean";
import { explainString, isString } from "../../types/String";
import { explainNumber, isNumber } from "../../types/Number";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainArrayOrUndefinedOf, isArrayOrUndefinedOf } from "../../types/Array";

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

export function createRepositoryEntry<T> (
    data     : T,
    id       : string,
    version  : number,
    deleted ?: boolean,
    members ?: readonly RepositoryMember[],
) : RepositoryEntry<T> {
    return {
        data,
        id,
        version,
        deleted,
        members
    };
}

export function isRepositoryEntry<T> (
    value : any,
    isT   : TestCallbackNonStandard
): value is RepositoryEntry<T> {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
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
            explainNoOtherKeysInDevelopment(value, [
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
