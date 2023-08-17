// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { isReadonlyJsonObject, parseJson } from "./Json";

describe('Json', () => {

    describe('isReadonlyJsonObject', () => {

        it('can check empty object', () => {
            expect( isReadonlyJsonObject({}) ).toBe(true);
        });

        it('can check empty object from parsed JSON', () => {
            expect( isReadonlyJsonObject(parseJson('{}')) ).toBe(true);
        });

    });

    describe('parseJson', () => {

        it('can parse empty JSON object', () => {
            expect( parseJson('{}') ).toStrictEqual({});
        });

        it('cannot parse regular object', () => {
            expect( parseJson({}) ).toStrictEqual(undefined);
        });

    });

});
