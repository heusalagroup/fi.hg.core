// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createPaytrailItem, explainPaytrailItem, isPaytrailItem, parsePaytrailItem, PaytrailItem } from "./PaytrailItem";

describe('PaytrailItem', () => {

    const validItem: PaytrailItem = {
        unitPrice: 1000,
        units: 5,
        vatPercentage: 24,
        productCode: '9a',
        description: 'Toy dog',
        category: 'happy toys',
        orderId: '123',
        stamp: 'abc123',
        reference: 'dog-toy-5',
        merchant: '695874',
        commission: {
            merchant: '695874',
            amount: 250
        },
        deliveryDate: '2019-12-31'
    };

    describe('createPaytrailItem', () => {
        it('should correctly create a PaytrailItem', () => {
            const item = createPaytrailItem(
                1000,
                5,
                24,
                '9a',
                'Toy dog',
                'happy toys',
                '123',
                'abc123',
                'dog-toy-5',
                '695874',
                {
                    merchant: '695874',
                    amount: 250
                },
                '2019-12-31'
            );
            expect(item).toEqual(validItem);
        });
    });

    describe('isPaytrailItem', () => {

        it('should return true for valid PaytrailItem objects', () => {
            expect(isPaytrailItem(validItem)).toBe(true);
        });

        it('should return false for invalid objects', () => {
            expect(isPaytrailItem({...validItem, unitPrice: 'invalid'})).toBe(false);
            expect(isPaytrailItem({...validItem, unknownProp: 'test'})).toBe(false);
        });

    });

    describe('explainPaytrailItem', () => {

        it('should return explanation OK for valid PaytrailItem objects', () => {
            expect(explainPaytrailItem(validItem)).toEqual('OK');
        });

        it('should return an explanation for invalid objects', () => {
            expect(explainPaytrailItem({...validItem, productCode: 123})).toContain('property "productCode"');
            expect(explainPaytrailItem({...validItem, unknownProp: 'test'})).toContain('had extra properties: unknownProp');
        });

    });

    describe('parsePaytrailItem', () => {

        it('should correctly parse valid PaytrailItem objects', () => {
            expect(parsePaytrailItem(validItem)).toEqual(validItem);
        });

        it('should return undefined for invalid objects', () => {
            expect(parsePaytrailItem({...validItem, unitPrice: 'invalid'})).toBeUndefined();
        });

    });

});
