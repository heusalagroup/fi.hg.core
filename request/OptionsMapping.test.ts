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
import { OptionsMapping } from "./OptionsMapping";

PathVariable.setLogLevel(LogLevel.NONE);
ParamRoutes.setLogLevel(LogLevel.NONE);

describe('OptionsMapping', () => {

    beforeAll( () => {
        RequestRouterImpl.setLogLevel(LogLevel.NONE);
        StaticRoutes.setLogLevel(LogLevel.NONE);
    });

    describe('Static controllers', () => {

        // Our internal router will use statoc routing option when there is no
        // dynamic variables in the path
        describe('Static routes', () => {

            describe('String responses', () => {

                describe('OPTIONS', () => {

                    @RequestMapping('/')
                    class Controller {

                        @OptionsMapping('/hello')
                        public static getHello () : string {
                            return 'Hello world';
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                    } );

                    it('can create OPTIONS mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.OPTIONS,
                            '/hello',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello world');
                    });

                });

            });

            describe('Entity responses', () => {

                describe('OPTIONS', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @OptionsMapping('/hello')
                        public static getHello () : ResponseEntity<HelloDTO> {
                            return ResponseEntity.ok<HelloDTO>({
                                hello: 'world'
                            });
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                    } );

                    it('can create OPTIONS mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.OPTIONS,
                            '/hello',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toStrictEqual({
                            hello: 'world'
                        });
                    });

                });

            });

        });

        // Our internal router will use different routing option when there is a
        // dynamic variable in the path
        describe('Dynamic routes', () => {

            describe('String responses', () => {

                describe('OPTIONS', () => {

                    @RequestMapping('/')
                    class Controller {

                        @OptionsMapping('/hello/{param}')
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

                    it('can create OPTIONS mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.OPTIONS,
                            '/hello/something',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello something');
                    });

                });

            });

            describe('Entity responses', () => {

                describe('OPTIONS', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @OptionsMapping('/hello/{param}')
                        public static getHello () : ResponseEntity<HelloDTO> {
                            return ResponseEntity.ok<HelloDTO>({
                                hello: 'world'
                            });
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                    } );

                    it('can create OPTIONS mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.OPTIONS,
                            '/hello/something',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toStrictEqual({
                            hello: 'world'
                        });
                    });

                });

            });

        });

    });

});
