// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { AuthorizationUtils } from "./AuthorizationUtils";

describe('AuthorizationUtils', () => {

    describe('createBasicHeader', () => {
        it('should create a Basic header from the given token', () => {
            const token = 'test_token';
            const expectedHeader = 'Basic test_token';
            const header = AuthorizationUtils.createBasicHeader(token);

            expect(header).toEqual(expectedHeader);
        });
    });

    describe('createBasicHeaderWithUserAndPassword', () => {

        it('should create a Basic header with Base64-encoded username and password', () => {
            const username = 'test_user';
            const password = 'test_password';
            const expectedHeader = `Basic dGVzdF91c2VyOnRlc3RfcGFzc3dvcmQ=`;
            const header = AuthorizationUtils.createBasicHeaderWithUserAndPassword(username, password);

            expect(header).toEqual(expectedHeader);
        });

        it('should create a Basic header with Base64-encoded username and password with special characters', () => {
            const username = 'test user %123$!^ääå,.-/|\&%€#"\'!`¨*;:_,.-<>§°@';
            const password = 'test password %123$!^ääå,.-/|\&%€#"\'!`¨*;:_,.-<>§°@';
            const expectedHeader = `Basic dGVzdCB1c2VyICUxMjMkIV7DpMOkw6UsLi0vfCYl4oKsIyInIWDCqCo7Ol8sLi08PsKnwrBAOnRlc3QgcGFzc3dvcmQgJTEyMyQhXsOkw6TDpSwuLS98JiXigqwjIichYMKoKjs6XywuLTw+wqfCsEA=`;
            const header = AuthorizationUtils.createBasicHeaderWithUserAndPassword(username, password);

            expect(header).toEqual(expectedHeader);
        });

    });

    describe('parseBasicToken', () => {

        it('should return the token from the Basic header', () => {
            const token = 'dGVzdCB1c2VyICUxMjMkIV7k5OU6dGVzdCB1c2VyICUxMjMkIV7k5A==';
            const header = `Basic ${token}`;
            const parsedToken = AuthorizationUtils.parseBasicToken(header);

            expect(parsedToken).toEqual(token);
        });

        it('should return undefined if the header does not start with "Basic "', () => {
            const header = 'Bearer dGVzdCB1c2VyICUxMjMkIV7k5OU6dGVzdCB1c2VyICUxMjMkIV7k5A==';
            const parsedToken = AuthorizationUtils.parseBasicToken(header);

            expect(parsedToken).toBeUndefined();
        });

    });

    describe('createBearerHeader', () => {
        it('should create a Bearer header from the given token', () => {
            const token = 'dGVzdCB1c2VyICUxMjMkIV7k5OU6dGVzdCB1c2VyICUxMjMkIV7k5A==';
            const expectedHeader = 'Bearer dGVzdCB1c2VyICUxMjMkIV7k5OU6dGVzdCB1c2VyICUxMjMkIV7k5A==';
            const header = AuthorizationUtils.createBearerHeader(token);

            expect(header).toEqual(expectedHeader);
        });
    });

    describe('parseBearerToken', () => {

        it('should return the token from the Bearer header', () => {
            const token = 'test_token';
            const header = `Bearer ${token}`;
            const parsedToken = AuthorizationUtils.parseBearerToken(header);

            expect(parsedToken).toEqual(token);
        });

        it('should return undefined if the header does not start with "Bearer "', () => {
            const header = 'Basic test_token';
            const parsedToken = AuthorizationUtils.parseBearerToken(header);

            expect(parsedToken).toBeUndefined();
        });

    });

});
