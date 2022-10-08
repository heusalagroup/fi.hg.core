// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestMappingObject } from "./types/RequestMappingObject";
import { RequestControllerUtils } from "./RequestControllerUtils";
import { RequestMapping } from "./types/RequestMapping";
import { RequestMethod } from "./types/RequestMethod";

describe('RequestControllerUtils', () => {

    describe('#parseRequestMappings', () => {

        test('can parse single path', () => {
            const config: readonly RequestMapping[] = [
                '/path/to'
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toMatchObject(
                {
                    methods: [],
                    paths: [ '/path/to' ]
                }
            );
        });

        test('can parse multiple paths', () => {
            const config: readonly RequestMapping[] = [
                '/path',
                '/path/to'
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toMatchObject(
                {
                    methods: [],
                    paths: [
                        '/path',
                        '/path/to'
                    ]
                }
            );
        });

        test('can parse GET method', () => {
            const config: readonly RequestMapping[] = [
                RequestMethod.GET
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toMatchObject(
                {
                    methods: [
                        RequestMethod.GET
                    ],
                    paths: []
                }
            );
        });

        test('can parse POST method', () => {
            const config: readonly RequestMapping[] = [
                RequestMethod.POST
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toMatchObject(
                {
                    methods: [
                        RequestMethod.POST
                    ],
                    paths: []
                }
            );
        });

        test('can parse multiple methods', () => {
            const config: readonly RequestMapping[] = [
                RequestMethod.GET,
                RequestMethod.POST
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toMatchObject(
                {
                    methods: [
                        RequestMethod.GET,
                        RequestMethod.POST
                    ],
                    paths: []
                }
            );
        });

        test('can parse multiple paths with method', () => {
            const config: readonly RequestMapping[] = [
                RequestMethod.GET,
                '/path',
                '/path/to'
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toMatchObject(
                {
                    methods: [
                        RequestMethod.GET
                    ],
                    paths: [
                        '/path',
                        '/path/to'
                    ]
                }
            );
        });

        test('can parse multiple paths with multiple methods', () => {
            const config: readonly RequestMapping[] = [
                RequestMethod.GET,
                '/path',
                RequestMethod.POST,
                '/path/to'
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toMatchObject(
                {
                    methods: [
                        RequestMethod.GET,
                        RequestMethod.POST
                    ],
                    paths: [
                        '/path',
                        '/path/to'
                    ]
                }
            );
        });

    });

});
