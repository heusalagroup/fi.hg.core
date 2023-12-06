// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { jest } from "@jest/globals";
import { FetchInterface, FetchRequestClient } from "./FetchRequestClient";
import { RequestMethod } from "../../request/types/RequestMethod";
import { ContentType } from "../../request/types/ContentType";

describe("FetchRequestClient", () => {

    let mockFetch : FetchInterface;
    let fetchRequestClient : FetchRequestClient;

    beforeEach(() => {

        const mockHeaders = {
            get: jest.fn<any>().mockReturnValue("value"),
            set: jest.fn<any>(),
            forEach: jest.fn<any>((cb: (value: string, key: string) => void) => {
                cb(ContentType.JSON, 'Content-Type');
                cb('1234', 'Length');
            })
        };

        mockFetch = jest.fn<any>().mockResolvedValue(
            {
                ok: true,
                json: jest.fn<any>().mockResolvedValue({}),
                text: jest.fn<any>().mockResolvedValue(""),
                status: 200,
                headers: mockHeaders,
                statusText: "OK"
            }
        );
        fetchRequestClient = new FetchRequestClient(mockFetch);
    });

    describe("#jsonRequest", () => {

        it("makes a GET JSON request with the given url and headers", async () => {
            const response = await fetchRequestClient.jsonRequest(RequestMethod.GET, "http://example.com", {});
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.JSON
                },
                credentials: "same-origin"
            });
            expect(response).toStrictEqual({});
        });

        it("makes a POST JSON request with the given url, headers, and data", async () => {
            const response = await fetchRequestClient.jsonRequest(RequestMethod.POST, "http://example.com", {}, { key: "value" });
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.JSON
                },
                credentials: "same-origin",
                body: '{"key":"value"}'
            });
            expect(response).toStrictEqual({});
        });

        it("makes a PUT JSON request with the given url, headers, and data", async () => {
            const response = await fetchRequestClient.jsonRequest(RequestMethod.PUT, "http://example.com", {}, { key: "value" });
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.JSON
                },
                credentials: "same-origin",
                body: '{"key":"value"}'
            });
            expect(response).toStrictEqual({});
        });

        it("makes a DELETE JSON request with the given url, headers, and data", async () => {
            const response = await fetchRequestClient.jsonRequest(RequestMethod.DELETE, "http://example.com", {}, { key: "value" });
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.JSON
                },
                credentials: "same-origin",
                body: '{"key":"value"}'
            });
            expect(response).toStrictEqual({});
        });

    });

    describe("#textRequest", () => {

        it("makes a GET text request with the given url and headers", async () => {
            const response = await fetchRequestClient.textRequest(RequestMethod.GET, "http://example.com", {});
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.TEXT
                },
                credentials: "same-origin"
            });
            expect(response).toBe("");
        });

        it("makes a POST text request with the given url and headers", async () => {
            const response = await fetchRequestClient.textRequest(RequestMethod.POST, "http://example.com", {});
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.TEXT
                },
                credentials: "same-origin"
            });
            expect(response).toBe("");
        });

        it("makes a PUT text request with the given url and headers", async () => {
            const response = await fetchRequestClient.textRequest(RequestMethod.PUT, "http://example.com", {});
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.TEXT
                },
                credentials: "same-origin"
            });
            expect(response).toBe("");
        });

        it("makes a DELETE text request with the given url and headers", async () => {
            const response = await fetchRequestClient.textRequest(RequestMethod.DELETE, "http://example.com", {});
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.TEXT
                },
                credentials: "same-origin"
            });
            expect(response).toBe("");
        });

    });

    describe("#jsonEntityRequest", () => {

        it("makes a GET JSON request with the given url and headers", async () => {
            const response = await fetchRequestClient.jsonEntityRequest(RequestMethod.GET, "http://example.com", {});
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.JSON
                },
                credentials: "same-origin"
            });
            expect(response).toBeDefined();
            expect( response.getHeaders().getFirst('Content-Type') ).toStrictEqual(ContentType.JSON);
            expect(response.getStatusCode()).toStrictEqual(200);
            expect(response.getBody()).toStrictEqual({});
        });

        it("makes a POST JSON request with the given url, headers, and data", async () => {
            const response = await fetchRequestClient.jsonEntityRequest(RequestMethod.POST, "http://example.com", {}, { key: "value" });
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.JSON
                },
                credentials: "same-origin",
                body: '{"key":"value"}'
            });
            expect(response).toBeDefined();
            expect( response.getHeaders().getFirst('Content-Type') ).toStrictEqual(ContentType.JSON);
            expect(response.getStatusCode()).toStrictEqual(200);
            expect(response.getBody()).toStrictEqual({});
        });

        it("makes a PUT JSON request with the given url, headers, and data", async () => {
            const response = await fetchRequestClient.jsonEntityRequest(RequestMethod.PUT, "http://example.com", {}, { key: "value" });
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.JSON
                },
                credentials: "same-origin",
                body: '{"key":"value"}'
            });
            expect(response).toBeDefined();
            expect( response.getHeaders().getFirst('Content-Type') ).toStrictEqual(ContentType.JSON);
            expect(response.getStatusCode()).toStrictEqual(200);
            expect(response.getBody()).toStrictEqual({});
        });

        it("makes a DELETE JSON request with the given url, headers, and data", async () => {
            const response = await fetchRequestClient.jsonEntityRequest(RequestMethod.DELETE, "http://example.com", {}, { key: "value" });
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.JSON
                },
                credentials: "same-origin",
                body: '{"key":"value"}'
            });
            expect(response).toBeDefined();
            expect( response.getHeaders().getFirst('Content-Type') ).toStrictEqual(ContentType.JSON);
            expect(response.getStatusCode()).toStrictEqual(200);
            expect(response.getBody()).toStrictEqual({});
        });

    });

    describe("#textEntityRequest", () => {

        it("makes a GET text request with the given url and headers", async () => {
            const response = await fetchRequestClient.textEntityRequest(RequestMethod.GET, "http://example.com", {});
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.TEXT
                },
                credentials: "same-origin"
            });
            expect(response).toBeDefined();
            expect( response.getHeaders().getFirst('Content-Type') ).toStrictEqual(ContentType.JSON);
            expect(response.getStatusCode()).toStrictEqual(200);
            expect(response.getBody()).toBe("");
        });

        it("makes a POST text request with the given url and headers", async () => {
            const response = await fetchRequestClient.textEntityRequest(RequestMethod.POST, "http://example.com", {});
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.TEXT
                },
                credentials: "same-origin"
            });
            expect(response).toBeDefined();
            expect( response.getHeaders().getFirst('Content-Type') ).toStrictEqual(ContentType.JSON);
            expect(response.getStatusCode()).toStrictEqual(200);
            expect(response.getBody()).toBe("");
        });

        it("makes a PUT text request with the given url and headers", async () => {
            const response = await fetchRequestClient.textEntityRequest(RequestMethod.PUT, "http://example.com", {});
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.TEXT
                },
                credentials: "same-origin"
            });
            expect(response).toBeDefined();
            expect( response.getHeaders().getFirst('Content-Type') ).toStrictEqual(ContentType.JSON);
            expect(response.getStatusCode()).toStrictEqual(200);
            expect(response.getBody()).toBe("");
        });

        it("makes a DELETE text request with the given url and headers", async () => {
            const response = await fetchRequestClient.textEntityRequest(RequestMethod.DELETE, "http://example.com", {});
            expect(mockFetch).toHaveBeenCalledWith("http://example.com", {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": ContentType.TEXT
                },
                credentials: "same-origin"
            });
            expect(response).toBeDefined();
            expect( response.getHeaders().getFirst('Content-Type') ).toStrictEqual(ContentType.JSON);
            expect(response.getStatusCode()).toStrictEqual(200);
            expect(response.getBody()).toBe("");
        });

    });

});
