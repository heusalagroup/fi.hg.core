// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PermissionUtils } from "./PermissionUtils";

describe('PermissionUtils', () => {

    describe('#checkPermission', () => {

        test('can test valid permission with single item', () => {
            expect( PermissionUtils.checkPermission('FOO', ['FOO']) ).toBe(true);
        });

        test('can test valid permission with multiple items', () => {
            expect( PermissionUtils.checkPermission('FOO', ['BAR', 'FOO']) ).toBe(true);
            expect( PermissionUtils.checkPermission('FOO', ['BAR', 'FOO', 'HELLO']) ).toBe(true);
            expect( PermissionUtils.checkPermission('FOO', ['WORLD', 'BAR', 'FOO']) ).toBe(true);
            expect( PermissionUtils.checkPermission('FOO', ['FOO', 'HELLO', 'WORLD']) ).toBe(true);
        });

        test('can test invalid permission when permission list is empty', () => {
            expect( PermissionUtils.checkPermission('FOO', []) ).toBe(false);
        });

        test('can test invalid permission when permission list has incorrect type', () => {
            expect( PermissionUtils.checkPermission('FOO', ['BAR']) ).toBe(false);
        });

        test('can test invalid permission when permission list has multiple types', () => {
            expect( PermissionUtils.checkPermission('FOO', ['BAR', 'HELLO', 'WORLD']) ).toBe(false);
        });

    });

    describe('#checkPermissionList', () => {

        test('can test invalid permission list when no permissions are accepted', () => {
            expect( PermissionUtils.checkPermissionList([], ['FOO']) ).toStrictEqual({});
        });

        test('can test empty invalid permission list when no permissions are accepted', () => {
            expect( PermissionUtils.checkPermissionList(
                [], []) ).toStrictEqual({});
        });

        test('can test empty invalid permission list when one permission is accepted', () => {
            expect( PermissionUtils.checkPermissionList(
                ['BAR'], []) ).toStrictEqual({BAR: false});
        });

        test('can test empty invalid permission list when some permissions are accepted', () => {
            expect( PermissionUtils.checkPermissionList(
                ['BAR', 'FOO'], []) ).toStrictEqual({BAR: false, FOO: false});
        });

        test('can test valid permission list with single permission', () => {
            expect( PermissionUtils.checkPermissionList(
                ['FOO', 'BAR'], ['FOO']) ).toStrictEqual({FOO: true, BAR: false});
        });

        test('can test valid permission list with two permissions', () => {
            expect( PermissionUtils.checkPermissionList(
                ['FOO', 'BAR'], ['FOO', 'BAR']) ).toStrictEqual({FOO: true, BAR: true});
        });

        test('can test valid permission list with two permissions against single accepted permission', () => {
            expect( PermissionUtils.checkPermissionList(
                ['FOO'], ['FOO', 'BAR']) ).toStrictEqual({FOO:true});
        });

        test('can test valid permission list with multiple permissions', () => {
            expect( PermissionUtils.checkPermissionList(
                ['FOO', 'BAR', 'HELLO'], ['FOO', 'BAR', 'HELLO']) ).toStrictEqual({FOO: true, BAR: true, HELLO: true});
        });

        test('can test invalid permission list with single permission', () => {
            expect( PermissionUtils.checkPermissionList(
                ['HELLO', 'WORLD'], ['FOO']) ).toStrictEqual({HELLO: false, WORLD: false});
        });

        test('can test invalid permission list with two permissions', () => {
            expect( PermissionUtils.checkPermissionList(
                ['HELLO', 'WORLD'], ['FOO', 'BAR']) ).toStrictEqual({HELLO: false, WORLD: false});
        });

        test('can test invalid permission list with multiple permissions when only some match', () => {
            expect( PermissionUtils.checkPermissionList(
                ['HELLO', 'WORLD', 'XXX'], ['FOO', 'BAR', 'HELLO']) ).toStrictEqual({HELLO: true, WORLD: false, XXX: false});
        });

    });

    describe('#everyPermissionAccepted', () => {

        test('can test that no permission matches on zero permission object', () => {
            expect( PermissionUtils.everyPermissionAccepted({}) ).toStrictEqual(false);
        });

        test('can test that no permission matches on single false permission', () => {
            expect( PermissionUtils.everyPermissionAccepted({FOO: false}) ).toStrictEqual(false);
        });

        test('can test that no permission matches on partially matched permissions', () => {
            expect( PermissionUtils.everyPermissionAccepted({FOO: false, BAR: true}) ).toStrictEqual(false);
        });

        test('can test that no permission matches on partially matched with three permissions', () => {
            expect( PermissionUtils.everyPermissionAccepted({FOO: true, BAR: false, HELLO: true}) ).toStrictEqual(false);
        });


        test('can test that every permission matches on on permission', () => {
            expect( PermissionUtils.everyPermissionAccepted({FOO: true}) ).toStrictEqual(true);
        });

        test('can test that every permission matches on two permissions', () => {
            expect( PermissionUtils.everyPermissionAccepted({FOO: true, BAR: true}) ).toStrictEqual(true);
        });

        test('can test that every permission matches on three permissions', () => {
            expect( PermissionUtils.everyPermissionAccepted({FOO: true, BAR: true, HELLO: true}) ).toStrictEqual(true);
        });

    });

    describe('#getAcceptedPermissionList', () => {

        test('it returns accepted permissions', () => {
            expect( PermissionUtils.getAcceptedPermissionList({})).toStrictEqual([]);
            expect( PermissionUtils.getAcceptedPermissionList({FOO: false})).toStrictEqual([]);
            expect( PermissionUtils.getAcceptedPermissionList({FOO: false, BAR: false})).toStrictEqual([]);
            expect( PermissionUtils.getAcceptedPermissionList({FOO: false, BAR: false, WORLD: false})).toStrictEqual([]);
            expect( PermissionUtils.getAcceptedPermissionList({FOO: true})).toStrictEqual(["FOO"]);
            expect( PermissionUtils.getAcceptedPermissionList({FOO: true, BAR: false})).toStrictEqual(["FOO"]);
            expect( PermissionUtils.getAcceptedPermissionList({FOO: true, BAR: true})).toStrictEqual(["FOO", "BAR"]);
            expect( PermissionUtils.getAcceptedPermissionList({FOO: false, BAR: true})).toStrictEqual(["BAR"]);
            expect( PermissionUtils.getAcceptedPermissionList({FOO: true, HELLO: false, BAR: true})).toStrictEqual(["FOO", "BAR"]);
            expect( PermissionUtils.getAcceptedPermissionList({FOO: true, HELLO: true, BAR: true})).toStrictEqual(["FOO", "HELLO", "BAR"]);
        });

    });

    describe('#somePermissionAccepted', () => {

        test('can test that no permission matches on zero permission object', () => {
            expect( PermissionUtils.somePermissionAccepted({}) ).toStrictEqual(false);
        });

        test('can test that no permission matches on single false permission', () => {
            expect( PermissionUtils.somePermissionAccepted({FOO: false}) ).toStrictEqual(false);
        });

        test('can test that permission matches on partially matched permissions', () => {
            expect( PermissionUtils.somePermissionAccepted({FOO: false, BAR: true}) ).toStrictEqual(true);
        });

        test('can test that permission matches on partially matched with three permissions', () => {
            expect( PermissionUtils.somePermissionAccepted({FOO: true, BAR: false, HELLO: true}) ).toStrictEqual(true);
        });


        test('can test that permission matches on single permission', () => {
            expect( PermissionUtils.somePermissionAccepted({FOO: true}) ).toStrictEqual(true);
        });

        test('can test that every permission matches on two permissions', () => {
            expect( PermissionUtils.somePermissionAccepted({FOO: true, BAR: true}) ).toStrictEqual(true);
        });

        test('can test that every permission matches on three permissions', () => {
            expect( PermissionUtils.somePermissionAccepted({FOO: true, BAR: true, HELLO: true}) ).toStrictEqual(true);
        });


    });

});
