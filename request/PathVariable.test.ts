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
import { Operation } from "./Operation";
import { getOpenApiDocumentFromRequestController } from "./types/RequestController";

PathVariable.setLogLevel(LogLevel.NONE);
ParamRoutes.setLogLevel(LogLevel.NONE);

describe('PathVariable', () => {

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

                        @GetMapping('/hello/{param}')
                        @Operation({summary: 'Get a test response using GET'})
                        public static getHello (
                            @PathVariable('param')
                                param: string
                        ) : string {
                            return 'Hello '+param;
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
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello something');
                    });

                    it('can set OpenAPI parameters information', async () => {
                        expect( getOpenApiDocumentFromRequestController(Controller) ).toStrictEqual(
                            {
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
                                                }
                                            ]
                                        }
                                    }
                                },
                                "security": [],
                                "tags": []
                            }
                        );
                    });

                });

            });

        });

    });

});
