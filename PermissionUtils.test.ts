// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PermissionUtils } from "./PermissionUtils";

describe('PermissionUtils', () => {

    describe('#hasPermission', () => {

        test('can test valid permission', () => {
            expect( PermissionUtils.hasPermission('FOO', ['FOO']) ).toBe(true);
        });

        test('can test invalid permission when permission list is empty', () => {
            expect( PermissionUtils.hasPermission('FOO', []) ).toBe(false);
        });

    });

});
