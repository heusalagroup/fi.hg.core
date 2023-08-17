// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { isString } from "../types/String";
import { everyProperty } from "./everyProperty";

describe('everyProperty', () => {

    it('can check string object without value checker', () => {
        expect( everyProperty({'foo': 'bar'}, isString) ).toBe(true);
        expect( everyProperty({'foo': 123}, isString) ).toBe(true);
    });

    it('can check string object', () => {
        expect( everyProperty({'foo': 'bar'}, isString, isString) ).toBe(true);
    });

    it('can check string object with multiple properties', () => {
        expect( everyProperty({'foo': 'bar', 'hello': 'world'}, isString, isString) ).toBe(true);
    });

    it('can check non-string object', () => {
        expect( everyProperty({'foo': 123}, isString, isString) ).toBe(false);
    });

    it('can check non-string object with multiple properties', () => {
        expect( everyProperty({'hello': 'world', 'foo': 123}, isString, isString) ).toBe(false);
    });

    it('can check empty object', () => {
        expect( everyProperty({}, isString, isString) ).toBe(true);
    });

});
