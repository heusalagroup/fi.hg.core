// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PermissionList, PermissionObject } from "../PermissionUtils";

export interface PermissionManager {

    /**
     * Fetch entity permissions
     *
     * @param entityId The entity ID
     * @returns Promise<PermissionList> Promise of permissions this entity has
     */
    getEntityPermissionList (entityId: string) : Promise<PermissionList>;

    /**
     * Check a list of permissions
     *
     * @param entityId The entity ID
     * @param acceptedPermissions List of permissions which the entity must have
     * @returns PermissionObject Object which contains boolean test results for each permission
     */
    checkEntityPermission (
        entityId: string,
        acceptedPermissions: PermissionList
    ) : Promise<PermissionObject>;

}
