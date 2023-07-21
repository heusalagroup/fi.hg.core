// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestClient } from "../RequestClient";
import { HttpOpAuthClient } from "./HttpOpAuthClient";
import { LogLevel } from "../types/LogLevel";

describe('HttpOpAuthClient', () => {

    let mockClient: jest.Mocked<RequestClient>;

    beforeAll( () => {
        HttpOpAuthClient.setLogLevel(LogLevel.NONE);
    })

    beforeEach(() => {
        mockClient = {
            postText: jest.fn(),
        } as any;
    });

    describe('#create', () => {
        it('creates new HttpOpAuthClient instance', () => {
            const authClient = HttpOpAuthClient.create(mockClient, 'clientId', 'clientSecret');
            expect(authClient).toBeInstanceOf(HttpOpAuthClient);
        });
    });

    describe('#isAuthenticated', () => {
        it('returns false when there is no access token', () => {
            const authClient = HttpOpAuthClient.create(mockClient, 'clientId', 'clientSecret');
            expect(authClient.isAuthenticated()).toBe(false);
        });

        it('returns true when there is an access token', async () => {
            const expectedToken = 'access-token';
            mockClient.postText.mockResolvedValueOnce(JSON.stringify({ access_token: expectedToken }));
            const authClient = HttpOpAuthClient.create(mockClient, 'clientId', 'clientSecret');
            await authClient.authenticate();
            expect(authClient.isAuthenticated()).toBe(true);
        });
    });

    describe('#authenticate', () => {
        it('authenticates and sets access token correctly', async () => {
            const expectedToken = 'access-token';
            mockClient.postText.mockResolvedValueOnce(JSON.stringify({ access_token: expectedToken }));
            const authClient = HttpOpAuthClient.create(mockClient, 'clientId', 'clientSecret');

            await authClient.authenticate();
            expect(authClient.isAuthenticated()).toBe(true);
        });

        it('throws error when no token found after authentication', async () => {
            mockClient.postText.mockResolvedValueOnce(JSON.stringify({}));
            const authClient = HttpOpAuthClient.create(mockClient, 'clientId', 'clientSecret');

            await expect(authClient.authenticate()).rejects.toThrow(TypeError);
            expect(authClient.isAuthenticated()).toBe(false);
        });

    });

    describe('#getAccessKey', () => {

        it('throws an error when not authenticated', () => {
            const authClient = HttpOpAuthClient.create(mockClient, 'clientId', 'clientSecret');
            expect(() => authClient.getAccessKey()).toThrow('Not authenticated');
        });

        it('returns the access token when authenticated', async () => {
            const expectedToken = 'access-token';
            mockClient.postText.mockResolvedValueOnce(JSON.stringify({ access_token: expectedToken }));
            const authClient = HttpOpAuthClient.create(mockClient, 'clientId', 'clientSecret');

            await authClient.authenticate();
            expect(authClient.getAccessKey()).toBe(expectedToken);
        });

    });

    describe('#getAccessToken', () => {
        it('throws error when response is not a valid JSON object', async () => {
            mockClient.postText.mockResolvedValueOnce('invalid JSON string');
            await expect(HttpOpAuthClient.getAccessToken(mockClient, 'url', 'clientId', 'clientSecret')).rejects.toThrow(TypeError);
        });

        it('throws error when no access token found in the response', async () => {
            mockClient.postText.mockResolvedValueOnce(JSON.stringify({}));
            await expect(HttpOpAuthClient.getAccessToken(mockClient, 'url', 'clientId', 'clientSecret')).rejects.toThrow('No access token found in the response');
        });

        it('returns access token when it is found in the response', async () => {
            const expectedToken = 'access-token';
            mockClient.postText.mockResolvedValueOnce(JSON.stringify({ access_token: expectedToken }));
            const token = await HttpOpAuthClient.getAccessToken(mockClient, 'url', 'clientId', 'clientSecret');
            expect(token).toBe(expectedToken);
        });
    });

});
