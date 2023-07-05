// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createPaytrailCustomer, explainPaytrailCustomer, isPaytrailCustomer, parsePaytrailCustomer, PaytrailCustomer } from "./PaytrailCustomer";

describe('PaytrailCustomer functions', () => {

    const validCustomer: PaytrailCustomer = {
        email: 'john.doe@example.org',
        firstName: 'John',
        lastName: 'Doe',
        phone: '358451031234',
        vatId: 'FI02454583',
        companyName: 'Example company'
    };

    describe('createPaytrailCustomer', () => {

        it('should correctly create a PaytrailCustomer', () => {
            const customer = createPaytrailCustomer(
                'john.doe@example.org',
                'John',
                'Doe',
                '358451031234',
                'FI02454583',
                'Example company'
            );
            expect(customer).toEqual(validCustomer);
        });

    });

    describe('isPaytrailCustomer', () => {

        it('should return true for valid PaytrailCustomer objects', () => {
            expect(isPaytrailCustomer(validCustomer)).toBe(true);
        });

        it('should return false for invalid objects', () => {
            expect(isPaytrailCustomer({...validCustomer, email: 123})).toBe(false);
            expect(isPaytrailCustomer({...validCustomer, unknownProp: 'test'})).toBe(false);
        });

    });

    describe('explainPaytrailCustomer', () => {

        it('should return explanation OK for valid PaytrailCustomer objects', () => {
            expect(explainPaytrailCustomer(validCustomer)).toEqual('OK');
        });

        it('should return an explanation for invalid objects', () => {
            expect(explainPaytrailCustomer({...validCustomer, email: 123})).toContain('property "email"');
            expect(explainPaytrailCustomer({...validCustomer, unknownProp: 'test'})).toContain('had extra properties: unknownProp');
        });

    });

    describe('parsePaytrailCustomer', () => {

        it('should correctly parse valid PaytrailCustomer objects', () => {
            expect(parsePaytrailCustomer(validCustomer)).toEqual(validCustomer);
        });

        it('should return undefined for invalid objects', () => {
            expect(parsePaytrailCustomer({...validCustomer, email: 123})).toBeUndefined();
        });

    });

});
