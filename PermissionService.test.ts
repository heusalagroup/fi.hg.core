// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PermissionService } from "./PermissionService";
import { PermissionManager } from "./types/PermissionManager";
import { PermissionList, PermissionObject, PermissionUtils } from "./PermissionUtils";

class MockPermissionManager implements PermissionManager {

    private _entityId : string;
    private _entityPermissions : PermissionList;

    public constructor (
        entityId: string,
        entityPermissions : PermissionList
    ) {
        this._entityId = entityId;
        this._entityPermissions = entityPermissions;
    }

    public setState (
        id: string,
        entityPermissions: PermissionList
    ) {
        this._entityId = id;
        this._entityPermissions = entityPermissions;
    }

    public checkEntityPermission (
        entityId: string,
        acceptedPermissions: PermissionList
    ): Promise<PermissionObject> {
        const entityPermissions = (this._entityId !== entityId) ? [] : this._entityPermissions;
        return Promise.resolve(
            PermissionUtils.checkPermissionList(
                entityPermissions,
                acceptedPermissions
            )
        );
    }

    public getEntityPermissionList (entityId: string): Promise<PermissionList> {
        if (this._entityId !== entityId) return Promise.resolve([]);
        return Promise.resolve(this._entityPermissions);
    }

}

describe('PermissionService', () => {

    describe('#constructor', () => {

        test('can create service', () => {
            const manager = new MockPermissionManager('123', []);
            const service = new PermissionService(manager);
            expect( service ).toBeDefined();
        });

    });

    describe('#getEntityPermissionList', () => {

        test('can fetch entity permission list', async () => {
            const entityId = '123';
            const manager = new MockPermissionManager(entityId, ['FOO', 'BAR']);
            const service = new PermissionService(manager);
            const result = await service.getEntityPermissionList(entityId);
            expect( result ).toStrictEqual(['FOO', 'BAR']);
        });

    });

    describe('#checkEntityPermission', () => {

        test('can check entity permission list', async () => {
            const entityId = '123';
            const manager = new MockPermissionManager(entityId, ['FOO', 'BAR']);
            const service = new PermissionService(manager);
            const result = await service.checkEntityPermission(entityId, ['FOO']);
            expect( result ).toStrictEqual({FOO: true});
        });

        test('can check invalid entity permission list', async () => {
            const entityId = '123';
            const manager = new MockPermissionManager(entityId, ['FOO', 'BAR']);
            const service = new PermissionService(manager);
            const result = await service.checkEntityPermission(entityId, ['HELLO']);
            expect( result ).toStrictEqual({HELLO: false});
        });

        test('can check partial entity permission list', async () => {
            const entityId = '123';
            const manager = new MockPermissionManager(entityId, ['FOO', 'BAR']);
            const service = new PermissionService(manager);
            const result = await service.checkEntityPermission(entityId, ['HELLO', 'FOO']);
            expect( result ).toStrictEqual({HELLO: false, FOO: true});
        });

        test('can check on empty entity permission list', async () => {
            const entityId = '123';
            const manager = new MockPermissionManager(entityId, []);
            const service = new PermissionService(manager);
            const result = await service.checkEntityPermission(entityId, ['HELLO', 'FOO']);
            expect( result ).toStrictEqual({HELLO: false, FOO: false});
        });

        test('can check wrong entity permission list', async () => {
            const entityId = '123';
            const manager = new MockPermissionManager(entityId, ['FOO', 'BAR']);
            const service = new PermissionService(manager);
            const result = await service.checkEntityPermission('567', ['HELLO', 'FOO']);
            expect( result ).toStrictEqual({HELLO: false, FOO: false});
        });

    });

});
