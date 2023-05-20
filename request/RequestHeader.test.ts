// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { RequestMapping } from "./RequestMapping";
import { RequestMethod } from "./types/RequestMethod";
import { RequestRouterImpl } from "../requestServer/RequestRouterImpl";
import { Headers } from "./types/Headers";
import { RequestRouter } from "../requestServer/RequestRouter";import { ResponseEntity } from "./types/ResponseEntity";
import { LogLevel } from "../types/LogLevel";
import { StaticRoutes } from "../requestServer/types/StaticRoutes";
import { PathVariable } from "./PathVariable";
import { ParamRoutes } from "../requestServer/types/ParamRoutes";
import { GetMapping } from "./GetMapping";
import { RequestHeader } from "./RequestHeader";

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

                        @GetMapping('/hello/{param}')
                        public static getHello (
                            @PathVariable('param')
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

                });

            });

        });

    });

});
