// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { parseSingleArgument } from "./parseSingleArgument";
import { ArgumentType } from "../types/ArgumentType";

describe('parseSingleArgument', () => {

    describe('with built-in types', () => {

        it('parses boolean arguments correctly', () => {
            const result = parseSingleArgument('--foo', ArgumentType.BOOLEAN, undefined);
            expect(result).toBe(true);
        });

        it('parses string arguments correctly', () => {
            const result = parseSingleArgument('--foo', ArgumentType.STRING, undefined);
            expect(result).toBe('');
        });

        it('parses non-empty string arguments correctly', () => {
            expect( () => parseSingleArgument('--foo', ArgumentType.NON_EMPTY_STRING, undefined)).toThrow(TypeError);
        });

        it('parses number arguments correctly', () => {
            expect( () => parseSingleArgument('--foo', ArgumentType.NUMBER, undefined) ).toThrow(TypeError);
        });

        it('parses integer arguments correctly', () => {
            expect( () => parseSingleArgument('--foo', ArgumentType.INTEGER, undefined) ).toThrow(TypeError);
        });

    });

    describe('with custom type and parser', () => {
        it('uses the correct custom parser when provided', () => {
            const parserMap = {
                'CUSTOM': (
                    // @ts-ignore
                    value: unknown): string | undefined => `Custom parsed: no value`
            };
            const result = parseSingleArgument('--foo', 'CUSTOM', parserMap);
            expect(result).toBe('Custom parsed: no value');
        });
    });

    describe('with invalid type', () => {
        it('throws TypeError when an invalid type is provided', () => {
            expect(() => parseSingleArgument('--foo', 'INVALID_TYPE' as any, undefined)).toThrow(TypeError);
        });
    });

});
