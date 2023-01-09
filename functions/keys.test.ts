// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { keys } from './keys';

describe.skip('keys', () => {

    it('should return an array of keys for an array input', () => {
        const array = ['a', 'b', 'c'];
        const result = keys(array);
        expect(result).toEqual(['0', '1', '2']);
    });

    it('should return an array of keys for an object input', () => {
        const object = { a: 1, b: 2, c: 3 };
        const result = keys(object);
        expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should return an empty array for an invalid input', () => {
        const invalidInputs = [null, undefined, 1, 'string', () => {}];
        invalidInputs.forEach(input => {
            const result = keys(input);
            expect(result).toEqual([]);
        });
    });

    it.skip('should return only string keys when isKey is a function that returns true for strings', () => {
        const object = { a: 1, b: 2, c: 3, 1: 4 };
        const result = keys(object, key => typeof key === 'string');
        expect(result).toEqual(['a', 'b', 'c']);
    });

});
