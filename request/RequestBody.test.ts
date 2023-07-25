// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { RequestMapping } from "./RequestMapping";
import { RequestMethod } from "./types/RequestMethod";
import { RequestRouterImpl } from "../requestServer/RequestRouterImpl";
import { Headers } from "./types/Headers";
import { RequestRouter } from "../requestServer/RequestRouter";
import { LogLevel } from "../types/LogLevel";
import { StaticRoutes } from "../requestServer/types/StaticRoutes";
import { PathVariable } from "./PathVariable";
import { ParamRoutes } from "../requestServer/types/ParamRoutes";
import { GetMapping } from "./GetMapping";
import { RequestBody } from "./RequestBody";
import type { ReadonlyJsonAny } from "../Json";
import { OpenAPIV3 } from "../types/openapi";
import { getOpenApiDocumentFromRequestController } from "./types/RequestController";
import { Operation } from "./Operation";
import { ApiResponse } from "./ApiResponse";
import { RequestStatus } from "./types/RequestStatus";

PathVariable.setLogLevel(LogLevel.NONE);
ParamRoutes.setLogLevel(LogLevel.NONE);

describe('RequestBody', () => {

    beforeAll( () => {
        RequestRouterImpl.setLogLevel(LogLevel.NONE);
        StaticRoutes.setLogLevel(LogLevel.NONE);
    });

    describe('Static controllers', () => {

        // Our internal router will use different routing option when there is a
        // dynamic variable in the path
        describe('Dynamic routes', () => {

            describe('String responses', () => {

                describe('GET', () => {

                    @RequestMapping('/')
                    class Controller {

                        @Operation({summary: 'Get a test response using GET'})
                        @GetMapping('/hello')
                        @ApiResponse(RequestStatus.OK, 'Successful operation')
                        public static getHello (
                            @RequestBody
                            body: ReadonlyJsonAny
                        ) : string {
                            return 'Hello '+JSON.stringify(body);
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                    } );

                    it('can handle GET request with body with string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.GET,
                            '/hello',
                            () => ({
                                hello: 'world'
                            }),
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello {"hello":"world"}');
                    });

                    it('can set OpenAPI parameters information', async () => {

                        const expected : OpenAPIV3.Document = {
                            "components": {},
                            "info": {
                                "title": "API Reference",
                                "version": "0.0.0"
                            },
                            "openapi": "3.0.0",
                            "paths": {
                                "/hello": {
                                    "get": {
                                        "operationId": "getHello",
                                        "summary": "Get a test response using GET",
                                        "responses": {
                                            "200": {
                                                "description": "Successful operation"
                                            },
                                        },
                                        requestBody: {
                                            required: true,
                                            content: {
                                                "application/json": {
                                                    schema: {
                                                        type: "object"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "security": [],
                            "tags": []
                        };

                        expect( getOpenApiDocumentFromRequestController(Controller) ).toStrictEqual( expected );
                    });

                });

                describe('GET with manual examples', () => {

                    @RequestMapping('/')
                    class Controller {

                        @Operation({
                            summary: 'Get a test response using GET',
                            requestBody: {
                                description: 'Sample body',
                                required: true,
                                content: {
                                    "application/json": {
                                        examples: {
                                            "sample1": {
                                                summary: "Example 1",
                                                value: {
                                                    name: "John",
                                                    gender: "MALE",
                                                    age: 18
                                                }
                                            },
                                            "sample2": {
                                                summary: "Example 2",
                                                value: {
                                                    name: "Lisa",
                                                    gender: "FEMALE",
                                                    age: 30
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        })
                        @GetMapping('/hello')
                        @ApiResponse(RequestStatus.OK, 'Successful operation')
                        public static getHello (
                            @RequestBody
                            body: ReadonlyJsonAny
                        ) : string {
                            return 'Hello '+JSON.stringify(body);
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                    } );

                    it('can handle GET request with body with string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.GET,
                            '/hello',
                            () => ({
                                hello: 'world'
                            }),
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello {"hello":"world"}');
                    });

                    it('can set OpenAPI parameters information', async () => {

                        const expected : OpenAPIV3.Document = {
                            "components": {},
                            "info": {
                                "title": "API Reference",
                                "version": "0.0.0"
                            },
                            "openapi": "3.0.0",
                            "paths": {
                                "/hello": {
                                    "get": {
                                        "operationId": "getHello",
                                        "summary": "Get a test response using GET",
                                        "responses": {
                                            "200": {
                                                "description": "Successful operation"
                                            },
                                        },
                                        requestBody: {
                                            description: 'Sample body',
                                            required: true,
                                            content: {
                                                "application/json": {
                                                    schema: {
                                                        type: "object"
                                                    },
                                                    examples: {
                                                        "sample1": {
                                                            summary: "Example 1",
                                                            value: {
                                                                name: "John",
                                                                gender: "MALE",
                                                                age: 18
                                                            }
                                                        },
                                                        "sample2": {
                                                            summary: "Example 2",
                                                            value: {
                                                                name: "Lisa",
                                                                gender: "FEMALE",
                                                                age: 30
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "security": [],
                            "tags": []
                        };

                        expect( getOpenApiDocumentFromRequestController(Controller) ).toStrictEqual( expected );
                    });

                });

            });

        });

    });

});
