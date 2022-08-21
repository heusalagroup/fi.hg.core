// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PermissionService } from "./PermissionService";
import { LogLevel } from "./types/LogLevel";
import { MockPermissionManager } from "./mocks/MockPermissionManager";

PermissionService.setLogLevel(LogLevel.WARN);

describe('PermissionService', () => {

    const entityId = '123';
    const anotherEntityId = '567';
    const targetId = '1000';

    describe('#constructor', () => {

        test('can create service', () => {
            const manager = new MockPermissionManager<string>(entityId, targetId, []);
            const service = new PermissionService(manager);
            expect( service ).toBeDefined();
        });

    });

    describe('#getEntityPermissionList', () => {

        test('can fetch entity permission list', async () => {
            const manager = new MockPermissionManager<string>(entityId, targetId, ['FOO', 'BAR']);
            const service = new PermissionService(manager);
            const result = await service.getEntityPermissionList(entityId, targetId);
            expect( result ).toStrictEqual(['FOO', 'BAR']);
        });

        test('can fetch entity permission list for wrong item', async () => {
            const manager = new MockPermissionManager<string>(entityId, targetId, ['FOO', 'BAR']);
            const service = new PermissionService(manager);
            const result = await service.getEntityPermissionList(entityId, anotherEntityId);
            expect( result ).toStrictEqual([]);
        });

        test('can fetch entity permission list for undefined target', async () => {
            const manager = new MockPermissionManager<string>(entityId, undefined, ['FOO', 'BAR']);
            const service = new PermissionService(manager);
            const result = await service.getEntityPermissionList(entityId);
            expect( result ).toStrictEqual(['FOO', 'BAR']);
        });

    });

    describe('#checkEntityPermission', () => {

        test('can check entity permission list', async () => {
            const manager = new MockPermissionManager<string>(entityId, targetId, ['FOO', 'BAR']);
            const service = new PermissionService(manager);
            const result = await service.checkEntityPermission(['FOO'], entityId, targetId);
            expect( result ).toStrictEqual({FOO: true});
        });

        test('can check invalid entity permission list', async () => {
            const manager = new MockPermissionManager<string>(entityId, targetId, ['FOO', 'BAR']);
            const service = new PermissionService(manager);
            const result = await service.checkEntityPermission(['HELLO'], entityId, targetId);
            expect( result ).toStrictEqual({HELLO: false});
        });

        test('can check partial entity permission list', async () => {
            const manager = new MockPermissionManager<string>(entityId, targetId, ['FOO', 'BAR']);
            const service = new PermissionService(manager);
            const result = await service.checkEntityPermission(['HELLO', 'FOO'], entityId, targetId);
            expect( result ).toStrictEqual({HELLO: false, FOO: true});
        });

        test('can check on empty entity permission list', async () => {
            const manager = new MockPermissionManager<string>(entityId, targetId, []);
            const service = new PermissionService(manager);
            const result = await service.checkEntityPermission(['HELLO', 'FOO'], entityId, targetId);
            expect( result ).toStrictEqual({HELLO: false, FOO: false});
        });

        test('can check wrong entity permission list', async () => {
            const manager = new MockPermissionManager<string>(entityId, targetId, ['FOO', 'BAR']);
            const service = new PermissionService(manager);
            const result = await service.checkEntityPermission(['HELLO', 'FOO'], anotherEntityId, targetId);
            expect( result ).toStrictEqual({HELLO: false, FOO: false});
        });

    });

});
