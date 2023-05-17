// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { ObjectUtils } from "./ObjectUtils";

describe('ObjectUtils', () => {
    describe('#isReservedPropertyName', () => {

        it('can check direct property name', () => {

            class Foo {
                getName () : string {
                    return '';
                }
            }

            expect( ObjectUtils.isReservedPropertyName(Foo.prototype, 'getName')).toBe(true);
            expect( ObjectUtils.isReservedPropertyName(Foo.prototype, 'getBar')).toBe(false);

        });

        it('can check extended property name', () => {

            class Foo {
                getName () : string {
                    return '';
                }
            }

            class Bar extends Foo {
                getBar () : string {
                    return '';
                }
            }

            expect( ObjectUtils.isReservedPropertyName(Bar.prototype, 'getName')).toBe(true);
            expect( ObjectUtils.isReservedPropertyName(Bar.prototype, 'getBar')).toBe(true);
            expect( ObjectUtils.isReservedPropertyName(Bar.prototype, 'getHello')).toBe(false);

        });

        it('can check extended property name on three levels', () => {

            class Foo {
                getName () : string {
                    return '';
                }
            }

            class Bar extends Foo {
                getBar () : string {
                    return '';
                }
            }

            class Hello extends Bar {
                getHello () : string {
                    return '';
                }
            }

            expect( ObjectUtils.isReservedPropertyName(Hello.prototype, 'getName')).toBe(true);
            expect( ObjectUtils.isReservedPropertyName(Hello.prototype, 'getBar')).toBe(true);
            expect( ObjectUtils.isReservedPropertyName(Hello.prototype, 'getHello')).toBe(true);
            expect( ObjectUtils.isReservedPropertyName(Hello.prototype, 'somethingNotThere')).toBe(false);

        });

    });
});
