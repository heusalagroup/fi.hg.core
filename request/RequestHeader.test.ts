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
import { RequestHeader } from "./RequestHeader";
import { getOpenApiDocumentFromRequestController } from "./types/RequestController";
import { Operation } from "./Operation";
import { OpenAPIV3 } from "../types/openapi";
import { ApiResponse } from "./ApiResponse";
import { RequestStatus } from "./types/RequestStatus";

PathVariable.setLogLevel(LogLevel.NONE);
ParamRoutes.setLogLevel(LogLevel.NONE);
RequestHeader.setLogLevel(LogLevel.NONE);

describe('RequestHeader', () => {

    beforeAll( () => {
        RequestRouterImpl.setLogLevel(LogLevel.NONE);
        StaticRoutes.setLogLevel(LogLevel.NONE);
        Headers.setLogLevel(LogLevel.NONE);
    });

    describe('Static controllers', () => {

        // Our internal router will use statoc routing option when there is no
        // dynamic variables in the path
        describe('Static routes', () => {

            describe('String responses', () => {

                describe('GET', () => {

                    @RequestMapping('/')
                    class Controller {

                        @GetMapping('/hello')
                        public static getHello (
                            @RequestHeader('Authorization')
                            authorization: string
                        ) : string {
                            return `The Authorization header is ${authorization}`;
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
                            '/hello',
                            undefined,
                            Headers.create({
                                'Authorization': '1234'
                            })
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('The Authorization header is 1234');
                    });

                });

            });

        });

        // Our internal router will use different routing option when there is a
        // dynamic variable in the path
        describe('Dynamic routes', () => {

            describe('String responses', () => {

                describe('GET', () => {

                    @RequestMapping('/')
                    class Controller {

                        @Operation({summary: 'Get a test response using GET'})
                        @GetMapping('/hello/{param}')
                        @ApiResponse(RequestStatus.OK, 'Successful operation')
                        public static getHello (
                            @PathVariable('param')
                                // @ts-ignore @TODO: Why not used?
                                param: string,
                            @RequestHeader('Authorization')
                                authorization: string
                        ) : string {
                            return `The Authorization header is ${authorization}`;
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
                            '/hello/something',
                            undefined,
                            Headers.create({
                                'Authorization': '1234'
                            })
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('The Authorization header is 1234');
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
                                "/hello/{param}": {
                                    "get": {
                                        "operationId": "getHello",
                                        "summary": "Get a test response using GET",
                                        "parameters": [
                                            {
                                                "name": "param",
                                                "in": "path"
                                            },
                                            {
                                                "name": "Authorization",
                                                "in": "header",
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

        });

    });

});
