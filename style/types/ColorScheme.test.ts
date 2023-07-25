// Copyright (c) 2021-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {ColorScheme, isColorScheme, parseColorScheme, stringifyColorScheme} from "./ColorScheme";

describe('ColorScheme', () => {

    describe('isColorScheme', () => {

        test('returns true for correct values', () => {
            expect( isColorScheme(ColorScheme.DARK) ).toBe(true);
            expect( isColorScheme(ColorScheme.LIGHT) ).toBe(true);
        });

        test('returns false for incorrect values', () => {
            expect( isColorScheme("DARK") ).toBe(false);
            expect( isColorScheme("LIGHT") ).toBe(false);
            expect( isColorScheme(-1) ).toBe(false);
            expect( isColorScheme(999) ).toBe(false);
            expect( isColorScheme(undefined) ).toBe(false);
            expect( isColorScheme(null) ).toBe(false);
            expect( isColorScheme(false) ).toBe(false);
            expect( isColorScheme(true) ).toBe(false);
            expect( isColorScheme({}) ).toBe(false);
            expect( isColorScheme([]) ).toBe(false);
            expect( isColorScheme(NaN) ).toBe(false);
        });

    });

    describe('parseColorScheme', () => {

        test('can pass through ColorScheme types', () => {
            expect( parseColorScheme(ColorScheme.DARK) ).toBe(ColorScheme.DARK);
            expect( parseColorScheme(ColorScheme.LIGHT) ).toBe(ColorScheme.LIGHT);
        });

        test('can parse uppercase strings', () => {
            expect( parseColorScheme("DARK") ).toBe(ColorScheme.DARK);
            expect( parseColorScheme("LIGHT") ).toBe(ColorScheme.LIGHT);
        });

        test('can parse lowercase strings', () => {
            expect( parseColorScheme("dark") ).toBe(ColorScheme.DARK);
            expect( parseColorScheme("light") ).toBe(ColorScheme.LIGHT);
        });

        test('returns undefined for unknown values', () => {
            expect( parseColorScheme("foo") ).toBe(undefined);
            expect( parseColorScheme("") ).toBe(undefined);
            expect( parseColorScheme(undefined) ).toBe(undefined);
            expect( parseColorScheme(null) ).toBe(undefined);
            expect( parseColorScheme(NaN) ).toBe(undefined);
            expect( parseColorScheme(false) ).toBe(undefined);
            expect( parseColorScheme(true) ).toBe(undefined);
            expect( parseColorScheme({}) ).toBe(undefined);
            expect( parseColorScheme([]) ).toBe(undefined);
        });

    });

    describe('stringifyColorScheme', () => {

        test('can stringify DARK', () => {
            expect( stringifyColorScheme(ColorScheme.DARK) ).toBe('DARK');
        });

        test('can stringify LIGHT', () => {
            expect( stringifyColorScheme(ColorScheme.LIGHT) ).toBe('LIGHT');
        });

        test('can stringify undefined numbers', () => {
            // @ts-ignore
            expect( stringifyColorScheme(999) ).toBe('ColorScheme(999)');
        });

    });

});
