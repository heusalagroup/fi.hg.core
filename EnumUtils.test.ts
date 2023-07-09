// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EnumUtils } from './EnumUtils';

enum TestType {
    KEY0 = "0value",
    KEY1 = "1value",
    KEY = "value",
    ANOTHER_KEY = "anotherValue",
}

enum NumericTestType {
    KEY0 = 0,
    KEY1 = 1,
    KEY = 2,
    ANOTHER_KEY = 3,
}

describe('EnumUtils', () => {

    describe('getKeyValuePairs', () => {

        it('should return key-value pairs for string based enum', () => {
            const expected = [
                ["KEY0", "0value"],
                ["KEY1", "1value"],
                ["KEY", "value"],
                ["ANOTHER_KEY", "anotherValue"],
            ];
            expect(EnumUtils.getKeyValuePairs(TestType)).toStrictEqual(expected);
        });

        it('should return key-value pairs for numeric enum', () => {
            const expected = [
                ["KEY0", 0],
                ["KEY1", 1],
                ["KEY", 2],
                ["ANOTHER_KEY", 3],
            ];
            expect(EnumUtils.getKeyValuePairs(NumericTestType)).toStrictEqual(expected);
        });

    });

    describe('getValues', () => {

        it('should return values for string based enum', () => {
            const expected = ["0value", "1value", "value", "anotherValue"];
            expect(EnumUtils.getValues(TestType)).toStrictEqual(expected);
        });

        it('should return values for numeric enum', () => {
            const expected = [0, 1, 2, 3];
            expect(EnumUtils.getValues(NumericTestType)).toStrictEqual(expected);
        });

    });

    describe('getKeys', () => {

        it('should return keys for string based enum', () => {
            const expected = ["KEY0", "KEY1", "KEY", "ANOTHER_KEY"];
            expect(EnumUtils.getKeys(TestType)).toStrictEqual(expected);
        });

        it('should return keys for numeric enum', () => {
            const expected = ["KEY0", "KEY1", "KEY", "ANOTHER_KEY"];
            expect(EnumUtils.getKeys(NumericTestType)).toStrictEqual(expected);
        });

    });

    describe('createFilteredKeysFromValues', () => {

        it('should return keys corresponding to provided string values', () => {
            const values = ["0value", "1value"];
            const expected = ["KEY0", "KEY1"];
            expect(EnumUtils.createFilteredKeysFromValues(TestType, values)).toStrictEqual(expected);
        });

        it('should return keys corresponding to provided numeric values', () => {
            const values : readonly number[] = [0, 1];
            const expected = ["KEY0", "KEY1"];
            expect(EnumUtils.createFilteredKeysFromValues(NumericTestType, values)).toStrictEqual(expected);
        });

    });

});
