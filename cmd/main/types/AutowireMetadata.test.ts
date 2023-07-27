// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    AutowireMetadata,
    createAutowireMetadata,
    isAutowireMetadata,
    explainAutowireMetadata,
    parseAutowireMetadata,
    isAutowireMetadataOrUndefined,
    explainAutowireMetadataOrUndefined,
} from './AutowireMetadata';

describe('AutowireMetadata', () => {

    describe('createAutowireMetadata', () => {
        it('creates autowire metadata', () => {
            const paramNames = ['param1', 'param2'];
            const metadata: AutowireMetadata = createAutowireMetadata(paramNames);

            expect(metadata).toEqual({
                paramNames: ['param1', 'param2'],
            });
        });
    });

    describe('isAutowireMetadata', () => {
        it('recognizes autowire metadata', () => {
            const validMetadata: AutowireMetadata = { paramNames: ['param1', 'param2'] };
            const invalidMetadata = { paramNames: 'not an array' };

            expect(isAutowireMetadata(validMetadata)).toBe(true);
            expect(isAutowireMetadata(invalidMetadata)).toBe(false);
        });
    });

    describe('explainAutowireMetadata', () => {
        it('explains autowire metadata', () => {
            const validMetadata: AutowireMetadata = { paramNames: ['param1', 'param2'] };
            const invalidMetadata = { paramNames: 'not an array' };

            expect(explainAutowireMetadata(validMetadata)).toMatch('OK');
            expect(explainAutowireMetadata(invalidMetadata)).toMatch('property "paramNames" not string[]');
        });
    });

    describe('parseAutowireMetadata', () => {
        it('parses autowire metadata', () => {
            const validMetadata: AutowireMetadata = { paramNames: ['param1', 'param2'] };
            const invalidMetadata = { paramNames: 'not an array' };

            expect(parseAutowireMetadata(validMetadata)).toEqual(validMetadata);
            expect(parseAutowireMetadata(invalidMetadata)).toBeUndefined();
        });
    });

    describe('isAutowireMetadataOrUndefined', () => {
        it('checks for autowire metadata or undefined', () => {
            const validMetadata: AutowireMetadata = { paramNames: ['param1', 'param2'] };
            const invalidMetadata = { paramNames: 'not an array' };

            expect(isAutowireMetadataOrUndefined(validMetadata)).toBe(true);
            expect(isAutowireMetadataOrUndefined(undefined)).toBe(true);
            expect(isAutowireMetadataOrUndefined(invalidMetadata)).toBe(false);
        });
    });

    describe('explainAutowireMetadataOrUndefined', () => {
        it('explains autowire metadata or undefined', () => {
            const validMetadata: AutowireMetadata = { paramNames: ['param1', 'param2'] };
            const invalidMetadata = { paramNames: 'not an array' };

            expect(explainAutowireMetadataOrUndefined(validMetadata)).toMatch('OK');
            expect(explainAutowireMetadataOrUndefined(undefined)).toMatch('OK');
            expect(explainAutowireMetadataOrUndefined(invalidMetadata)).toMatch('not AutowireMetadata or undefined');
        });
    });

});
