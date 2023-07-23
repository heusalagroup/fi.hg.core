// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryParamUtils } from "./QueryParamUtils";

describe('QueryParamUtils', () => {

    describe('#stringifyQueryParams', () => {

        it('should return an empty string when no query parameters are provided', () => {
            const params = {};
            const result = QueryParamUtils.stringifyQueryParams(params);
            expect(result).toBe('');
        });

        it('should return a query string when one query parameter is provided', () => {
            const params = {
                test: 'value',
            };
            const result = QueryParamUtils.stringifyQueryParams(params);
            expect(result).toBe('?test=value');
        });

        it('should return a query string when multiple query parameters are provided', () => {
            const params = {
                param1: 'value1',
                param2: 'value2',
            };
            const result = QueryParamUtils.stringifyQueryParams(params);
            expect(result).toBe('?param1=value1&param2=value2');
        });

        it('should encode special characters in the values of the query parameters', () => {
            const params = {
                param: 'value with spaces',
            };
            const result = QueryParamUtils.stringifyQueryParams(params);
            expect(result).toBe('?param=value+with+spaces');
        });

    });

});
