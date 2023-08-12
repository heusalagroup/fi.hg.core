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
import { ModelAttribute } from "./ModelAttribute";

PathVariable.setLogLevel(LogLevel.NONE);
ParamRoutes.setLogLevel(LogLevel.NONE);
ModelAttribute.setLogLevel(LogLevel.NONE);

describe('ModelAttribute', () => {

    beforeAll( () => {
        RequestRouterImpl.setLogLevel(LogLevel.NONE);
        StaticRoutes.setLogLevel(LogLevel.NONE);
    });

    describe('Static controllers', () => {

        // Our internal router will use different routing option when there is a
        // dynamic variable in the path
        describe('Dynamic routes', () => {

            describe('String responses', () => {

                describe('GET with synchronous callbacks', () => {

                    const MODEL_NAME = 'foo';

                    @RequestMapping('/')
                    class Controller {

                        /**
                         * The `param` will be populated using the `.getFoo()`
                         * method.
                         *
                         * @param id
                         * @param param
                         */
                        @GetMapping('/hello/{id}')
                        public static getHello (
                            @PathVariable('id')
                                // @ts-ignore
                                id: string,
                            @ModelAttribute(MODEL_NAME)
                                param: string
                        ) : string {
                            return 'Hello '+param;
                        }

                        /**
                         * This method will be called once per request to build
                         * the response and passed on to as the argument in to
                         * other methods.
                         *
                         * @private
                         */
                        @ModelAttribute(MODEL_NAME)
                        // @ts-ignore
                        private static getFoo () {
                            return 'world';
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
                        expect(response.getBody()).toBe('Hello world');
                    });

                });

                describe('GET with asynchronous callbacks', () => {

                    const MODEL_NAME = 'foo';

                    @RequestMapping('/')
                    class Controller {

                        /**
                         * The `param` will be populated using the `.getFoo()`
                         * method. Since the model builder returns a promise,
                         * that promise will be resolved before calling this
                         * function.
                         *
                         * @param id
                         * @param param
                         */
                        @GetMapping('/hello/{id}')
                        public static async getHello (
                            @PathVariable('id')
                                // @ts-ignore
                                id: string,
                            @ModelAttribute(MODEL_NAME)
                                param: string
                        ) : Promise<string> {
                            return 'Hello '+param;
                        }

                        /**
                         * This method will be called once per request to build
                         * the response and when resolved will be passed on to
                         * as the argument in to other methods.
                         *
                         * @private
                         */
                        @ModelAttribute(MODEL_NAME)
                        // @ts-ignore
                        private static async getFoo () : Promise<string> {
                            return 'world';
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
                        expect(response.getBody()).toBe('Hello world');
                    });

                });

            });

        });

    });

});
