// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PermissionManager } from "./types/PermissionManager";
import { LogService } from "./LogService";
import { PermissionList, PermissionObject, PermissionUtils } from "./PermissionUtils";
import { LogLevel } from "./types/LogLevel";

const LOG = LogService.createLogger('PermissionService');

/**
 * Service which handles permissions
 */
export class PermissionService<T extends string = string> {

    public static setLogLevel (value : LogLevel) {
        LOG.setLogLevel(value);
    }

    private readonly _manager : PermissionManager<T>;

    /**
     *
     * @param manager
     */
    public constructor (
        manager: PermissionManager<T>
    ) {
        this._manager = manager;
    }

    /**
     * Fetch entity permissions
     *
     * @param entityId The entity who is performing the action
     * @param targetId The entity which is the target of the action
     * @returns Promise<PermissionList> Promise of a list of permissions this entity has against `targetId`
     */
    public async getEntityPermissionList (
        entityId    : string,
        targetId   ?: string
    ) : Promise<PermissionList<T>> {
        return await this._manager.getEntityPermissionList(entityId, targetId);
    }

    /**
     * Check permissions in the list
     *
     * @param checkPermissions List of permissions which are checked
     * @param entityId Entity who is performing the action
     * @param targetId The entity which is the target of the action
     */
    public async checkEntityPermission (
        checkPermissions: PermissionList<T>,
        entityId: string,
        targetId   ?: string
    ) : Promise<PermissionObject> {
        LOG.debug(`checkEntityPermission: Checking entity "${entityId}" against permissions "${checkPermissions.join('|')}"`);
        const entityPermissions = await this.getEntityPermissionList(entityId, targetId);
        LOG.debug(`checkEntityPermission: Checking entity "${entityId}" [${entityPermissions.join('|')}] against permissions [${checkPermissions.join('|')}]`);
        const result = PermissionUtils.checkPermissionList(
            checkPermissions,
            entityPermissions
        );
        LOG.info(`checkEntityPermission: Checking entity "${entityId}" [${entityPermissions.join('|')}] against result [${checkPermissions.join('|')}]: `, result);
        return result;
    }

}
