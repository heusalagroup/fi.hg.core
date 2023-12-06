// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { jest } from '@jest/globals';
import { RequestClientImpl } from "../RequestClientImpl";
import { OpAuthClientImpl } from "./OpAuthClientImpl";
import { LogLevel } from "../types/LogLevel";

describe('OpAuthClientImpl', () => {

    let mockClient: jest.Mocked<RequestClientImpl>;

    beforeAll( () => {
        OpAuthClientImpl.setLogLevel(LogLevel.NONE);
    })

    beforeEach(() => {
        mockClient = {
            postText: jest.fn<any>(),
        } as any;
    });

    describe('#create', () => {
        it('creates new OpAuthClientImpl instance', () => {
            const authClient = OpAuthClientImpl.create(mockClient);
            expect(authClient).toBeInstanceOf(OpAuthClientImpl);
        });
    });

    describe('#isAuthenticated', () => {
        it('returns false when there is no access token', () => {
            const authClient = OpAuthClientImpl.create(mockClient);
            expect(authClient.isAuthenticated()).toBe(false);
        });

        it('returns true when there is an access token', async () => {
            const expectedToken = 'access-token';
            mockClient.postText.mockResolvedValueOnce(JSON.stringify({ access_token: expectedToken }));
            const authClient = OpAuthClientImpl.create(mockClient);
            await authClient.authenticate('clientId', 'clientSecret');
            expect(authClient.isAuthenticated()).toBe(true);
        });
    });

    describe('#authenticate', () => {
        it('authenticates and sets access token correctly', async () => {
            const expectedToken = 'access-token';
            mockClient.postText.mockResolvedValueOnce(JSON.stringify({ access_token: expectedToken }));
            const authClient = OpAuthClientImpl.create(mockClient);

            await authClient.authenticate('clientId', 'clientSecret');
            expect(authClient.isAuthenticated()).toBe(true);
        });

        it('throws error when no token found after authentication', async () => {
            mockClient.postText.mockResolvedValueOnce(JSON.stringify({}));
            const authClient = OpAuthClientImpl.create(mockClient);

            await expect(authClient.authenticate('clientId', 'clientSecret')).rejects.toThrow(TypeError);
            expect(authClient.isAuthenticated()).toBe(false);
        });

    });

    describe('#getAccessKey', () => {

        it('throws an error when not authenticated', () => {
            const authClient = OpAuthClientImpl.create(mockClient);
            expect(() => authClient.getAccessKey()).toThrow('Not authenticated');
        });

        it('returns the access token when authenticated', async () => {
            const expectedToken = 'access-token';
            mockClient.postText.mockResolvedValueOnce(JSON.stringify({ access_token: expectedToken }));
            const authClient = OpAuthClientImpl.create(mockClient);

            await authClient.authenticate('clientId', 'clientSecret');
            expect(authClient.getAccessKey()).toBe(expectedToken);
        });

    });

    describe('#getAccessToken', () => {
        it('throws error when response is not a valid JSON object', async () => {
            mockClient.postText.mockResolvedValueOnce('invalid JSON string');
            await expect(OpAuthClientImpl.getAccessToken(mockClient, 'url', 'clientId', 'clientSecret')).rejects.toThrow(TypeError);
        });

        it('throws error when no access token found in the response', async () => {
            mockClient.postText.mockResolvedValueOnce(JSON.stringify({}));
            await expect(OpAuthClientImpl.getAccessToken(mockClient, 'url', 'clientId', 'clientSecret')).rejects.toThrow('No access token found in the response');
        });

        it('returns access token when it is found in the response', async () => {
            const expectedToken = 'access-token';
            mockClient.postText.mockResolvedValueOnce(JSON.stringify({ access_token: expectedToken }));
            const token = await OpAuthClientImpl.getAccessToken(mockClient, 'url', 'clientId', 'clientSecret');
            expect(token).toBe(expectedToken);
        });
    });

});
