// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PermissionManager } from "./types/PermissionManager";
import { LogService } from "./LogService";

const LOG = LogService.createLogger('PermissionService');

/**
 * Service which handles permissions
 */
export class PermissionService {

    private readonly _manager : PermissionManager;

    /**
     *
     * @param manager
     */
    public constructor (
        manager: PermissionManager
    ) {
        this._manager = manager;
    }

    /**
     *
     * @param entityId
     */
    public getPermissionListByEntityId (
        entityId: string
    ) : PermissionList {
        return this._manager.getPermissionListByEntityId(entityId);
    }

    /**
     * Returns `true` if `entityId` has every permission in the list
     *
     * @param entityId
     * @param permissionList
     */
    public hasPermission (
        entityId: string,
        permissionList: PermissionList
    ) : boolean {

        const entityPermissionList = this.getPermissionListByEntityId(entityId);



    }

}
