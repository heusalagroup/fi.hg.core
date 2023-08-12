// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { parseArgumentWithParam } from "./parseArgumentWithParam";
import { ArgumentType } from "../types/ArgumentType";
import { UserDefinedParserMap } from "../types/UserDefinedParserMap";

describe('parseArgumentWithParam', () => {

    describe('with built-in types', () => {
        it('parses boolean arguments correctly', () => {
            const result = parseArgumentWithParam('--foo=true', ArgumentType.BOOLEAN,  'true', undefined);
            expect(result).toBe(true);
        });

        it('parses string arguments correctly', () => {
            const result = parseArgumentWithParam('--foo=bar', ArgumentType.STRING,  'bar', undefined);
            expect(result).toBe('bar');
        });

        it('parses non-empty string arguments correctly', () => {
            const result = parseArgumentWithParam('--foo=bar', ArgumentType.NON_EMPTY_STRING,  'bar', undefined);
            expect(result).toBe('bar');
        });

        it('parses number arguments correctly', () => {
            const result = parseArgumentWithParam('--foo=123', ArgumentType.NUMBER,  '123', undefined);
            expect(result).toBe(123);
        });

        it('parses integer arguments correctly', () => {
            const result = parseArgumentWithParam('--foo=123', ArgumentType.INTEGER, '123', undefined);
            expect(result).toBe(123);
        });
    });

    describe('with custom type and parser', () => {
        it('uses the correct custom parser when provided', () => {
            const parserMap : UserDefinedParserMap = {
                'CUSTOM': (value: unknown): string | undefined => `Custom parsed: ${value}`
            };
            const result = parseArgumentWithParam('--foo=bar', 'CUSTOM',  'bar', parserMap);
            expect(result).toBe('Custom parsed: bar');
        });
    });

    describe('with invalid type', () => {
        it('throws TypeError when an invalid type is provided', () => {
            expect(() => parseArgumentWithParam('--foo=bar', 'INVALID_TYPE' as any,  'bar', undefined)).toThrow(TypeError);
        });
    });

});
