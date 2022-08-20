// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { every } from "./modules/lodash";

export type PermissionString = string;
export type PermissionList = readonly PermissionString[];

export class PermissionUtils {

    /**
     * Validate a permission against a list of permissions
     *
     * @param permission The permission to check for
     * @param acceptedPermissionList List of permissions that are accepted
     * @return `true` if `permission` is included in the `permissionList`
     */
    public static hasPermission (
        permission: PermissionString,
        acceptedPermissionList: PermissionList
    ) : boolean {
        return acceptedPermissionList.includes(permission);
    }

    /**
     * Validate a list of permissions
     *
     * @param permissionList List of permissions to check for
     * @param acceptedPermissionList List of permissions that are accepted
     */
    public static hasEveryPermission (
        permissionList: PermissionList,
        acceptedPermissionList: PermissionList
    ) : boolean {
        return every(
            permissionList,
            (permission: PermissionString) : boolean => PermissionUtils.hasPermission(permission, acceptedPermissionList)
        );
    }

}
