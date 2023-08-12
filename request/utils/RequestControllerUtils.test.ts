// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestMappingObject } from "../types/RequestMappingObject";
import { RequestControllerUtils } from "./RequestControllerUtils";
import { RequestMethod } from "../types/RequestMethod";
import { getInternalRequestMappingObject, RequestController } from "../types/RequestController";
import { RequestParamValueType } from "../types/RequestParamValueType";
import { RequestParamObjectType } from "../types/RequestParamObjectType";
import { LogLevel } from "../../types/LogLevel";

RequestControllerUtils.setLogLevel(LogLevel.NONE);

describe('RequestControllerUtils', () => {

    describe('#parseRequestMappings', () => {

        test('can parse single path', () => {
            const config: (RequestMethod | string)[] = [
                '/path/to'
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toStrictEqual(
                {
                    methods: [],
                    paths: [ '/path/to' ]
                }
            );
        });

        test('can parse multiple paths', () => {
            const config: (RequestMethod | string)[] = [
                '/path',
                '/path/to'
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toStrictEqual(
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
            const config: (RequestMethod | string)[] = [
                RequestMethod.GET
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toStrictEqual(
                {
                    methods: [
                        RequestMethod.GET
                    ],
                    paths: []
                }
            );
        });

        test('can parse POST method', () => {
            const config: (RequestMethod | string)[] = [
                RequestMethod.POST
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toStrictEqual(
                {
                    methods: [
                        RequestMethod.POST
                    ],
                    paths: []
                }
            );
        });

        test('can parse multiple methods', () => {
            const config: (RequestMethod | string)[] = [
                RequestMethod.GET,
                RequestMethod.POST
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toStrictEqual(
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
            const config: (RequestMethod | string)[] = [
                RequestMethod.GET,
                '/path',
                '/path/to'
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toStrictEqual(
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
            const config: (RequestMethod | string)[] = [
                RequestMethod.GET,
                '/path',
                RequestMethod.POST,
                '/path/to'
            ];
            const parsedObject: RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            expect(parsedObject).toBeDefined();
            expect(parsedObject).toStrictEqual(
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

    describe('#attachControllerMapping', () => {

        test('can attach request mapping to the controller', () => {
            class TestController {

            }
            const config: (RequestMethod | string)[] = [
                RequestMethod.GET,
                '/path/to'
            ];
            RequestControllerUtils.attachControllerMapping(TestController as RequestController, config);
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties).toStrictEqual({});
            expect(internalMapping?.mappings?.length).toBe(1);
            expect(internalMapping?.mappings[0]).toStrictEqual(
                {
                    methods: [
                        RequestMethod.GET
                    ],
                    paths: [
                        '/path/to'
                    ]
                }
            );
        });

        test('can attach multiple mappings to the controller', () => {
            class TestController {

            }
            const config1: (RequestMethod | string)[] = [
                RequestMethod.GET,
                '/path/to'
            ];
            const config2: (RequestMethod | string)[] = [
                RequestMethod.POST,
                '/path/to'
            ];
            RequestControllerUtils.attachControllerMapping(TestController as RequestController, config1);
            RequestControllerUtils.attachControllerMapping(TestController as RequestController, config2);
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties).toStrictEqual({});
            expect(internalMapping?.mappings?.length).toBe(2);
            expect(internalMapping?.mappings[0]).toStrictEqual(
                {
                    methods: [
                        RequestMethod.GET
                    ],
                    paths: [
                        '/path/to'
                    ]
                }
            );
            expect(internalMapping?.mappings[1]).toStrictEqual(
                {
                    methods: [
                        RequestMethod.POST
                    ],
                    paths: [
                        '/path/to'
                    ]
                }
            );
        });

    });

    describe('#attachControllerMethodMapping', () => {

        test("can attach mapping for the controller's method", () => {
            class TestController {
                getList () : readonly string[] {
                    return [];
                }
            }
            const config: (RequestMethod | string)[] = [
                RequestMethod.GET,
                '/path/to'
            ];
            RequestControllerUtils.attachControllerMethodMapping(TestController as RequestController, config, 'getList');
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties?.getList?.mappings?.length).toBe(1);
            expect(internalMapping?.controllerProperties?.getList?.mappings[0]).toStrictEqual(
                {
                    methods: [
                        RequestMethod.GET
                    ],
                    paths: [
                        '/path/to'
                    ]
                }
            );
            expect(internalMapping?.controllerProperties?.getList?.modelAttributes).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getList?.params).toStrictEqual([]);
            expect(internalMapping?.mappings?.length).toBe(0);
        });

        test("can attach mappings for the same controller's method", () => {
            class TestController {
                getList () : readonly string[] {
                    return [];
                }
            }
            const config1: (RequestMethod | string)[] = [
                RequestMethod.GET,
                '/path/to'
            ];
            const config2: (RequestMethod | string)[] = [
                RequestMethod.POST,
                '/different/path'
            ];
            RequestControllerUtils.attachControllerMethodMapping(TestController as RequestController, config1, 'getList');
            RequestControllerUtils.attachControllerMethodMapping(TestController as RequestController, config2, 'getList');
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties?.getList?.mappings?.length).toBe(2);
            expect(internalMapping?.controllerProperties?.getList?.mappings[0]).toStrictEqual(
                {
                    methods: [
                        RequestMethod.POST
                    ],
                    paths: [
                        '/different/path'
                    ]
                }
            );
            expect(internalMapping?.controllerProperties?.getList?.mappings[1]).toStrictEqual(
                {
                    methods: [
                        RequestMethod.GET
                    ],
                    paths: [
                        '/path/to'
                    ]
                }
            );
            expect(internalMapping?.controllerProperties?.getList?.modelAttributes).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getList?.params).toStrictEqual([]);
            expect(internalMapping?.mappings?.length).toBe(0);
        });

        test("can attach multiple mappings to the same controller", () => {
            class TestController {
                getList () : readonly string[] {
                    return [];
                }
                getItem () : string | undefined {
                    return 'Hello world';
                }
            }
            const config1: (RequestMethod | string)[] = [
                RequestMethod.GET,
                '/path/to'
            ];
            const config2: (RequestMethod | string)[] = [
                RequestMethod.GET,
                '/different'
            ];
            RequestControllerUtils.attachControllerMethodMapping(TestController as RequestController, config1, 'getList');
            RequestControllerUtils.attachControllerMethodMapping(TestController as RequestController, config2, 'getItem');

            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.mappings).toStrictEqual([]);

            expect(internalMapping?.controllerProperties?.getList?.mappings?.length).toBe(1);
            expect(internalMapping?.controllerProperties?.getList?.mappings[0]).toStrictEqual(
                {
                    methods: [
                        RequestMethod.GET
                    ],
                    paths: [
                        '/path/to'
                    ]
                }
            );
            expect(internalMapping?.controllerProperties?.getList?.modelAttributes).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getList?.params).toStrictEqual([]);

            expect(internalMapping?.controllerProperties?.getItem?.mappings?.length).toBe(1);
            expect(internalMapping?.controllerProperties?.getItem?.mappings[0]).toStrictEqual(
                {
                    methods: [
                        RequestMethod.GET
                    ],
                    paths: [
                        '/different'
                    ]
                }
            );
            expect(internalMapping?.controllerProperties?.getItem?.modelAttributes).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getItem?.params).toStrictEqual([]);

        });

    });

    describe('#findController', () => {

        test("can find controller from class", () => {
            class TestController {
                getList () : readonly string[] {
                    return [];
                }
            }
            const result = RequestControllerUtils.findController(TestController);
            expect(result).toStrictEqual(TestController);
        });

        test("can find controller from class instance", () => {
            class TestController {
                getList () : readonly string[] {
                    return [];
                }
            }
            const instance = new TestController();
            const result = RequestControllerUtils.findController(instance);
            expect(result).toStrictEqual(TestController);
        });

        test("cannot find instance from undefined", () => {
            expect( RequestControllerUtils.findController(undefined) ).toStrictEqual(undefined);
        });

        test("cannot find instance from string", () => {
            expect( RequestControllerUtils.findController('hello world') ).toStrictEqual(undefined);
        });

        test("cannot find instance from null", () => {
            expect( RequestControllerUtils.findController(null) ).toStrictEqual(undefined);
        });

        test("cannot find instance from number", () => {
            expect( RequestControllerUtils.findController(123) ).toStrictEqual(undefined);
        });

    });

    describe('#setControllerMethodModelAttributeParam', () => {

        test("can attach string attribute mapping for the controller's method", () => {
            class TestController {
                getEcho (test: string) : string {
                    return test;
                }
            }
            RequestControllerUtils.setControllerMethodModelAttributeParam(
                TestController as RequestController,
                'getEcho',
                0,
                'test',
                RequestParamValueType.STRING
            );
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties?.getEcho?.mappings?.length).toBe(0);
            expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getEcho?.params).toStrictEqual(
                [
                    {
                        attributeName: 'test',
                        objectType: RequestParamObjectType.MODEL_ATTRIBUTE,
                        valueType: RequestParamValueType.STRING
                    }
                ]
            );
            expect(internalMapping?.mappings?.length).toBe(0);
        });

    });

    describe('#attachControllerMethodModelAttributeBuilder', () => {

        test("can attach attribute mapping for the controller's method", () => {
            class TestController {
                static getEcho: number = 0;
            }
            RequestControllerUtils.attachControllerMethodModelAttributeBuilder(
                TestController as RequestController,
                'getEcho',
                {
                    value: 0,
                    writable: true,
                    enumerable: true,
                    configurable: false
                },
                'test'
            );
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties?.getEcho?.mappings?.length).toBe(0);
            expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes).toStrictEqual(['test']);
            expect(internalMapping?.controllerProperties?.getEcho?.params).toStrictEqual([]);
            expect(internalMapping?.mappings?.length).toBe(0);
        });

        test("can attach second attribute mapping for the controller's method", () => {
            class TestController {
                static getEcho: number = 0;
            }
            RequestControllerUtils.attachControllerMethodModelAttributeBuilder(
                TestController as RequestController,
                'getEcho',
                {
                    value: 0,
                    writable: true,
                    enumerable: true,
                    configurable: false
                },
                'test'
            );
            RequestControllerUtils.attachControllerMethodModelAttributeBuilder(
                TestController as RequestController,
                'getEcho',
                {
                    value: 1,
                    writable: true,
                    enumerable: true,
                    configurable: false
                },
                'hello'
            );
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties?.getEcho?.mappings?.length).toBe(0);
            expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes).toStrictEqual(['hello', 'test']);
            expect(internalMapping?.controllerProperties?.getEcho?.params).toStrictEqual([]);
            expect(internalMapping?.mappings?.length).toBe(0);
        });

        test("can attach attribute mapping for the controller's method when there was another mapping for other property", () => {
            class TestController {
                static getBar: number = 0;
                static getEcho: number = 0;
            }
            RequestControllerUtils.attachControllerMethodModelAttributeBuilder(
                TestController as RequestController,
                'getBar',
                {
                    value: 0,
                    writable: true,
                    enumerable: true,
                    configurable: false
                },
                'test'
            );
            RequestControllerUtils.attachControllerMethodModelAttributeBuilder(
                TestController as RequestController,
                'getEcho',
                {
                    value: 1,
                    writable: true,
                    enumerable: true,
                    configurable: false
                },
                'hello'
            );
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties?.getEcho?.mappings?.length).toBe(0);
            expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes).toStrictEqual(['hello']);
            expect(internalMapping?.controllerProperties?.getEcho?.params).toStrictEqual([]);
            expect(internalMapping?.mappings?.length).toBe(0);
        });

    });

    describe('#setControllerMethodQueryParam', () => {

        test("can attach attribute mapping for the controller's method", () => {
            class TestController {
                static getEcho (
                    // @ts-ignore
                    test: string) {

                };
            }
            RequestControllerUtils.setControllerMethodQueryParam(
                TestController as RequestController,
                'getEcho',
                0,
                'test',
                RequestParamValueType.STRING
            );
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties?.getEcho?.mappings?.length).toBe(0);
            expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes?.length).toBe(0);
            //expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes[0]).toStrictEqual({});
            expect(internalMapping?.controllerProperties?.getEcho?.params?.length).toBe(1);
            expect(internalMapping?.controllerProperties?.getEcho?.params[0]).toStrictEqual(
                {
                    objectType: RequestParamObjectType.QUERY_PARAM,
                    queryParam: "test",
                    valueType: RequestParamValueType.STRING
                }
            );
            expect(internalMapping?.mappings?.length).toBe(0);
        });

    });

    describe('#setControllerMethodHeader', () => {

        test("can attach header configuration for the controller's method", () => {
            class TestController {
                static getEcho (
                    // @ts-ignore
                    test: string) {

                };
            }
            RequestControllerUtils.setControllerMethodHeader(
                TestController as RequestController,
                'getEcho',
                0,
                'test',
                RequestParamValueType.STRING,
                true,
                "123"
            );
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties?.getEcho?.mappings?.length).toBe(0);
            expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes?.length).toBe(0);
            //expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes[0]).toStrictEqual({});
            expect(internalMapping?.controllerProperties?.getEcho?.params?.length).toBe(1);
            expect(internalMapping?.controllerProperties?.getEcho?.params[0]).toStrictEqual(
                {
                    objectType: RequestParamObjectType.REQUEST_HEADER,
                    headerName: "test",
                    valueType: RequestParamValueType.STRING,
                    defaultValue: "123",
                    isRequired: true
                }
            );
            expect(internalMapping?.mappings?.length).toBe(0);
        });

    });

    describe('#setControllerMethodPathVariable', () => {

        test("can attach path variable configuration for the controller's method", () => {
            class TestController {
                static getEcho (
                    // @ts-ignore
                    test: string) {

                };
            }
            RequestControllerUtils.setControllerMethodPathVariable(
                TestController as RequestController,
                'getEcho',
                0,
                'test',
                RequestParamValueType.STRING,
                true,
                true,
                "123"
            );
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties?.getEcho?.mappings?.length).toBe(0);
            expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes?.length).toBe(0);
            //expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes[0]).toStrictEqual({});
            expect(internalMapping?.controllerProperties?.getEcho?.params?.length).toBe(1);
            expect(internalMapping?.controllerProperties?.getEcho?.params[0]).toStrictEqual(
                {
                    objectType: RequestParamObjectType.PATH_VARIABLE,
                    valueType: RequestParamValueType.STRING,
                    defaultValue: "123",
                    variableName: 'test',
                    decodeValue: true,
                    isRequired: true
                }
            );
            expect(internalMapping?.mappings?.length).toBe(0);
        });

    });

    describe('#setControllerMethodPathVariableMap', () => {

        test("can attach path variable map configuration for the controller's method", () => {
            class TestController {
                static getEcho (
                    // @ts-ignore
                    test: string) {

                };
            }
            RequestControllerUtils.setControllerMethodPathVariableMap(
                TestController as RequestController,
                'getEcho',
                0,
                {
                    foo: 'bar'
                }
            );
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties?.getEcho?.mappings?.length).toBe(0);
            expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes?.length).toBe(0);
            //expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes[0]).toStrictEqual({});
            expect(internalMapping?.controllerProperties?.getEcho?.params?.length).toBe(1);
            expect(internalMapping?.controllerProperties?.getEcho?.params[0]).toStrictEqual(
                {
                    objectType: RequestParamObjectType.PATH_VARIABLE_MAP,
                    defaultValues: {
                        foo: 'bar'
                    }
                }
            );
            expect(internalMapping?.mappings?.length).toBe(0);
        });

    });

    describe('#setControllerMethodHeaderMap', () => {

        test("can attach header map configuration for the controller's method", () => {
            class TestController {
                static getEcho (
                    // @ts-ignore
                    test: string) {

                };
            }
            RequestControllerUtils.setControllerMethodHeaderMap(
                TestController as RequestController,
                'getEcho',
                0,
                {
                    foo: 'bar'
                }
            );
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties?.getEcho?.mappings?.length).toBe(0);
            expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes?.length).toBe(0);
            //expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes[0]).toStrictEqual({});
            expect(internalMapping?.controllerProperties?.getEcho?.params?.length).toBe(1);
            expect(internalMapping?.controllerProperties?.getEcho?.params[0]).toStrictEqual(
                {
                    objectType: RequestParamObjectType.REQUEST_HEADER_MAP,
                    defaultValues: {
                        foo: 'bar'
                    }
                }
            );
            expect(internalMapping?.mappings?.length).toBe(0);
        });

    });

    describe('#setControllerMethodBodyParam', () => {

        test("can attach body argument configuration for the controller's method", () => {
            class TestController {
                static getEcho (
                    // @ts-ignore
                    test: string) {

                };
            }
            RequestControllerUtils.setControllerMethodBodyParam(
                TestController as RequestController,
                'getEcho',
                0,
                RequestParamValueType.STRING
            );
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.controllerProperties?.getEcho?.requestBodyRequired).toBe(true);
            expect(internalMapping?.controllerProperties?.getEcho?.mappings?.length).toBe(0);
            expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes?.length).toBe(0);
            //expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes[0]).toStrictEqual({});
            expect(internalMapping?.controllerProperties?.getEcho?.params?.length).toBe(1);
            expect(internalMapping?.controllerProperties?.getEcho?.params[0]).toStrictEqual(
                {
                    objectType: RequestParamObjectType.REQUEST_BODY,
                    valueType: RequestParamValueType.STRING
                }
            );
            expect(internalMapping?.mappings?.length).toBe(0);
        });

    });

    describe('#attachControllerOpenApiDocument', () => {

        test("can attach openAPI configuration for the controller", () => {
            class TestController {
                static getEcho (
                    // @ts-ignore
                    test: string) {

                };
            }
            RequestControllerUtils.attachControllerOpenApiDocument(
                TestController as RequestController,
                {
                    info: {
                        title: 'Hello world API',
                        version: '0.1.0'
                    }
                }
            );
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.mappings).toStrictEqual([]);
            expect(internalMapping?.openApiPartials?.length).toStrictEqual(1);
            expect((internalMapping?.openApiPartials?? [])[0]).toStrictEqual(
                {
                    info: {
                        title: 'Hello world API',
                        version: '0.1.0'
                    }
                }
            );
        });

    });

    describe('#attachControllerOperation', () => {

        test("can attach openAPI operation info for the controller's method", () => {
            class TestController {
                static getEcho (
                    // @ts-ignore
                    test: string) {

                };
            }
            RequestControllerUtils.attachControllerOperation(
                TestController as RequestController,
                'getEcho',
                {
                    "operationId": "getEcho",
                    summary: 'Returns echo of the parameter provided'
                }
            );
            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);
            expect(internalMapping?.controller).toStrictEqual(TestController);
            expect(internalMapping?.mappings).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getEcho?.mappings).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getEcho?.params).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getEcho?.operations?.length).toBe(1);
            expect((internalMapping?.controllerProperties?.getEcho?.operations??[])[0]).toStrictEqual(
                {
                    "operationId": "getEcho",
                    summary: 'Returns echo of the parameter provided'
                }
            );
        });

        test("can attach openAPI operation info for the controller's method with request mapping", () => {
            class TestController {
                static getEcho (test: string) {
                    return test;
                };
            }

            const config: (RequestMethod | string)[] = [
                RequestMethod.GET,
                '/path/to'
            ];

            RequestControllerUtils.attachControllerMapping(TestController as RequestController, config);

            RequestControllerUtils.attachControllerOperation(
                TestController as RequestController,
                'getEcho',
                {
                    "operationId": "getEcho",
                    summary: 'Returns echo of the parameter provided'
                }
            );

            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);

            expect(internalMapping?.controller).toStrictEqual(TestController);

            expect(internalMapping?.mappings?.length).toStrictEqual(1);
            expect(internalMapping?.mappings[0]).toStrictEqual(
                {
                    methods: [
                        RequestMethod.GET
                    ],
                    paths: [
                        '/path/to'
                    ]
                }
            );

            expect(internalMapping?.controllerProperties?.getEcho?.mappings).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getEcho?.params).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getEcho?.operations?.length).toBe(1);
            expect((internalMapping?.controllerProperties?.getEcho?.operations??[])[0]).toStrictEqual(
                {
                    "operationId": "getEcho",
                    summary: 'Returns echo of the parameter provided'
                }
            );

        });

        test("can attach openAPI operation info for the controller's method with request mapping with method mappings1", () => {
            class TestController {
                static getFoo (test: string) {
                    return test;
                };
                static getEcho (test: string) {
                    return test;
                };
            }

            const config1: (RequestMethod | string)[] = [
                RequestMethod.GET,
                '/echo'
            ];
            RequestControllerUtils.attachControllerMethodMapping(TestController as RequestController, config1, 'getEcho');

            const config2: (RequestMethod | string)[] = [
                RequestMethod.GET,
                '/foo'
            ];
            RequestControllerUtils.attachControllerMethodMapping(TestController as RequestController, config2, 'getFoo');

            RequestControllerUtils.attachControllerOperation(
                TestController as RequestController,
                'getEcho',
                {
                    "operationId": "getEcho",
                    summary: 'Returns echo of the parameter provided'
                }
            );

            const internalMapping = getInternalRequestMappingObject(TestController as RequestController, TestController);

            expect(internalMapping?.controller).toStrictEqual(TestController);

            expect(internalMapping?.mappings).toStrictEqual([]);

            expect(internalMapping?.controllerProperties?.getFoo?.mappings?.length).toBe(1);
            expect(internalMapping?.controllerProperties?.getFoo?.mappings[0]).toStrictEqual(
                {
                    methods: [
                        RequestMethod.GET
                    ],
                    paths: [
                        '/foo'
                    ]
                }
            );
            expect(internalMapping?.controllerProperties?.getFoo?.modelAttributes).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getFoo?.params).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getFoo?.operations).not.toBeDefined();

            expect(internalMapping?.controllerProperties?.getEcho?.mappings?.length).toStrictEqual(1);
            expect(internalMapping?.controllerProperties?.getEcho?.mappings[0]).toStrictEqual(
                {
                    methods: [
                        RequestMethod.GET
                    ],
                    paths: [
                        '/echo'
                    ]
                }
            );

            expect(internalMapping?.controllerProperties?.getEcho?.modelAttributes).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getEcho?.params).toStrictEqual([]);
            expect(internalMapping?.controllerProperties?.getEcho?.operations?.length).toBe(1);
            expect((internalMapping?.controllerProperties?.getEcho?.operations??[])[0]).toStrictEqual(
                {
                    "operationId": "getEcho",
                    summary: 'Returns echo of the parameter provided'
                }
            );

        });

    });

});
