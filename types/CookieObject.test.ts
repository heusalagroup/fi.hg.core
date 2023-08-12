// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { parseCookieObject, parseCookiePair } from "./CookieObject";
import { SameSite } from "./SameSite";

describe('CookieObject', () => {

    describe('parseCookieObject', () => {

        it('can parse string cookies', () => {
            expect(parseCookieObject('id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly')).toStrictEqual(
                {
                    name: 'id',
                    value: 'a3fWa',
                    expires: 'Thu, 21 Oct 2021 07:28:00 GMT',
                    secure: true,
                    httpOnly: true
                }
            );
        });

        it('can parse string cookies with SameSite=Strict', () => {
            expect(parseCookieObject('id=a3fWa; SameSite=Strict')).toStrictEqual(
                {
                    name: 'id',
                    value: 'a3fWa',
                    sameSite: SameSite.STRICT
                }
            );
        });

        it('can parse string cookies with SameSite=Lax', () => {
            expect(parseCookieObject('id=a3fWa; SameSite=Lax')).toStrictEqual(
                {
                    name: 'id',
                    value: 'a3fWa',
                    sameSite: SameSite.LAX
                }
            );
        });

        it('can parse string cookies with SameSite=None', () => {
            expect(parseCookieObject('id=a3fWa; SameSite=None')).toStrictEqual(
                {
                    name: 'id',
                    value: 'a3fWa',
                    sameSite: SameSite.NONE
                }
            );
        });

        it('can parse string cookies with path', () => {
            expect(parseCookieObject('id=a3fWa; path=/')).toStrictEqual(
                {
                    name: 'id',
                    value: 'a3fWa',
                    path: '/'
                }
            );
        });

        it('can parse string cookies with max-age', () => {
            expect(parseCookieObject('id=a3fWa; max-age=3600')).toStrictEqual(
                {
                    name: 'id',
                    value: 'a3fWa',
                    maxAge: 3600
                }
            );
        });

        it('can parse string cookies with domain', () => {
            expect(parseCookieObject('id=a3fWa; domain=example.com')).toStrictEqual(
                {
                    name: 'id',
                    value: 'a3fWa',
                    domain: 'example.com'
                }
            );
        });

    });

    describe('parseCookiePair', () => {

        it('can parse string pairs', () => {
            expect( parseCookiePair('id=a3fWa') ).toStrictEqual(['id', 'a3fWa']);
            expect( parseCookiePair('Expires=Thu, 21 Oct 2021 07:28:00 GMT') ).toStrictEqual(['Expires', 'Thu, 21 Oct 2021 07:28:00 GMT']);
            expect( parseCookiePair('Secure') ).toStrictEqual(['Secure', undefined]);
            expect( parseCookiePair('HttpOnly') ).toStrictEqual(['HttpOnly', undefined]);
        });

    });

});
