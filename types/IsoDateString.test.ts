// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createIsoDateString, isIsoDateString, IsoDateString, parseIsoDateString } from "./IsoDateString";

describe('IsoDateString', () => {

    describe('#createIsoDateString', () => {

        it('can create iso date string', () => {
            expect( createIsoDateString('2023-04-23T10:51:32.000Z') ).toBe('2023-04-23T10:51:32.000Z');
            expect( createIsoDateString(new Date('2023-04-23T10:51:32.000Z')) ).toBe('2023-04-23T10:51:32.000Z');
        });

        it('cannot create invalid values', () => {
            expect( () => createIsoDateString('2023-04-99T10:51:32.000Z') ).toThrow(``);
            expect( () => createIsoDateString('') ).toThrow(``);
            expect( () => createIsoDateString('hello world') ).toThrow(``);
            expect( () => createIsoDateString(new Date('2023-04-99T10:51:32.000Z')) ).toThrow(``);
        });

    });

    describe('#parseIsoDateString', () => {

        it('can parse valid values', () => {
            expect( parseIsoDateString('2023-04-23T10:51:32.000Z') ).toBe('2023-04-23T10:51:32.000Z');
            expect( parseIsoDateString(new Date('2023-04-23T10:51:32.000Z')) ).toBe('2023-04-23T10:51:32.000Z');
            expect( parseIsoDateString(1682247092000) ).toBe('2023-04-23T10:51:32.000Z');
        });

        it('can parse invalid values', () => {
            expect( parseIsoDateString('2023-04-99T10:51:32.000Z') ).toBeUndefined();
            expect( parseIsoDateString('') ).toBeUndefined();
            expect( parseIsoDateString(undefined) ).toBeUndefined();
            expect( parseIsoDateString(false) ).toBeUndefined();
            expect( parseIsoDateString(true) ).toBeUndefined();
            expect( parseIsoDateString(null) ).toBeUndefined();
            expect( parseIsoDateString([null]) ).toBeUndefined();
            expect( parseIsoDateString([]) ).toBeUndefined();
            expect( parseIsoDateString({}) ).toBeUndefined();
            expect( parseIsoDateString({hello: 'world'}) ).toBeUndefined();
            expect( parseIsoDateString([1, 2, 3]) ).toBeUndefined();
            expect( parseIsoDateString('hello world') ).toBeUndefined();
            expect( parseIsoDateString(new Date('2023-04-99T10:51:32.000Z')) ).toBeUndefined();
        });

    });

    describe('#isIsoDateString', () => {

        it('can detect valid values', () => {
            expect( isIsoDateString('2023-04-23T10:51:32.000Z') ).toBe(true);
        });

        it('can detect invalid values', () => {
            expect( isIsoDateString(new Date('2023-04-23T10:51:32.000Z')) ).toBe(false);
            expect( isIsoDateString('2023-04-99T10:51:32.000Z') ).toBe(false);
            expect( isIsoDateString('') ).toBe(false);
            expect( isIsoDateString(false) ).toBe(false);
            expect( isIsoDateString(true) ).toBe(false);
            expect( isIsoDateString(null) ).toBe(false);
            expect( isIsoDateString([null]) ).toBe(false);
            expect( isIsoDateString([]) ).toBe(false);
            expect( isIsoDateString({}) ).toBe(false);
            expect( isIsoDateString({hello: 'world'}) ).toBe(false);
            expect( isIsoDateString([1, 2, 3]) ).toBe(false);
            expect( isIsoDateString('hello world') ).toBe(false);
            expect( isIsoDateString(new Date('2023-04-99T10:51:32.000Z')) ).toBe(false);
        });

    });

});
