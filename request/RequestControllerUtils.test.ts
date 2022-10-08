// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestMappingObject } from "./types/RequestMappingObject";
import { RequestControllerUtils } from "./RequestControllerUtils";
import { RequestMethod } from "./types/RequestMethod";

describe('RequestControllerUtils', () => {

    describe('#parseRequestMappings', () => {

        test('can parse single path', () => {
            const config: (RequestMethod|string)[] = [
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
            const config: (RequestMethod|string)[] = [
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
            const config: (RequestMethod|string)[] = [
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
            const config: (RequestMethod|string)[] = [
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
            const config: (RequestMethod|string)[] = [
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
            const config: (RequestMethod|string)[] = [
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
            const config: (RequestMethod|string)[] = [
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
