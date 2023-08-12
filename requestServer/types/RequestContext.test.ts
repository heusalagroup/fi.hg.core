// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { parseRequestContextFromPath } from "./RequestContext";

describe('RequestContext', () => {
    describe('#parseRequestContextFromPath', () => {

        it('can parse URL path without query parameters', () => {
            expect( parseRequestContextFromPath('/path/to') ).toStrictEqual({
                pathName: '/path/to'
            });
        });

        it('can parse URL path without query parameters with question mark but without parameters', () => {
            expect( parseRequestContextFromPath('/path/to?') ).toStrictEqual({
                pathName: '/path/to'
            });
        });

        it('can parse URL path with query parameter', () => {
            expect( parseRequestContextFromPath('/path/to?world=hello') ).toStrictEqual({
                pathName: '/path/to',
                queryParams: {
                    world: 'hello'
                }
            });
        });

        it('can parse URL path with multiple query parameters', () => {
            expect( parseRequestContextFromPath('/path/to?world=hello&foo=bar') ).toStrictEqual({
                pathName: '/path/to',
                queryParams: {
                    world: 'hello',
                    foo: 'bar'
                }
            });
        });

        it('can parse URL path with multiple query parameters with escaping', () => {
            expect( parseRequestContextFromPath('/path/to?message=hello+world&foo=bar') ).toStrictEqual({
                pathName: '/path/to',
                queryParams: {
                    message: 'hello world',
                    foo: 'bar'
                }
            });
        });

        it('can parse URL path with multiple query parameters with encoding', () => {
            expect( parseRequestContextFromPath('/path/to?message=hello+world%20%28testing%29&foo=bar') ).toStrictEqual({
                pathName: '/path/to',
                queryParams: {
                    message: 'hello world (testing)',
                    foo: 'bar'
                }
            });
        });

    });
});
