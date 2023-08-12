// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { StringUtils } from "./StringUtils";

describe('StringUtils', () => {

    describe('.toString', () => {

        test('can stringify array', () => {

            expect( StringUtils.toString('') ).toBe('');
            expect( StringUtils.toString(false) ).toBe('false');
            expect( StringUtils.toString(true) ).toBe('true');
            expect( StringUtils.toString(null) ).toBe('null');
            expect( StringUtils.toString(undefined) ).toBe('undefined');
            expect( StringUtils.toString('hello') ).toBe('hello');
            expect( StringUtils.toString(123) ).toBe('123');
            expect( StringUtils.toString([]) ).toBe('');
            expect( StringUtils.toString([1, 2, 3]) ).toBe('1,2,3');
            expect( StringUtils.toString(1, 2, 3) ).toBe('123');
            expect( StringUtils.toString(1, 'hello', 3) ).toBe('1hello3');

        });

    });

    describe('.processVariables', () => {

        test('can process empty string value', () => {
            expect( StringUtils.processVariables('',
                {},
                '${',
                '}'
            ) ).toStrictEqual('');
        });

        test('can process empty string value with extra spaces', () => {
            expect( StringUtils.processVariables(
                '    ',
                {},
                '${',
                '}')
            ).toStrictEqual('    ');
        });

        test('can process non-empty string value', () => {
            expect( StringUtils.processVariables(
                'hello world',
                {},
                '${',
                '}')
            ).toStrictEqual('hello world');
        });

        test('can process single variable in non-empty string value', () => {
            expect( StringUtils.processVariables(
                'Welcome, ${name}, nice day!',
                {
                    name: 'Nick'
                },
                '${',
                '}'
            ) ).toStrictEqual('Welcome, Nick, nice day!');
        });

        test('can process two variables in non-empty string value', () => {
            expect( StringUtils.processVariables(
                'Welcome, ${name}, nice ${time}!',
                {
                    name: 'Nick',
                    time: 'evening'
                },
                '${',
                '}'
            ) ).toStrictEqual('Welcome, Nick, nice evening!');
        });

        test('can process single variable in non-empty string value as typed value', () => {
            expect( StringUtils.processVariables(
                '${enabled}',
                {
                    enabled: false
                },
                '${',
                '}'
            ) ).toStrictEqual(false);
        });

        test('can process variables using a function as typed value', () => {
            expect( StringUtils.processVariables(
                '${enabled}',
                (
                    // @ts-ignore
                    key: string
                ) => false,
                '${',
                '}'
            ) ).toStrictEqual(false);
        });

        test('can process variables inside strings using a function as typed value', () => {
            expect( StringUtils.processVariables(
                'Hello, ${enabled}',
                (key: string) => key,
                '${',
                '}'
            ) ).toStrictEqual('Hello, enabled');
        });

        test('can process variables inside strings using a function as typed value with extra spaces', () => {
            expect( StringUtils.processVariables(
                'Hello, ${ enabled }',
                (key: string) => key,
                '${',
                '}'
            ) ).toStrictEqual('Hello, enabled');
        });

        test('can process variables inside arrays using a function as typed value', () => {
            expect( StringUtils.processVariables(
                ['Hello, ${enabled}', 'Nice ${time}.'],
                (key: string) => key,
                '${',
                '}'
            ) ).toStrictEqual(['Hello, enabled', 'Nice time.']);
        });

        test('can process variables inside arrays using a function as typed value - test 2', () => {
            expect( StringUtils.processVariables(
                [ '${jsonString}' ],
                (key: string) => {
                    if (key === 'jsonString') return 'hello world';
                    return undefined;
                },
                '${',
                '}'
            ) ).toStrictEqual(['hello world']);
        });

        test('can process variable from string using a function as typed value - test 2', () => {
            expect( StringUtils.processVariables(
                '${jsonString}',
                (key: string) => {
                    if (key === 'jsonString') return 'hello world';
                    return undefined;
                },
                '${',
                '}'
            ) ).toStrictEqual('hello world');
        });

        test('can process variables inside objects using a function as typed value', () => {
            expect( StringUtils.processVariables(
                {
                    foo: 'Hello, ${enabled}',
                    bar: 'Nice ${time}.'
                },
                (key: string) => key,
                '${',
                '}'
            ) ).toStrictEqual({
                foo: 'Hello, enabled',
                bar: 'Nice time.'
            });
        });

        test('can process variables inside objects and arrays using a function as typed value', () => {
            expect( StringUtils.processVariables(
                {
                    id: '${id}',
                    count: 2,
                    list: ['Hello, ${name}', 'Nice ${time}.']
                },
                {
                    id: 123,
                    name: 'Nick',
                    time: 'evening'
                },
                '${',
                '}'
            ) ).toStrictEqual({
                id: 123,
                count: 2,
                list: ['Hello, Nick', 'Nice evening.']
            });
        });

        test('can process variables inside property keywords', () => {
            expect( StringUtils.processVariables(
                {
                    '${keyword}': '${value}'
                },
                {
                    keyword: 'foo',
                    value: 'hello world'
                },
                '${',
                '}'
            ) ).toStrictEqual({
                foo: 'hello world'
            });
        });

        test('can process variables inside property keywords with extra content', () => {
            expect( StringUtils.processVariables(
                {
                    'xxx${{keyword}}xxx': 'xxx${{value}}xxx'
                },
                {
                    keyword: 'foo',
                    value: 'hello world'
                },
                '${{',
                '}}'
            ) ).toStrictEqual({
                xxxfooxxx: 'xxxhello worldxxx'
            });
        });

        test('processes only correct prefix and suffix without spaces', () => {

            expect( StringUtils.processVariables(
                '${{keyword}}${value}',
                {
                    keyword: 'foo',
                    value: 'hello world'
                },
                '${{',
                '}}'
            ) ).toStrictEqual('foo${value}');
        });

        test('processes only correct prefix and suffix with extra leeding space', () => {
            expect( StringUtils.processVariables(
                ' ${{keyword}}${value}',
                {
                    keyword: 'foo',
                    value: 'hello world'
                },
                '${{',
                '}}'
            ) ).toStrictEqual(' foo${value}');
        });

        test('processes only correct prefix and suffix with more spaces', () => {

            expect( StringUtils.processVariables(
                ' ${value} ${{keyword}}',
                {
                    keyword: 'foo',
                    value: 'hello world'
                },
                '${{',
                '}}'
            ) ).toStrictEqual(' ${value} foo');
        });

        test('processes only correct prefix and suffix with spaces everywhere', () => {

            expect( StringUtils.processVariables(
                ' ${value} ${{keyword}} ',
                {
                    keyword: 'foo',
                    value: 'hello world'
                },
                '${{',
                '}}'
            ) ).toStrictEqual(' ${value} foo ');

        });

        test('processes only correct prefix and suffix with spaces everywhere and similar syntax', () => {

            expect( StringUtils.processVariables(
                ' ${value} ${{keyword}} ',
                {
                    keyword: 'foo',
                    value: 'hello world'
                },
                '${',
                '}'
            ) ).toStrictEqual(' hello world ${{keyword}} ');

        });

        test('can process variables deeper inside objects using a function as typed value', () => {
            expect( StringUtils.processVariables(
                '${ foo.bar.key }',
                {
                    foo: {
                        bar: {
                            key: 123
                        }
                    }
                },
                '${',
                '}'
            ) ).toStrictEqual(123);
        });

    });

});
