// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createWpRenderedDTO, isWpRenderedDTO } from "./WpRenderedDTO";

describe('WpRenderedDTO', () => {

    describe('createWpRenderedDTO', () => {

        it('can create DTO with false protected', () => {
            const test = createWpRenderedDTO('<h1>Contact Us</h1>\n', false);
            expect(test.rendered).toBe('<h1>Contact Us</h1>\n');
            expect(test.protected).toBe(false);
        });

        it('can create DTO with true protected', () => {
            const test = createWpRenderedDTO('<h1>Contact Us</h1>\n', true);
            expect(test.rendered).toBe('<h1>Contact Us</h1>\n');
            expect(test.protected).toBe(true);
        });

        it('can create DTO without protected argument', () => {
            const test = createWpRenderedDTO('<h1>Contact Us</h1>\n');
            expect(test.rendered).toBe('<h1>Contact Us</h1>\n');
            expect(test.protected).toBeUndefined();
        });

        it('can create DTO with protected argument as undefined', () => {
            const test = createWpRenderedDTO('<h1>Contact Us</h1>\n', undefined);
            expect(test.rendered).toBe('<h1>Contact Us</h1>\n');
            expect(test.protected).toBeUndefined();
        });

    });

    describe('isWpRenderedDTO', () => {

        it('can test DTO with protected as false', () => {
            const test = {rendered: '<h1>Contact Us</h1>\n', protected: false};
            expect(isWpRenderedDTO(test)).toBe(true);
        });

        it('can test DTO with protected as true', () => {
            const test = {rendered: '<h1>Contact Us</h1>\n', protected: true};
            expect(isWpRenderedDTO(test)).toBe(true);
        });

        it('can test DTO with protected as undefined', () => {
            const test = {rendered: '<h1>Contact Us</h1>\n', protected: undefined};
            expect(isWpRenderedDTO(test)).toBe(true);
        });

        it('can test DTO with protected missing', () => {
            const test = {rendered: '<h1>Contact Us</h1>\n'};
            expect(isWpRenderedDTO(test)).toBe(true);
        });

    });

});
