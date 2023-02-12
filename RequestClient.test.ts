// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestClient } from "./RequestClient";
import { RequestMethod } from "./request/types/RequestMethod";
import { RequestClientInterface } from "./requestClient/RequestClientInterface";
import { ResponseEntity } from "./request/ResponseEntity";
import { JsonAny } from "./Json";
import { LogLevel } from "./types/LogLevel";

describe("RequestClient", () => {

    let mockRequestClient : RequestClientInterface;

    beforeEach( () => {
        RequestClient.setLogLevel(LogLevel.NONE);
        mockRequestClient = {
            jsonEntityRequest: jest.fn().mockResolvedValue(ResponseEntity.ok({})),
            textEntityRequest: jest.fn().mockResolvedValue(ResponseEntity.ok('')),
            jsonRequest: jest.fn().mockResolvedValue({}),
            textRequest: jest.fn().mockResolvedValue('')
        };
    });

    describe('instance', () => {

        let requestClient : RequestClient;

        beforeEach( () => {
            requestClient = new RequestClient(mockRequestClient);
        });

        describe("#textEntityRequest", () => {
            beforeEach( () => {
                (mockRequestClient.textEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok('Hello World')));
            });
            it("makes a GET request with the given method, url, headers, and data", async () => {
                const response : ResponseEntity<string| undefined> | undefined = await requestClient.textEntityRequest(RequestMethod.GET, "http://example.com", {}, "Hello");
                expect(mockRequestClient.textEntityRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {}, "Hello");
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toBe("Hello World");
            });
        });

        describe("#getTextEntity", () => {
            beforeEach( () => {
                (mockRequestClient.textEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok('Hello World')));
            });
            it("makes a GET text request with the given url and headers", async () => {
                const response : ResponseEntity<string| undefined> | undefined = await requestClient.getTextEntity("http://example.com", {});
                expect(mockRequestClient.textEntityRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {});
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toBe("Hello World");
            });
        });

        describe("#postTextEntity", () => {
            beforeEach( () => {
                (mockRequestClient.textEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok('Hello World')));
            });
            it("makes a POST request with the given url and headers", async () => {
                const response : ResponseEntity<string| undefined> | undefined = await requestClient.postTextEntity("http://example.com", 'Hello', {});
                expect(mockRequestClient.textEntityRequest).toHaveBeenCalledWith(RequestMethod.POST, "http://example.com", {}, 'Hello');
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toBe("Hello World");
            });
        });

        describe("#putTextEntity", () => {
            beforeEach( () => {
                (mockRequestClient.textEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok('Hello World')));
            });
            it("makes a PUT request with the given url and headers", async () => {
                const response : ResponseEntity<string| undefined> | undefined = await requestClient.putTextEntity("http://example.com", 'Hello', {});
                expect(mockRequestClient.textEntityRequest).toHaveBeenCalledWith(RequestMethod.PUT, "http://example.com", {}, 'Hello');
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toBe("Hello World");
            });
        });

        describe("#deleteTextEntity", () => {
            beforeEach( () => {
                (mockRequestClient.textEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok('Hello World')));
            });
            it("makes a DELETE request with the given url and headers", async () => {
                const response : ResponseEntity<string| undefined> | undefined = await requestClient.deleteTextEntity("http://example.com", {});
                expect(mockRequestClient.textEntityRequest).toHaveBeenCalledWith(RequestMethod.DELETE, "http://example.com", {}, undefined);
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toBe("Hello World");
            });
        });

        describe("#patchTextEntity", () => {
            beforeEach( () => {
                (mockRequestClient.textEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok('Hello World')));
            });
            it("makes a PATCH request with the given url and headers", async () => {
                const response : ResponseEntity<string| undefined> | undefined = await requestClient.patchTextEntity("http://example.com", 'Hello', {});
                expect(mockRequestClient.textEntityRequest).toHaveBeenCalledWith(RequestMethod.PATCH, "http://example.com", {}, 'Hello');
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toBe("Hello World");
            });
        });


        describe("#jsonEntityRequest", () => {
            beforeEach( () => {
                (mockRequestClient.jsonEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok({'hello': 'world'})));
            });
            it("makes a GET request with the given method, url, headers, and data", async () => {
                const response : ResponseEntity<JsonAny| undefined> | undefined = await requestClient.jsonEntityRequest(RequestMethod.GET, "http://example.com", {});
                expect(mockRequestClient.jsonEntityRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {}, undefined);
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#getJsonEntity", () => {
            beforeEach( () => {
                (mockRequestClient.jsonEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok({'hello': 'world'})));
            });
            it("makes a GET request with the given url and headers", async () => {
                const response : ResponseEntity<JsonAny| undefined> | undefined = await requestClient.getJsonEntity("http://example.com", {});
                expect(mockRequestClient.jsonEntityRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {});
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#postJsonEntity", () => {
            beforeEach( () => {
                (mockRequestClient.jsonEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok({'hello': 'world'})));
            });
            it("makes a POST request with the given url and headers", async () => {
                const response : ResponseEntity<JsonAny| undefined> | undefined = await requestClient.postJsonEntity("http://example.com", 'Hello', {});
                expect(mockRequestClient.jsonEntityRequest).toHaveBeenCalledWith(RequestMethod.POST, "http://example.com", {}, 'Hello');
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#putJsonEntity", () => {
            beforeEach( () => {
                (mockRequestClient.jsonEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok({'hello': 'world'})));
            });
            it("makes a PUT request with the given url and headers", async () => {
                const response : ResponseEntity<JsonAny| undefined> | undefined = await requestClient.putJsonEntity("http://example.com", 'Hello', {});
                expect(mockRequestClient.jsonEntityRequest).toHaveBeenCalledWith(RequestMethod.PUT, "http://example.com", {}, 'Hello');
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#deleteJsonEntity", () => {
            beforeEach( () => {
                (mockRequestClient.jsonEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok({'hello': 'world'})));
            });
            it("makes a DELETE request with the given url and headers", async () => {
                const response : ResponseEntity<JsonAny| undefined> | undefined = await requestClient.deleteJsonEntity("http://example.com", {});
                expect(mockRequestClient.jsonEntityRequest).toHaveBeenCalledWith(RequestMethod.DELETE, "http://example.com", {}, undefined);
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#patchJsonEntity", () => {
            beforeEach( () => {
                (mockRequestClient.jsonEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok({'hello': 'world'})));
            });
            it("makes a PATCH request with the given url and headers", async () => {
                const response : ResponseEntity<JsonAny| undefined> | undefined = await requestClient.patchJsonEntity("http://example.com", 'Hello', {});
                expect(mockRequestClient.jsonEntityRequest).toHaveBeenCalledWith(RequestMethod.PATCH, "http://example.com", {}, 'Hello');
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toStrictEqual({'hello': 'world'});
            });
        });


        describe("#textRequest", () => {
            beforeEach( () => {
                (mockRequestClient.textRequest as any).mockImplementationOnce(() => Promise.resolve('Hello World'));
            });
            it("makes a GET request with the given method, url, headers, and data", async () => {
                const response : string| undefined = await requestClient.textRequest(RequestMethod.GET, "http://example.com", {}, "Hello");
                expect(mockRequestClient.textRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {}, "Hello");
                expect(response).toBe("Hello World");
            });
        });

        describe("#getText", () => {
            beforeEach( () => {
                (mockRequestClient.textRequest as any).mockImplementationOnce(() => Promise.resolve('Hello World'));
            });
            it("makes a GET text request with the given url and headers", async () => {
                const response : string| undefined = await requestClient.getText("http://example.com", {});
                expect(mockRequestClient.textRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {});
                expect(response).toBe("Hello World");
            });
        });

        describe("#postText", () => {
            beforeEach( () => {
                (mockRequestClient.textRequest as any).mockImplementationOnce(() => Promise.resolve('Hello World'));
            });
            it("makes a POST request with the given url and headers", async () => {
                const response : string| undefined = await requestClient.postText("http://example.com", 'Hello', {});
                expect(mockRequestClient.textRequest).toHaveBeenCalledWith(RequestMethod.POST, "http://example.com", {}, 'Hello');
                expect(response).toBe("Hello World");
            });
        });

        describe("#putText", () => {
            beforeEach( () => {
                (mockRequestClient.textRequest as any).mockImplementationOnce(() => Promise.resolve('Hello World'));
            });
            it("makes a PUT request with the given url and headers", async () => {
                const response : string| undefined = await requestClient.putText("http://example.com", 'Hello', {});
                expect(mockRequestClient.textRequest).toHaveBeenCalledWith(RequestMethod.PUT, "http://example.com", {}, 'Hello');
                expect(response).toBe("Hello World");
            });
        });

        describe("#deleteText", () => {
            beforeEach( () => {
                (mockRequestClient.textRequest as any).mockImplementationOnce(() => Promise.resolve('Hello World'));
            });
            it("makes a DELETE request with the given url and headers", async () => {
                const response : string| undefined = await requestClient.deleteText("http://example.com", {});
                expect(mockRequestClient.textRequest).toHaveBeenCalledWith(RequestMethod.DELETE, "http://example.com", {}, undefined);
                expect(response).toBe("Hello World");
            });
        });

        describe("#patchText", () => {
            beforeEach( () => {
                (mockRequestClient.textRequest as any).mockImplementationOnce(() => Promise.resolve('Hello World'));
            });
            it("makes a PATCH request with the given url and headers", async () => {
                const response : string| undefined = await requestClient.patchText("http://example.com", 'Hello', {});
                expect(mockRequestClient.textRequest).toHaveBeenCalledWith(RequestMethod.PATCH, "http://example.com", {}, 'Hello');
                expect(response).toBe("Hello World");
            });
        });


        describe("#jsonRequest", () => {
            beforeEach( () => {
                (mockRequestClient.jsonRequest as any).mockImplementationOnce(() => Promise.resolve({'hello': 'world'}));
            });
            it("makes a GET request with the given method, url, headers, and data", async () => {
                const response : JsonAny| undefined = await requestClient.jsonRequest(RequestMethod.GET, "http://example.com", {});
                expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {}, undefined);
                expect(response).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#getJson", () => {
            beforeEach( () => {
                (mockRequestClient.jsonRequest as any).mockImplementationOnce(() => Promise.resolve({'hello': 'world'}));
            });
            it("makes a GET request with the given url and headers", async () => {
                const response : JsonAny| undefined = await requestClient.getJson("http://example.com", {});
                expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {});
                expect(response).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#postJson", () => {
            beforeEach( () => {
                (mockRequestClient.jsonRequest as any).mockImplementationOnce(() => Promise.resolve({'hello': 'world'}));
            });
            it("makes a POST request with the given url and headers", async () => {
                const response : JsonAny| undefined = await requestClient.postJson("http://example.com", 'Hello', {});
                expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(RequestMethod.POST, "http://example.com", {}, 'Hello');
                expect(response).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#putJson", () => {
            beforeEach( () => {
                (mockRequestClient.jsonRequest as any).mockImplementationOnce(() => Promise.resolve({'hello': 'world'}));
            });
            it("makes a PUT request with the given url and headers", async () => {
                const response : JsonAny| undefined = await requestClient.putJson("http://example.com", 'Hello', {});
                expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(RequestMethod.PUT, "http://example.com", {}, 'Hello');
                expect(response).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#deleteJson", () => {
            beforeEach( () => {
                (mockRequestClient.jsonRequest as any).mockImplementationOnce(() => Promise.resolve({'hello': 'world'}));
            });
            it("makes a DELETE request with the given url and headers", async () => {
                const response : JsonAny| undefined = await requestClient.deleteJson("http://example.com", {});
                expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(RequestMethod.DELETE, "http://example.com", {}, undefined);
                expect(response).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#patchJson", () => {
            beforeEach( () => {
                (mockRequestClient.jsonRequest as any).mockImplementationOnce(() => Promise.resolve({'hello': 'world'}));
            });
            it("makes a PATCH request with the given url and headers", async () => {
                const response : JsonAny| undefined = await requestClient.patchJson("http://example.com", 'Hello', {});
                expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(RequestMethod.PATCH, "http://example.com", {}, 'Hello');
                expect(response).toStrictEqual({'hello': 'world'});
            });
        });

    });

    describe('static', () => {

        beforeEach( () => {
            RequestClient.setClient(mockRequestClient);
        });

        describe("#textEntityRequest", () => {
            beforeEach( () => {
                (mockRequestClient.textEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok('Hello World')));
            });
            it("makes a GET request with the given method, url, headers, and data", async () => {
                const response : ResponseEntity<string| undefined> | undefined = await RequestClient.textEntityRequest(RequestMethod.GET, "http://example.com", {}, "Hello");
                expect(mockRequestClient.textEntityRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {}, "Hello");
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toBe("Hello World");
            });
        });

        describe("#getTextEntity", () => {
            beforeEach( () => {
                (mockRequestClient.textEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok('Hello World')));
            });
            it("makes a GET text request with the given url and headers", async () => {
                const response : ResponseEntity<string| undefined> | undefined = await RequestClient.getTextEntity("http://example.com", {});
                expect(mockRequestClient.textEntityRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {});
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toBe("Hello World");
            });
        });

        describe("#postTextEntity", () => {
            beforeEach( () => {
                (mockRequestClient.textEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok('Hello World')));
            });
            it("makes a POST request with the given url and headers", async () => {
                const response : ResponseEntity<string| undefined> | undefined = await RequestClient.postTextEntity("http://example.com", 'Hello', {});
                expect(mockRequestClient.textEntityRequest).toHaveBeenCalledWith(RequestMethod.POST, "http://example.com", {}, 'Hello');
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toBe("Hello World");
            });
        });

        describe("#putTextEntity", () => {
            beforeEach( () => {
                (mockRequestClient.textEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok('Hello World')));
            });
            it("makes a PUT request with the given url and headers", async () => {
                const response : ResponseEntity<string| undefined> | undefined = await RequestClient.putTextEntity("http://example.com", 'Hello', {});
                expect(mockRequestClient.textEntityRequest).toHaveBeenCalledWith(RequestMethod.PUT, "http://example.com", {}, 'Hello');
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toBe("Hello World");
            });
        });

        describe("#deleteTextEntity", () => {
            beforeEach( () => {
                (mockRequestClient.textEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok('Hello World')));
            });
            it("makes a DELETE request with the given url and headers", async () => {
                const response : ResponseEntity<string| undefined> | undefined = await RequestClient.deleteTextEntity("http://example.com", {});
                expect(mockRequestClient.textEntityRequest).toHaveBeenCalledWith(RequestMethod.DELETE, "http://example.com", {}, undefined);
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toBe("Hello World");
            });
        });

        describe("#patchTextEntity", () => {
            beforeEach( () => {
                (mockRequestClient.textEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok('Hello World')));
            });
            it("makes a PATCH request with the given url and headers", async () => {
                const response : ResponseEntity<string| undefined> | undefined = await RequestClient.patchTextEntity("http://example.com", 'Hello', {});
                expect(mockRequestClient.textEntityRequest).toHaveBeenCalledWith(RequestMethod.PATCH, "http://example.com", {}, 'Hello');
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toBe("Hello World");
            });
        });


        describe("#jsonEntityRequest", () => {
            beforeEach( () => {
                (mockRequestClient.jsonEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok({'hello': 'world'})));
            });
            it("makes a GET request with the given method, url, headers, and data", async () => {
                const response : ResponseEntity<JsonAny| undefined> | undefined = await RequestClient.jsonEntityRequest(RequestMethod.GET, "http://example.com", {});
                expect(mockRequestClient.jsonEntityRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {}, undefined);
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#getJsonEntity", () => {
            beforeEach( () => {
                (mockRequestClient.jsonEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok({'hello': 'world'})));
            });
            it("makes a GET request with the given url and headers", async () => {
                const response : ResponseEntity<JsonAny| undefined> | undefined = await RequestClient.getJsonEntity("http://example.com", {});
                expect(mockRequestClient.jsonEntityRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {});
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#postJsonEntity", () => {
            beforeEach( () => {
                (mockRequestClient.jsonEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok({'hello': 'world'})));
            });
            it("makes a POST request with the given url and headers", async () => {
                const response : ResponseEntity<JsonAny| undefined> | undefined = await RequestClient.postJsonEntity("http://example.com", 'Hello', {});
                expect(mockRequestClient.jsonEntityRequest).toHaveBeenCalledWith(RequestMethod.POST, "http://example.com", {}, 'Hello');
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#putJsonEntity", () => {
            beforeEach( () => {
                (mockRequestClient.jsonEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok({'hello': 'world'})));
            });
            it("makes a PUT request with the given url and headers", async () => {
                const response : ResponseEntity<JsonAny| undefined> | undefined = await RequestClient.putJsonEntity("http://example.com", 'Hello', {});
                expect(mockRequestClient.jsonEntityRequest).toHaveBeenCalledWith(RequestMethod.PUT, "http://example.com", {}, 'Hello');
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#deleteJsonEntity", () => {
            beforeEach( () => {
                (mockRequestClient.jsonEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok({'hello': 'world'})));
            });
            it("makes a DELETE request with the given url and headers", async () => {
                const response : ResponseEntity<JsonAny| undefined> | undefined = await RequestClient.deleteJsonEntity("http://example.com", {});
                expect(mockRequestClient.jsonEntityRequest).toHaveBeenCalledWith(RequestMethod.DELETE, "http://example.com", {}, undefined);
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#patchJsonEntity", () => {
            beforeEach( () => {
                (mockRequestClient.jsonEntityRequest as any).mockImplementationOnce(() => Promise.resolve(ResponseEntity.ok({'hello': 'world'})));
            });
            it("makes a PATCH request with the given url and headers", async () => {
                const response : ResponseEntity<JsonAny| undefined> | undefined = await RequestClient.patchJsonEntity("http://example.com", 'Hello', {});
                expect(mockRequestClient.jsonEntityRequest).toHaveBeenCalledWith(RequestMethod.PATCH, "http://example.com", {}, 'Hello');
                expect(response).toBeDefined();
                expect(response.getStatusCode()).toBe(200);
                expect(response.getHeaders()).toEqual({});
                expect(response.getBody()).toStrictEqual({'hello': 'world'});
            });
        });


        describe("#textRequest", () => {
            beforeEach( () => {
                (mockRequestClient.textRequest as any).mockImplementationOnce(() => Promise.resolve('Hello World'));
            });
            it("makes a GET request with the given method, url, headers, and data", async () => {
                const response : string| undefined = await RequestClient.textRequest(RequestMethod.GET, "http://example.com", {}, "Hello");
                expect(mockRequestClient.textRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {}, "Hello");
                expect(response).toBe("Hello World");
            });
        });

        describe("#getText", () => {
            beforeEach( () => {
                (mockRequestClient.textRequest as any).mockImplementationOnce(() => Promise.resolve('Hello World'));
            });
            it("makes a GET text request with the given url and headers", async () => {
                const response : string| undefined = await RequestClient.getText("http://example.com", {});
                expect(mockRequestClient.textRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {});
                expect(response).toBe("Hello World");
            });
        });

        describe("#postText", () => {
            beforeEach( () => {
                (mockRequestClient.textRequest as any).mockImplementationOnce(() => Promise.resolve('Hello World'));
            });
            it("makes a POST request with the given url and headers", async () => {
                const response : string| undefined = await RequestClient.postText("http://example.com", 'Hello', {});
                expect(mockRequestClient.textRequest).toHaveBeenCalledWith(RequestMethod.POST, "http://example.com", {}, 'Hello');
                expect(response).toBe("Hello World");
            });
        });

        describe("#putText", () => {
            beforeEach( () => {
                (mockRequestClient.textRequest as any).mockImplementationOnce(() => Promise.resolve('Hello World'));
            });
            it("makes a PUT request with the given url and headers", async () => {
                const response : string| undefined = await RequestClient.putText("http://example.com", 'Hello', {});
                expect(mockRequestClient.textRequest).toHaveBeenCalledWith(RequestMethod.PUT, "http://example.com", {}, 'Hello');
                expect(response).toBe("Hello World");
            });
        });

        describe("#deleteText", () => {
            beforeEach( () => {
                (mockRequestClient.textRequest as any).mockImplementationOnce(() => Promise.resolve('Hello World'));
            });
            it("makes a DELETE request with the given url and headers", async () => {
                const response : string| undefined = await RequestClient.deleteText("http://example.com", {});
                expect(mockRequestClient.textRequest).toHaveBeenCalledWith(RequestMethod.DELETE, "http://example.com", {}, undefined);
                expect(response).toBe("Hello World");
            });
        });

        describe("#patchText", () => {
            beforeEach( () => {
                (mockRequestClient.textRequest as any).mockImplementationOnce(() => Promise.resolve('Hello World'));
            });
            it("makes a PATCH request with the given url and headers", async () => {
                const response : string| undefined = await RequestClient.patchText("http://example.com", 'Hello', {});
                expect(mockRequestClient.textRequest).toHaveBeenCalledWith(RequestMethod.PATCH, "http://example.com", {}, 'Hello');
                expect(response).toBe("Hello World");
            });
        });


        describe("#jsonRequest", () => {
            beforeEach( () => {
                (mockRequestClient.jsonRequest as any).mockImplementationOnce(() => Promise.resolve({'hello': 'world'}));
            });
            it("makes a GET request with the given method, url, headers, and data", async () => {
                const response : JsonAny| undefined = await RequestClient.jsonRequest(RequestMethod.GET, "http://example.com", {});
                expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {}, undefined);
                expect(response).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#getJson", () => {
            beforeEach( () => {
                (mockRequestClient.jsonRequest as any).mockImplementationOnce(() => Promise.resolve({'hello': 'world'}));
            });
            it("makes a GET request with the given url and headers", async () => {
                const response : JsonAny| undefined = await RequestClient.getJson("http://example.com", {});
                expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(RequestMethod.GET, "http://example.com", {});
                expect(response).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#postJson", () => {
            beforeEach( () => {
                (mockRequestClient.jsonRequest as any).mockImplementationOnce(() => Promise.resolve({'hello': 'world'}));
            });
            it("makes a POST request with the given url and headers", async () => {
                const response : JsonAny| undefined = await RequestClient.postJson("http://example.com", 'Hello', {});
                expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(RequestMethod.POST, "http://example.com", {}, 'Hello');
                expect(response).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#putJson", () => {
            beforeEach( () => {
                (mockRequestClient.jsonRequest as any).mockImplementationOnce(() => Promise.resolve({'hello': 'world'}));
            });
            it("makes a PUT request with the given url and headers", async () => {
                const response : JsonAny| undefined = await RequestClient.putJson("http://example.com", 'Hello', {});
                expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(RequestMethod.PUT, "http://example.com", {}, 'Hello');
                expect(response).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#deleteJson", () => {
            beforeEach( () => {
                (mockRequestClient.jsonRequest as any).mockImplementationOnce(() => Promise.resolve({'hello': 'world'}));
            });
            it("makes a DELETE request with the given url and headers", async () => {
                const response : JsonAny| undefined = await RequestClient.deleteJson("http://example.com", {});
                expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(RequestMethod.DELETE, "http://example.com", {}, undefined);
                expect(response).toStrictEqual({'hello': 'world'});
            });
        });

        describe("#patchJson", () => {
            beforeEach( () => {
                (mockRequestClient.jsonRequest as any).mockImplementationOnce(() => Promise.resolve({'hello': 'world'}));
            });
            it("makes a PATCH request with the given url and headers", async () => {
                const response : JsonAny| undefined = await RequestClient.patchJson("http://example.com", 'Hello', {});
                expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(RequestMethod.PATCH, "http://example.com", {}, 'Hello');
                expect(response).toStrictEqual({'hello': 'world'});
            });
        });

    });

});
