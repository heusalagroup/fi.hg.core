// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { jest } from '@jest/globals'
import { createSign } from 'crypto';
import { RequestSigner } from "../types/RequestSigner";
import { OpRequestSigner } from "./OpRequestSigner";
import { LogLevel } from "../types/LogLevel";

jest.mock('crypto');

describe('OpRequestSigner', () => {
    let signingKid: string;
    let signingKey: string;
    let bodyString: string;
    let signer: RequestSigner;

    beforeAll(() => {
        OpRequestSigner.setLogLevel(LogLevel.NONE);
    });

    beforeEach(() => {
        signingKid = 'signingKid';
        signingKey = 'signingKey';
        bodyString = JSON.stringify({ key: 'value' });

        signer = OpRequestSigner.create(signingKid, signingKey);
    });

    it('creates a RequestSigner', () => {
        expect(typeof signer).toEqual('function');
    });

    describe('when the RequestSigner is used', () => {
        let signMock: jest.Mock;
        let result: string;

        beforeEach(() => {
            signMock = jest.fn().mockReturnThis();
            (signMock as any).sign = jest.fn();
            (signMock as any).write = jest.fn();
            (signMock as any).end = jest.fn();
            (createSign as jest.Mock).mockReturnValue(signMock);
        });

        it('creates a signature', () => {
            result = signer(bodyString);
            expect(createSign).toHaveBeenCalledWith('SHA256');
            expect((signMock as any).write).toHaveBeenCalledWith(expect.any(String));
            expect((signMock as any).end).toHaveBeenCalled();
            expect((signMock as any).sign).toHaveBeenCalledWith(signingKey, 'base64url');
            expect(result).toContain('..'); // Signature string contains two parts divided by '..'
        });

    });

});
