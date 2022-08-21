// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PermissionManager } from "../types/PermissionManager";
import { PermissionList, PermissionObject, PermissionUtils } from "../PermissionUtils";

/**
 * Permission manager intended to be used in tests
 */
export class MockPermissionManager<T extends string = string> implements PermissionManager<T> {

    private _entityId: string;
    private _targetId: string | undefined;
    private _entityPermissions: PermissionList<T>;

    public constructor (
        entityId: string,
        targetId: string | undefined,
        entityPermissions: PermissionList<T>
    ) {
        this._entityId = entityId;
        this._targetId = targetId;
        this._entityPermissions = entityPermissions;
    }

    public setState (
        id: string,
        targetId: string | undefined,
        entityPermissions: PermissionList<T>
    ) {
        this._entityId = id;
        this._targetId = targetId;
        this._entityPermissions = entityPermissions;
    }

    public async getEntityPermissionList (
        entityId: string,
        targetId ?: string
    ): Promise<PermissionList<T>> {
        return this._entityId === entityId && this._targetId === targetId ? this._entityPermissions : [];
    }

    public async checkEntityPermission (
        checkPermissions: PermissionList<T>,
        entityId: string,
        targetId ?: string
    ): Promise<PermissionObject> {
        const entityPermissions = await this.getEntityPermissionList(entityId, targetId);
        return PermissionUtils.checkPermissionList(
            checkPermissions,
            entityPermissions
        );
    }

}
