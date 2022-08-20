// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    everyValue,
    filter,
    keys,
    reduce,
    values
} from "./modules/lodash";

export type PermissionString = string;
export type PermissionList = readonly PermissionString[];
export type PermissionObject = {readonly [key: string]: boolean};

export class PermissionUtils {

    /**
     * Validate a permission against a list of permissions
     *
     * @param permission The permission to check for
     * @param acceptedPermissionList List of permissions that are accepted
     * @return `true` if `permission` is included in the `permissionList`
     */
    public static checkPermission (
        permission: PermissionString,
        acceptedPermissionList: PermissionList
    ) : boolean {
        return acceptedPermissionList.includes(permission);
    }

    /**
     * Checks against multiple permissions
     *
     * @param targetPermissions List of permissions the subject has
     * @param checkPermissions List of permissions that must be checked for
     */
    public static checkPermissionList (
        targetPermissions: PermissionList,
        checkPermissions: PermissionList
    ) : PermissionObject {
        return reduce(
            checkPermissions,
            (result: PermissionObject, permission: PermissionString) : PermissionObject => {
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
     * @returns List of permissions that were enabled
     */
    public static getAcceptedPermissionList (permissions: PermissionObject) : PermissionList {
        return filter(
            keys(permissions),
            (key: string) : boolean => permissions[key]
        )
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
