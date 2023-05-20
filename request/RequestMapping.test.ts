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

PathVariable.setLogLevel(LogLevel.NONE);
ParamRoutes.setLogLevel(LogLevel.NONE);

describe('RequestMapping', () => {

    beforeAll( () => {
        RequestRouterImpl.setLogLevel(LogLevel.NONE);
        StaticRoutes.setLogLevel(LogLevel.NONE);
    });

    describe('Static controllers', () => {

        // Our internal router will use statoc routing option when there is no
        // dynamic variables in the path
        describe('Static routes', () => {

            describe('String responses', () => {

                describe('GET', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.GET, '/hello')
                        public static getHello () : string {
                            return 'Hello world';
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
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello world');
                    });

                });

                describe('POST', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.POST, '/hello')
                        public static getHello () : string {
                            return 'Hello world';
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                    } );

                    it('can create POST mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.POST,
                            '/hello',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello world');
                    });

                });

                describe('PUT', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.PUT, '/hello')
                        public static getHello () : string {
                            return 'Hello world';
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                    } );

                    it('can create PUT mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.PUT,
                            '/hello',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello world');
                    });

                });

                describe('DELETE', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.DELETE, '/hello')
                        public static getHello () : string {
                            return 'Hello world';
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                    } );

                    it('can create DELETE mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.DELETE,
                            '/hello',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello world');
                    });

                });

                describe('PATCH', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.PATCH, '/hello')
                        public static getHello () : string {
                            return 'Hello world';
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                    } );

                    it('can create PATCH mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.PATCH,
                            '/hello',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello world');
                    });

                });

                describe('TRACE', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.TRACE, '/hello')
                        public static getHello () : string {
                            return 'Hello world';
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                    } );

                    it('can create TRACE mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.TRACE,
                            '/hello',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello world');
                    });

                });

                describe('HEAD', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.HEAD, '/hello')
                        public static getHello () : string {
                            return 'Hello world';
                        }

                    }

                    let router : RequestRouter;

                    beforeEach( () => {
                        // RequestRouterImpl.setLogLevel(LogLevel.DEBUG);
                        router = RequestRouterImpl.create(Controller);
                    } );

                    it('can create HEAD mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.HEAD,
                            '/hello',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello world');
                    });

                });

                describe('OPTIONS', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.OPTIONS, '/hello')
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

                describe('GET', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.GET, '/hello')
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

                    it('can create GET mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.GET,
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

                describe('POST', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.POST, '/hello')
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

                    it('can create POST mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.POST,
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

                describe('PUT', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.PUT, '/hello')
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

                    it('can create PUT mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.PUT,
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

                describe('DELETE', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.DELETE, '/hello')
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

                    it('can create DELETE mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.DELETE,
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

                describe('PATCH', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.PATCH, '/hello')
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

                    it('can create PATCH mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.PATCH,
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

                describe('TRACE', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.TRACE, '/hello')
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

                    it('can create TRACE mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.TRACE,
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

                describe('HEAD', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.HEAD, '/hello')
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

                    it('can create HEAD mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.HEAD,
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

                describe('OPTIONS', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.OPTIONS, '/hello')
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

                describe('GET', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.GET, '/hello/{param}')
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

                });

                describe('POST', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.POST, '/hello/{param}')
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

                    it('can create POST mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.POST,
                            '/hello/something',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello something');
                    });

                });

                describe('PUT', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.PUT, '/hello/{param}')
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

                    it('can create PUT mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.PUT,
                            '/hello/something',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello something');
                    });

                });

                describe('DELETE', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.DELETE, '/hello/{param}')
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

                    it('can create DELETE mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.DELETE,
                            '/hello/something',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello something');
                    });

                });

                describe('PATCH', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.PATCH, '/hello/{param}')
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

                    it('can create PATCH mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.PATCH,
                            '/hello/something',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello something');
                    });

                });

                describe('TRACE', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.TRACE, '/hello/{param}')
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

                    it('can create TRACE mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.TRACE,
                            '/hello/something',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello something');
                    });

                });

                describe('HEAD', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.HEAD, '/hello/{param}')
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

                    it('can create HEAD mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.HEAD,
                            '/hello/something',
                            undefined,
                            Headers.create()
                        );
                        expect(response.getStatusCode()).toBe(200);
                        expect(response.getBody()).toBe('Hello something');
                    });

                });

                describe('OPTIONS', () => {

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.OPTIONS, '/hello/{param}')
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

                describe('GET', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.GET, '/hello/{param}')
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

                    it('can create GET mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.GET,
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

                describe('POST', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.POST, '/hello/{param}')
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

                    it('can create POST mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.POST,
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

                describe('PUT', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.PUT, '/hello/{param}')
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

                    it('can create PUT mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.PUT,
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

                describe('DELETE', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.DELETE, '/hello/{param}')
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

                    it('can create DELETE mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.DELETE,
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

                describe('PATCH', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.PATCH, '/hello/{param}')
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

                    it('can create PATCH mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.PATCH,
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

                describe('TRACE', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.TRACE, '/hello/{param}')
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

                    it('can create TRACE mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.TRACE,
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

                describe('HEAD', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.HEAD, '/hello/{param}')
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

                    it('can create HEAD mapping for string response', async () => {
                        const response = await router.handleRequest(
                            RequestMethod.HEAD,
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

                describe('OPTIONS', () => {

                    interface HelloDTO {
                        readonly hello : string;
                    }

                    @RequestMapping('/')
                    class Controller {

                        @RequestMapping(RequestMethod.OPTIONS, '/hello/{param}')
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
