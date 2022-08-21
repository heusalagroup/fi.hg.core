// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PermissionList, PermissionObject } from "../PermissionUtils";

export interface PermissionManager<T extends string = string> {

    /**
     * Fetch permissions against a target entity
     *
     * @param entityId The entity who is performing the action
     * @param targetId The entity which is the target of the action
     * @returns Promise<PermissionList> Promise of permissions this entity has
     */
    getEntityPermissionList (
        entityId    : string,
        targetId   ?: string
    ) : Promise<PermissionList<T>>;

    /**
     * Check a list of permissions
     *
     * @param checkPermissions List of permissions which the entity must have
     * @param entityId The entity who is performing the action
     * @param targetId The entity which is the target of the action
     * @returns PermissionObject Object which contains boolean test results for each permission
     */
    checkEntityPermission (
        checkPermissions: PermissionList<T>,
        entityId    : string,
        targetId   ?: string
    ) : Promise<PermissionObject>;

}
