// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { RequestMapping } from "./RequestMapping";
import { RequestMethod } from "./types/RequestMethod";
import { RequestRouterImpl } from "../requestServer/RequestRouterImpl";
import { Headers } from "./types/Headers";
import { RequestRouter } from "../requestServer/RequestRouter";
import { ResponseEntity } from "./types/ResponseEntity";
import { LogLevel } from "../types/LogLevel";
import { StaticRoutes } from "../requestServer/types/StaticRoutes";
import { PathVariable } from "./PathVariable";
import { ParamRoutes } from "../requestServer/types/ParamRoutes";
import { GetMapping } from "./GetMapping";
import { createErrorDTO, ErrorDTO } from "../types/ErrorDTO";
import { getOpenApiDocumentFromRequestController } from "./types/RequestController";
import { OpenAPIV3 } from "../types/openapi";
import { OpenAPIDefinition } from "./OpenAPIDefinition";
import { RequestControllerUtils } from "./utils/RequestControllerUtils";
import { getOpenApiDocumentFromRequestControllerMappingObject } from "./types/RequestControllerMappingObject";

PathVariable.setLogLevel(LogLevel.NONE);
ParamRoutes.setLogLevel(LogLevel.NONE);
RequestControllerUtils.setLogLevel(LogLevel.NONE);
getOpenApiDocumentFromRequestControllerMappingObject.setLogLevel(LogLevel.NONE);

describe('OpenAPIDefinition', () => {

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
                    @OpenAPIDefinition({
                        info: {
                            title: "Test API",
                            description: "HTTP REST API reference documentation test",
                            version: '1'
                        }
                    })
                    class Controller {

                        /**
                         * Returns OpenAPI definitions
                         */
                        @GetMapping('/openapi')
                        public static async getOpenApi (): Promise<ResponseEntity<OpenAPIV3.Document | ErrorDTO>> {
                            try {
                                return ResponseEntity.ok( getOpenApiDocumentFromRequestController(Controller) );
                            } catch (err) {
                                return ResponseEntity.internalServerError<ErrorDTO>().body(
                                    createErrorDTO('Internal Server Error', 500)
                                );
                            }
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
                            '/openapi',
                            undefined,
                            Headers.create()
                        );
                        expect( response.getStatusCode() ).toBe(200);
                        expect( response.getBody() ).toStrictEqual(
                            {
                                "components": {},
                                "info": {
                                    "description": "HTTP REST API reference documentation test",
                                    "title": "Test API",
                                    "version": "1"
                                },
                                "openapi": "3.0.0",
                                "paths": {
                                    "/openapi": {
                                        "get": {
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
