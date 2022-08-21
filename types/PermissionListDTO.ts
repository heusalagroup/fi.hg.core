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

export interface TargetPermissionObject<T extends string> {
    readonly [key: string]: PermissionList<T>;
}

export interface PermissionListDTO<T extends string> {
    readonly permissions : PermissionList<T>;
    readonly targetPermissions : TargetPermissionObject<T>;
}

export function createPermissionListDTO<T extends string> (
    permissions : PermissionList<T>,
    targetPermissions: TargetPermissionObject<T>
) : PermissionListDTO<T> {
    return {
        permissions,
        targetPermissions
    };
}

export function isPermissionListDTO<T extends string> (
    value: any,
    isT: TestCallback
) : value is PermissionListDTO<T> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'permissions',
            'targetPermissions'
        ])
        && isPermissionList<T>(value?.permissions, isT)
        && isObjectOf<string, T>(value?.targetPermissions, isString, isT)
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
            ),
            explainProperty(
                "permissions",
                explainObjectOf<string, T>(
                    value?.targetPermissions,
                    isString,
                    isPermission,
                    "string",
                    "T"
                )
            )
        ]
    );
}
