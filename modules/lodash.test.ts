// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { replaceAll } from "./lodash";

describe('lodash', () => {

    describe('replaceAll', () => {

        it('cannot replace missing row', () => {
            expect( replaceAll('hello world', 'foo', 'bar') ).toStrictEqual('hello world');
        });

        it('cannot replace empty row', () => {
            expect( replaceAll('', 'foo', 'bar') ).toStrictEqual('');
        });

        it('can replace string', () => {
            expect( replaceAll('hello world', 'hello', 'HELLO') ).toStrictEqual('HELLO world');
        });

        it('can replace multiple strings', () => {
            expect( replaceAll('hello hello world', 'hello', 'HELLO') ).toStrictEqual('HELLO HELLO world');
        });

        it('can replace multiple middle strings', () => {
            expect( replaceAll('123 hello 890 hello world', 'hello', 'HELLO') ).toStrictEqual('123 HELLO 890 HELLO world');
        });

        it('can replace multiple adjacent strings', () => {
            expect( replaceAll('hellohellohello', 'hello', 'HELLO') ).toStrictEqual('HELLOHELLOHELLO');
        });

        it('can replace multiple strings with replace word inside the replacement', () => {
            expect( replaceAll('hellohellohello', 'hello', 'hello123') ).toStrictEqual('hello123hello123hello123');
        });

    });

});
