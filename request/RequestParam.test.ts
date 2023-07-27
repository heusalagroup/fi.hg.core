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
import { RequestParam } from "./RequestParam";
import { OpenAPIV3 } from "../types/openapi";
import { getOpenApiDocumentFromRequestController } from "./types/RequestController";
import { Operation } from "./Operation";
import { ApiResponse } from "./ApiResponse";
import { RequestStatus } from "./types/RequestStatus";

PathVariable.setLogLevel(LogLevel.NONE);
ParamRoutes.setLogLevel(LogLevel.NONE);

describe('RequestParam', () => {

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
                            @RequestParam('q')
                                q: string
                        ) : string {
                            return 'Hello '+q;
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                    } );

                    it('can create GET mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.GET,
                            '/hello?q=something',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello something');
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
                                        "parameters": [
                                            {
                                                "name": "q",
                                                "in": "query",
                                                "schema": {
                                                    "type": "string"
                                                }
                                            },
                                        ],
                                        "responses": {
                                            "200": {
                                                "description": "Successful operation"
                                            },
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

            describe('All parameters', () => {

                describe('GET', () => {

                    @RequestMapping('/')
                    class Controller {

                        @Operation({summary: 'Get a test response using GET'})
                        @GetMapping('/hello')
                        @ApiResponse(RequestStatus.OK, 'Successful operation')
                        public static getHello (
                            @RequestParam()
                                params: {[key: string]: string}
                        ) : string {
                            return 'Hello '+JSON.stringify(params);
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                    } );

                    it('can create GET mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.GET,
                            '/hello?q=something&other=bar',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello {"q":"something","other":"bar"}');
                    });

                    it('can set OpenAPI parameters information', async () => {

                        const expected: OpenAPIV3.Document = {
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
                                        "parameters": [ {
                                            "in": "query",
                                            "name": undefined,
                                            "schema": {
                                                "type": "object"
                                            }
                                        }
                                        ],
                                        "summary": "Get a test response using GET",
                                        "responses": {
                                            "200": {
                                                "description": "Successful operation"
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
