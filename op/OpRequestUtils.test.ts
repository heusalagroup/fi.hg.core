// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { jest } from '@jest/globals'
import { OpRequestUtils } from './OpRequestUtils';
import { OpAuthClient } from "./OpAuthClient";
import { ExplainCallback } from "../types/ExplainCallback";
import { RequestClient } from "../RequestClient";
import { LogLevel } from "../types/LogLevel";

const authClient: jest.Mocked<OpAuthClient> = {
    isAuthenticated: jest.fn<any>(),
    authenticate: jest.fn<any>(),
    getAccessKey: jest.fn<any>(),
};

const requestClient: jest.Mocked<RequestClient> = {
    getJson: jest.fn<any>(),
    postText: jest.fn<any>(),
} as unknown as jest.Mocked<RequestClient>;

const mockSigner = jest.fn<any>();

const isDTO : jest.Mock<any> = jest.fn<any>() as unknown as jest.Mock<any>;
const explainDTO: jest.Mock<any> & ExplainCallback = jest.fn<any>();

// Test data
const mockURL = 'https://test.com';
const mockPath = '/path';
const mockDTOName = 'DTO';
const mockToken = 'mockToken';
const mockBody = { key: 'value' };

describe('OpRequestUtils', () => {

    beforeAll(() => {
        OpRequestUtils.setLogLevel(LogLevel.NONE);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        authClient.isAuthenticated.mockReturnValue(true);
        authClient.getAccessKey.mockReturnValue(mockToken);
        requestClient.getJson.mockResolvedValue({});
        requestClient.postText.mockResolvedValue(JSON.stringify({}));
        isDTO.mockReturnValue(true);
    });

    describe('#createRequestHeaders', () => {
        it('should create headers with the provided token', () => {
            const headers = OpRequestUtils.createRequestHeaders(mockToken);
            expect(headers['Content-Type']).toEqual('application/json');
            expect(headers['Authorization']).toEqual(`Bearer ${mockToken}`);
            expect(headers['X-Request-ID']).toBeDefined();
        });
    });

    describe('#authenticateIfNot', () => {
        it('should authenticate if not already authenticated', async () => {
            authClient.isAuthenticated.mockReturnValue(false);
            await OpRequestUtils.authenticateIfNot(authClient, 'clientId', 'clientSecret');
            expect(authClient.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(authClient.authenticate).toHaveBeenCalledTimes(1);
            expect(authClient.authenticate).toHaveBeenCalledWith('clientId', 'clientSecret');
        });
    });

    describe('#getJsonRequest', () => {

        it('should successfully fetch JSON when authenticated', async () => {
            const data = await OpRequestUtils.getJsonRequest(requestClient, authClient, mockURL, mockPath, isDTO as any, explainDTO, mockDTOName);
            expect(requestClient.getJson).toHaveBeenCalledWith(`${mockURL}${mockPath}`, expect.anything());
            expect(data).toBeDefined();
        });

        it('should throw an error if not already authenticated', async () => {
            authClient.isAuthenticated.mockReturnValue(false);
            authClient.getAccessKey.mockImplementation(() => {
                throw new Error('Not authenticated');
            });
            await expect(OpRequestUtils.getJsonRequest(requestClient, authClient, mockURL, mockPath, isDTO as any, explainDTO, mockDTOName)).rejects.toThrowError('Not authenticated');
            expect(authClient.getAccessKey).toHaveBeenCalledTimes(1);
            expect(authClient.authenticate).not.toHaveBeenCalled();
        });

        it('should throw an error if the response is not a valid DTO', async () => {
            isDTO.mockReturnValue(false);
            explainDTO.mockReturnValue('Invalid DTO');
            await expect(OpRequestUtils.getJsonRequest(requestClient, authClient, mockURL, mockPath, isDTO as any, explainDTO, mockDTOName))
            .rejects
            .toThrowError(`'${mockPath}': Response was not ${mockDTOName}: Invalid DTO`);
        });

    });

    describe('#postSignedRequest', () => {

        it('should successfully post data when authenticated', async () => {
            const data = await OpRequestUtils.postSignedRequest(requestClient, authClient, mockSigner, mockURL, mockPath, mockBody, isDTO as any, explainDTO, mockDTOName);
            expect(requestClient.postText).toHaveBeenCalledWith(`${mockURL}${mockPath}`, JSON.stringify(mockBody), expect.anything());
            expect(data).toBeDefined();
        });

        it('should throw an error if not already authenticated', async () => {
            authClient.isAuthenticated.mockReturnValue(false);
            authClient.getAccessKey.mockImplementation(() => {
                throw new Error('Not authenticated');
            });
            await expect(OpRequestUtils.postSignedRequest(requestClient, authClient, mockSigner, mockURL, mockPath, mockBody, isDTO as any, explainDTO, mockDTOName)).rejects.toThrowError('Not authenticated');
            expect(authClient.getAccessKey).toHaveBeenCalledTimes(1);
            expect(authClient.authenticate).not.toHaveBeenCalled();
        });

        it('should throw an error if the response is not a valid DTO', async () => {
            isDTO.mockReturnValue(false);
            explainDTO.mockReturnValue('Invalid DTO');
            await expect(OpRequestUtils.postSignedRequest(requestClient, authClient, mockSigner, mockURL, mockPath, mockBody, isDTO as any, explainDTO, mockDTOName))
            .rejects
            .toThrowError(`'${mockPath}': Response was not ${mockDTOName}: Invalid DTO`);
        });

    });

});
