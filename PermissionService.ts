// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PermissionManager } from "./types/PermissionManager";
import { LogService } from "./LogService";
import { PermissionList, PermissionObject, PermissionUtils } from "./PermissionUtils";
import { keys } from "./modules/lodash";

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
     * Fetch entity permissions
     *
     * @param entityId
     * @returns Promise<PermissionList> Promise of a list of permissions this entity has
     */
    public async getEntityPermissionList ( entityId: string ) : Promise<PermissionList> {
        return await this._manager.getEntityPermissionList(entityId);
    }

    /**
     * Returns `true` if `entityId` has every permission in the list
     *
     * @param entityId Target entity
     * @param checkPermissions List of permissions which are accepted
     */
    public async checkEntityPermission (
        entityId: string,
        checkPermissions: PermissionList
    ) : Promise<PermissionObject> {
        LOG.debug(`checkEntityPermission: Checking entity "${entityId}" against permissions "${checkPermissions.join('|')}"`);
        const entityPermissions = await this.getEntityPermissionList(entityId);
        LOG.debug(`checkEntityPermission: Checking entity "${entityId}" [${entityPermissions.join('|')}] against permissions [${checkPermissions.join('|')}]`);
        const result = PermissionUtils.checkPermissionList(
            entityPermissions,
            checkPermissions
        );
        LOG.info(`checkEntityPermission: Checking entity "${entityId}" [${entityPermissions.join('|')}] against result [${checkPermissions.join('|')}]: `, result);
        return result;
    }

}
