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
import { PutMapping } from "./PutMapping";
import { SynchronizedRequest } from "./SynchronizedRequest";
import { RequestParam } from "./RequestParam";
import { AsyncSynchronizerImpl } from "../AsyncSynchronizerImpl";

PathVariable.setLogLevel(LogLevel.NONE);
ParamRoutes.setLogLevel(LogLevel.NONE);

describe('SynchronizedRequest', () => {

    beforeAll( () => {
        RequestRouterImpl.setLogLevel(LogLevel.NONE);
        StaticRoutes.setLogLevel(LogLevel.NONE);
        AsyncSynchronizerImpl.setLogLevel(LogLevel.NONE);
    });

    describe('Static controllers', () => {

        // Our internal router will use statoc routing option when there is no
        // dynamic variables in the path
        describe('Static routes', () => {

            describe('String responses', () => {

                describe('PUT', () => {

                    @RequestMapping('/')
                    class Controller {

                        private static _resolve : any[] = [];
                        private static _releasePromise : Promise<void> | undefined;
                        private static _releaseLock : (() => void) | undefined;

                        @PutMapping('/hello')
                        @SynchronizedRequest()
                        public static async getHello (
                            @RequestParam('q')
                            arg ?: string
                        ) : Promise<string|undefined> {
                            return await new Promise<string|undefined>((resolve) => {
                                this._resolve.push( () => {
                                    resolve(arg);
                                } );
                            });
                        }

                        public static resolveHelloRequest () {
                            const one = this._resolve.shift();

                            if ( !this._resolve.length && this._releaseLock ) {
                                this._releaseLock();
                                this._releaseLock = undefined;
                            }

                            if (!one) throw new TypeError('No requests to resolve');
                            one();

                        }

                        /** Drain promises until controller has resolvers
                         */
                        public static async drainUntilResolversExist () : Promise<void> {
                            while (this._resolve.length === 0) {

                                if (this._releasePromise !== undefined) {
                                    let releaseInstantly : boolean = false;
                                    if (this._releaseLock !== undefined) {
                                        this._releaseLock();
                                    }
                                    this._releaseLock = () => {
                                        releaseInstantly = true;
                                    };
                                    this._releasePromise = new Promise<void>((resolve) => {
                                        if (releaseInstantly) {
                                            resolve();
                                            this._releaseLock = undefined;
                                        } else {
                                            this._releaseLock = () => {
                                                resolve();
                                            };
                                        }
                                    });
                                }

                                await this._releasePromise;

                            }
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                        jest.spyOn(Controller, 'getHello');
                    } );

                    it('can create PUT mapping for string response', async () => {

                        const responsePromise = router.handleRequest(
                            RequestMethod.PUT,
                            '/hello?q=hello',
                            undefined,
                            Headers.create()
                        );

                        const responsePromise2 = router.handleRequest(
                            RequestMethod.PUT,
                            '/hello?q=world',
                            undefined,
                            Headers.create()
                        );

                        await Controller.drainUntilResolversExist();
                        expect(Controller.getHello).toHaveBeenCalledTimes(1);

                        Controller.resolveHelloRequest();
                        await Controller.drainUntilResolversExist();

                        Controller.resolveHelloRequest();

                        expect(Controller.getHello).toHaveBeenCalledTimes(2);

                        const response = await responsePromise;

                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('hello');

                        const response2 = await responsePromise2;

                        expect(response2.getStatusCode()).toBe(200);
                        expect(response2.getBody()).toBe('world');

                    });

                });

            });

        });

        // Our internal router will use different routing option when there is a
        // dynamic variable in the path
        describe('Dynamic routes', () => {

            describe('String responses', () => {

                describe('PUT', () => {

                    @RequestMapping('/')
                    class Controller {

                        private static _resolve : any[] = [];
                        private static _releasePromise : Promise<void> | undefined;
                        private static _releaseLock : (() => void) | undefined;

                        @PutMapping('/hello/{param}')
                        @SynchronizedRequest()
                        public static async getHello (
                            @PathVariable('param')
                                param: string
                        ) : Promise<string|undefined> {
                            return new Promise<string|undefined>((resolve) => {
                                this._resolve.push( () => {
                                    resolve('Hello '+param);
                                } );
                            });
                        }

                        public static resolveHelloRequest () {
                            const one = this._resolve.shift();

                            if ( !this._resolve.length && this._releaseLock ) {
                                this._releaseLock();
                                this._releaseLock = undefined;
                            }

                            if (!one) throw new TypeError('No requests to resolve');
                            one();

                        }

                        /** Drain promises until controller has resolvers
                         */
                        public static async drainUntilResolversExist () : Promise<void> {
                            while (this._resolve.length === 0) {

                                if (this._releasePromise !== undefined) {
                                    let releaseInstantly : boolean = false;
                                    if (this._releaseLock !== undefined) {
                                        this._releaseLock();
                                    }
                                    this._releaseLock = () => {
                                        releaseInstantly = true;
                                    };
                                    this._releasePromise = new Promise<void>((resolve) => {
                                        if (releaseInstantly) {
                                            resolve();
                                            this._releaseLock = undefined;
                                        } else {
                                            this._releaseLock = () => {
                                                resolve();
                                            };
                                        }
                                    });
                                }

                                await this._releasePromise;

                            }
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                        jest.spyOn(Controller, 'getHello');
                    } );

                    it('can create PUT mapping for string response', async () => {

                        const responsePromise = router.handleRequest(
                            RequestMethod.PUT,
                            '/hello/hello',
                            undefined,
                            Headers.create()
                        );

                        const responsePromise2 = router.handleRequest(
                            RequestMethod.PUT,
                            '/hello/world',
                            undefined,
                            Headers.create()
                        );

                        await Controller.drainUntilResolversExist();
                        expect(Controller.getHello).toHaveBeenCalledTimes(1);

                        Controller.resolveHelloRequest();
                        await Controller.drainUntilResolversExist();

                        Controller.resolveHelloRequest();

                        expect(Controller.getHello).toHaveBeenCalledTimes(2);

                        const response = await responsePromise;

                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello hello');

                        const response2 = await responsePromise2;

                        expect(response2.getStatusCode()).toBe(200);
                        expect(response2.getBody()).toBe('Hello world');

                    });

                });

            });

        });

    });

});
