// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { isWpPageStatus, parseWpPageStatus, WpPageStatus } from "./WpPageStatus";

describe('WpPageStatus', () => {

    describe('isWpPageStatus', () => {

        it('can test correct values', () => {
            expect( isWpPageStatus('publish') ).toBe(true);
            expect( isWpPageStatus('future') ).toBe(true);
            expect( isWpPageStatus('draft') ).toBe(true);
            expect( isWpPageStatus('pending') ).toBe(true);
            expect( isWpPageStatus('private') ).toBe(true);
        });

        it('can test invalid values', () => {
            expect( isWpPageStatus(null) ).toBe(false);
            expect( isWpPageStatus(undefined) ).toBe(false);
            expect( isWpPageStatus(123) ).toBe(false);
            expect( isWpPageStatus('') ).toBe(false);
            expect( isWpPageStatus(false) ).toBe(false);
            expect( isWpPageStatus(true) ).toBe(false);
            expect( isWpPageStatus('hello') ).toBe(false);
            expect( isWpPageStatus('PUBLISH') ).toBe(false);
            expect( isWpPageStatus('FUTURE') ).toBe(false);
            expect( isWpPageStatus('DRAFT') ).toBe(false);
            expect( isWpPageStatus('PENDING') ).toBe(false);
            expect( isWpPageStatus('PRIVATE') ).toBe(false);
        });

    });

    describe('parseWpPageStatus', () => {

        it('can parse correct values', () => {
            expect( parseWpPageStatus('publish') ).toBe(WpPageStatus.PUBLISH);
            expect( parseWpPageStatus('future') ).toBe(WpPageStatus.FUTURE);
            expect( parseWpPageStatus('draft') ).toBe(WpPageStatus.DRAFT);
            expect( parseWpPageStatus('pending') ).toBe(WpPageStatus.PENDING);
            expect( parseWpPageStatus('private') ).toBe(WpPageStatus.PRIVATE);
            expect( parseWpPageStatus('PUBLISH') ).toBe(WpPageStatus.PUBLISH);
            expect( parseWpPageStatus('FUTURE') ).toBe(WpPageStatus.FUTURE);
            expect( parseWpPageStatus('DRAFT') ).toBe(WpPageStatus.DRAFT);
            expect( parseWpPageStatus('PENDING') ).toBe(WpPageStatus.PENDING);
            expect( parseWpPageStatus('PRIVATE') ).toBe(WpPageStatus.PRIVATE);
        });

        it('can parse incorrect values as undefined', () => {
            expect( parseWpPageStatus('hello') ).toBeUndefined();
            expect( parseWpPageStatus('') ).toBeUndefined();
            expect( parseWpPageStatus('123') ).toBeUndefined();
            expect( parseWpPageStatus(123) ).toBeUndefined();
            expect( parseWpPageStatus(null) ).toBeUndefined();
            expect( parseWpPageStatus(undefined) ).toBeUndefined();
            expect( parseWpPageStatus(false) ).toBeUndefined();
            expect( parseWpPageStatus(true) ).toBeUndefined();
        });

    });

});
