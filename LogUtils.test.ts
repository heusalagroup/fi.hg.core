// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { LogUtils } from "./LogUtils";
import "../jest/matchers";

describe('LogUtils', () => {

    describe('#stringifyArray', () => {

        it('returns empty string when given an empty array', () => {
            expect(LogUtils.stringifyArray([])).toEqual('');
        });

        it('converts an array of primitive types to a string', () => {
            expect(LogUtils.stringifyArray([1, 'two', true])).toEqual('1 two true');
        });

        it('converts an array of objects to a string', () => {
            expect(LogUtils.stringifyArray([{ name: 'John' }, { name: 'Jane' }])).toEqual('{"name":"John"} {"name":"Jane"}');
        });

        it('converts an array of mixed types to a string', () => {
            expect(LogUtils.stringifyArray([1, 'two', { name: 'John' }, true])).toEqual('1 two {"name":"John"} true');
        });

    });

    describe('#stringifyValue', () => {

        it('converts a string to a string', () => {
            expect(LogUtils.stringifyValue('hello')).toEqual('hello');
        });

        it('converts a number to a string', () => {
            expect(LogUtils.stringifyValue(42)).toEqual('42');
        });

        it('converts a boolean to a string', () => {
            expect(LogUtils.stringifyValue(true)).toEqual('true');
            expect(LogUtils.stringifyValue(false)).toEqual('false');
        });

        it('converts an object to a string', () => {
            expect(LogUtils.stringifyValue({ name: 'John' })).toEqual('{"name":"John"}');
        });

        it('converts undefined to the string "undefined"', () => {
            expect(LogUtils.stringifyValue(undefined)).toEqual('undefined');
        });

        it('converts null to the string "null"', () => {
            expect(LogUtils.stringifyValue(null)).toEqual('null');
        });

        it('returns the value as a string when it cannot be JSON.stringify\'d', () => {
            const value = { toString: () => 'custom object' };
            expect(LogUtils.stringifyValue(value)).toEqual('custom object');
        });

        it('prefers toString() over toJSON() for custom objects', () => {
            const value = { toString: () => 'custom text', toJSON: () => 'custom json' };
            expect(LogUtils.stringifyValue(value)).toEqual('custom text');
        });

        it('returns a string for a Date object', () => {
            const date = new Date(Date.UTC(2023, 4, 9, 9, 30, 0, 0));
            const result = LogUtils.stringifyValue(date);
            expect(result).toBe('2023-05-09T09:30:00.000Z');
        });

    });

    describe('#splitStringValue', () => {

        it('can split long string to five rows', () => {
            const rows = LogUtils.splitStringValue(
                '1234567890abcdefghj\n',
                10,
                '>>>',
                '...\n'
            );
            expect(rows).toBeArray();
            expect(rows[0]).toBe('123456...\n');
            expect(rows[1]).toBe('>>>789...\n');
            expect(rows[2]).toBe('>>>0ab...\n');
            expect(rows[3]).toBe('>>>cde...\n');
            expect(rows[4]).toBe('>>>fghj\n');
            expect(rows.length).toBe(5);
        });


        it('can split long string to four rows 1', () => {
            const rows = LogUtils.splitStringValue(
                '1234567890abcdefgh\n',
                10,
                '>>>',
                '...\n'
            );
            expect(rows).toBeArray();
            expect(rows[0]).toBe('123456...\n');
            expect(rows[1]).toBe('>>>789...\n');
            expect(rows[2]).toBe('>>>0ab...\n');
            expect(rows[3]).toBe('>>>cdefgh\n');
            expect(rows.length).toBe(4);
        });

        it('can split long string four rows 2', () => {
            const rows = LogUtils.splitStringValue(
                '1234567890abcdefg\n',
                10,
                '>>>',
                '...\n'
            );
            expect(rows).toBeArray();
            expect(rows[0]).toBe('123456...\n');
            expect(rows[1]).toBe('>>>789...\n');
            expect(rows[2]).toBe('>>>0ab...\n');
            expect(rows[3]).toBe('>>>cdefg\n');
            expect(rows.length).toBe(4);
        });

        it('can split long string to four rows 3', () => {
            const rows = LogUtils.splitStringValue(
                '1234567890abcdef\n',
                10,
                '>>>',
                '...\n'
            );
            expect(rows).toBeArray();
            expect(rows[0]).toBe('123456...\n');
            expect(rows[1]).toBe('>>>789...\n');
            expect(rows[2]).toBe('>>>0ab...\n');
            expect(rows[3]).toBe('>>>cdef\n');
            expect(rows.length).toBe(4);
        });

        it('can split long string to two rows', () => {
            const rows = LogUtils.splitStringValue(
                '1234567890\n',
                10,
                '>>>',
                '...\n'
            );
            expect(rows).toBeArray();
            expect(rows[0]).toBe('123456...\n');
            expect(rows[1]).toBe('>>>7890\n');
            expect(rows.length).toBe(2);
        });

        it('can split long string to one row 1', () => {
            const rows = LogUtils.splitStringValue(
                '123456789\n',
                10,
                '>>>',
                '...\n'
            );
            expect(rows).toBeArray();
            expect(rows[0]).toBe('123456789\n');
            expect(rows.length).toBe(1);
        });

        it('can split long string to one row 1', () => {
            const rows = LogUtils.splitStringValue(
                '12345\n',
                10,
                '>>>',
                '...\n'
            );
            expect(rows).toBeArray();
            expect(rows[0]).toBe('12345\n');
            expect(rows.length).toBe(1);
        });

        it('can split short strings 1', () => {
            const rows = LogUtils.splitStringValue(
                '12345\n',
                5,
                '> ',
                '<\n'
            );
            expect(rows).toBeArray();
            expect(rows[0]).toBe('123<\n');
            expect(rows[1]).toBe('> 45\n');
            expect(rows.length).toBe(2);
        });

        it('cannot split too short rows', () => {
            expect( () => LogUtils.splitStringValue(
                '12345\n',
                4,
                '> ',
                '<\n'
            ) ).toThrow(new TypeError(`Max size to splitStringValue() must be greater than the length of prefix and suffix (4 < 4)`));
        });

    });

    describe('#splitStringArray', () => {

        let maxSize: number;
        let prefix: string;
        let suffix: string;
        let linebreak: string;

        beforeEach(() => {
            maxSize = 20;
            prefix = '>>>';
            suffix = '...\n';
            linebreak = '\n';
        });

        it('splits an array of strings into chunks of maximum length', () => {
            const input = [
                'This is a long sentence that will be split.',
                'Another long sentence that will be split as well.'
            ];
            const result = LogUtils.splitStringArray(input, maxSize, prefix, suffix, linebreak);
            expect(result).toStrictEqual(
                [
                    'This is a long s...',
                    '>>>entence that ...',
                    '>>>will be split.',
                    'Another long sen...',
                    '>>>tence that wi...',
                    '>>>ll be split a...',
                    '>>>s well.'
                ]
            );
        });

        it('handles an empty input array', () => {
            const input: string[] = [];
            const result = LogUtils.splitStringArray(input, maxSize, prefix, suffix, linebreak);
            expect(result).toStrictEqual([]);
        });

        it('handles an array of short strings', () => {
            const input = [
                'Short string.',
                'Another short word.' // Notice: this is exactly 19 characters. It should not be split.
            ];
            const result = LogUtils.splitStringArray(input, maxSize, prefix, suffix, linebreak);
            expect(result).toStrictEqual(
                [
                    'Short string.',
                    'Another short word.'
                ]
            );
        });

        it('handles an array of mixed length strings', () => {
            const input = [
                'Short string.',
                'This is a long sentence that will be split.',
                'Short string.',
                'Another long sentence that will be split as well.'
            ];
            const result = LogUtils.splitStringArray(input, maxSize, prefix, suffix, linebreak);
            expect(result).toStrictEqual(
                [
                    'Short string.',
                    'This is a long s...',
                    '>>>entence that ...',
                    '>>>will be split.',
                    'Short string.',
                    'Another long sen...',
                    '>>>tence that wi...',
                    '>>>ll be split a...',
                    '>>>s well.'
                ]
            );
        });

        it('returns an unchanged array if maxSize is large enough for all strings', () => {
            const input = [
                'Short string.',
                'Another short string.'
            ];
            maxSize = 50;
            const result = LogUtils.splitStringArray(input, maxSize, prefix, suffix, linebreak);
            expect(result).toStrictEqual(input);
        });

    });

    describe('#mergeStringArray', () => {

        it('merges an empty array into an empty array', () => {
            const chunks = LogUtils.mergeStringArray([], 10, '\n');
            expect(chunks).toStrictEqual([]);
        });

        it('merges a single short row into a single chunk', () => {
            const chunks = LogUtils.mergeStringArray(['hello'], 10, '\n');
            expect(chunks).toStrictEqual(['hello']);
        });

        it('merges multiple short rows into a single chunk', () => {
            const chunks = LogUtils.mergeStringArray(['hello', 'world'], 20, '\n');
            expect(chunks).toStrictEqual(['hello\nworld']);
        });

        it('merges multiple rows into multiple chunks', () => {
            const chunks = LogUtils.mergeStringArray(['hello', 'world'], 10, '\n');
            expect(chunks).toStrictEqual(['hello', 'world']);
        });

        it('merges rows with varying lengths into multiple chunks', () => {
            const chunks = LogUtils.mergeStringArray(
                [
                    'one',
                    'two',
                    'three',
                    'four4',
                    'five'
                ],
                12,
                '\n'
            );
            expect(chunks).toStrictEqual(
                [
                    'one\ntwo',
                    'three\nfour4', // This line requires exactly 12 characters with new line
                    'five'
                ]
            );
        });

        it('merges rows with custom line break character', () => {
            const chunks = LogUtils.mergeStringArray(['hello', 'world'], 20, '\r\n');
            expect(chunks).toStrictEqual(['hello\r\nworld']);
        });

        it('handles empty rows', () => {
            const chunks = LogUtils.mergeStringArray(['hello', '', 'world'], 15, '\n');
            expect(chunks).toStrictEqual(['hello\n\nworld']);
        });

    });

});
