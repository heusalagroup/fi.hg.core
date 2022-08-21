// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainPermissionList, isPermissionList, PermissionList } from "../PermissionUtils";
import {
    explain,
    ExplainCallback,
    explainNoOtherKeys, explainObjectOf,
    explainProperty,
    explainRegularObject,
    hasNoOtherKeys, isObjectOf,
    isRegularObject, isString,
    TestCallback
} from "../modules/lodash";

export interface PermissionListDTO<T extends string> {
    readonly permissions : PermissionList<T>;
}

export function createPermissionListDTO<T extends string> (
    permissions : PermissionList<T>
) : PermissionListDTO<T> {
    return {
        permissions
    };
}

export function isPermissionListDTO<T extends string> (
    value: any,
    isT: TestCallback
) : value is PermissionListDTO<T> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'permissions'
        ])
        && isPermissionList<T>(value?.permissions, isT)
    );
}

export function explainPermissionListDTO<T extends string> (
    value             : any,
    permissionName    : string,
    permissionExplain : ExplainCallback,
    isPermission      : TestCallback | undefined = undefined
) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'permissions'
            ]),
            explainProperty(
                "permissions",
                explainPermissionList<T>(
                    permissionName,
                    permissionExplain,
                    value?.permissions,
                    isPermission
                )
            )
        ]
    );
}
