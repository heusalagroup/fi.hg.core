// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    everyValue,
    explainArrayOf,
    ExplainCallback,
    filter,
    isArrayOf, 
    isString,
    reduce,
    TestCallback,
    TestCallbackNonStandard,
    values
} from "./modules/lodash";

export type PermissionString<T extends string> = T;

export type PermissionList<T extends string> = readonly PermissionString<T>[];

export function isPermissionList<T extends string> (
    value        : any,
    isItem       : TestCallback | undefined = undefined,
    minLength    : number | undefined       = undefined,
    maxLength    : number | undefined       = undefined
) : boolean {
    return isArrayOf<T>(
        value,
        isItem,
        minLength,
        maxLength
    );
}

export function explainPermissionList<T extends string> (
    itemTypeName : string,
    itemExplain  : ExplainCallback,
    value        : any,
    isItem       : TestCallback | undefined = undefined,
    minLength    : number | undefined       = undefined,
    maxLength    : number | undefined       = undefined
) : string {
    return explainArrayOf<T>(
        itemTypeName,
        itemExplain,
        value,
        isItem,
        minLength,
        maxLength
    );
}

export type PermissionObject = {readonly [key: string]: boolean};

export class PermissionUtils {

    /**
     * Validate a permission against a list of permissions
     *
     * @param permission The permission to check for
     * @param acceptedPermissionList List of permissions that are accepted
     * @return `true` if `permission` is included in the `permissionList`
     */
    public static checkPermission<T extends string> (
        permission: PermissionString<T>,
        acceptedPermissionList: PermissionList<T>
    ) : boolean {
        return acceptedPermissionList.includes(permission);
    }

    /**
     * Checks against multiple permissions
     *
     * @param checkPermissions List of permissions that will be included in the return object
     * @param targetPermissions List of permissions the target has
     * @returns PermissionObject State of each permission from `checkPermissions`
     */
    public static checkPermissionList<T extends string> (
        checkPermissions: PermissionList<T>,
        targetPermissions: PermissionList<T>
    ) : PermissionObject {
        return reduce(
            checkPermissions,
            (result: PermissionObject, permission: PermissionString<T>) : PermissionObject => {
                return {
                    ...result,
                    [permission]: PermissionUtils.checkPermission(
                        permission,
                        targetPermissions
                    )
                };
            },
            {}
        );
    }

    /**
     * Verify permission object has all permissions enabled
     *
     * @param permissions
     * @returns boolean `true` if every permission in the `permissions` object matches
     */
    public static everyPermissionAccepted (permissions: PermissionObject) : boolean {
        const permissionCount = values(permissions).length;
        if (permissionCount === 0) return false;
        return everyValue<boolean>(permissions, (item: boolean) : boolean => item);
    }

    /**
     *
     * @param permissions
     * @param isPermission
     * @returns List of permissions that were enabled
     */
    public static getAcceptedPermissionList<T extends string = string> (
        permissions: PermissionObject,
        isPermission: TestCallbackNonStandard = isString
    ) : PermissionList<T> {
        return filter(
            values(permissions),
            (permission: string) : boolean => isPermission(permission)
        ) as unknown as PermissionList<T>;
    }

    /**
     * Verify permission object has some permissions enabled
     *
     * @param permissions
     * @returns boolean `true` if some permissions in the `permissions` object matches
     */
    public static somePermissionAccepted (permissions: PermissionObject) : boolean {
        const acceptedPermissions = this.getAcceptedPermissionList(permissions);
        return acceptedPermissions.length !== 0;
    }

}
