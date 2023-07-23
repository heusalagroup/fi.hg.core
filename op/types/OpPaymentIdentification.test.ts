// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createOpPaymentIdentification, explainOpPaymentIdentification, explainOpPaymentIdentificationOrUndefined, isOpPaymentIdentification, isOpPaymentIdentificationOrUndefined, OpPaymentIdentification, parseOpPaymentIdentification } from "./OpPaymentIdentification";
import { OpIdentificationScheme } from "./OpIdentificationScheme";

describe('OpPaymentIdentification', () => {
    let testObject: OpPaymentIdentification;
    let wrongObject: any;

    beforeEach(() => {
        testObject = createOpPaymentIdentification(
            "123456789",
            OpIdentificationScheme.BIC,
            "TestIssuer"
        );

        wrongObject = {
            id: 123456789, // Should be a string, not a number
            schemeName: "WrongScheme",
            issuer: 123 // Should be a string or undefined
        };
    });

    describe('createOpPaymentIdentification', () => {
        it('should correctly create an OpPaymentIdentification object', () => {
            expect(testObject.id).toBe("123456789");
            expect(testObject.schemeName).toBe(OpIdentificationScheme.BIC);
            expect(testObject.issuer).toBe("TestIssuer");
        });
    });

    describe('isOpPaymentIdentification', () => {
        it('should correctly identify OpPaymentIdentification objects', () => {
            expect(isOpPaymentIdentification(testObject)).toBe(true);
            expect(isOpPaymentIdentification(wrongObject)).toBe(false);
        });
    });

    describe('explainOpPaymentIdentification', () => {
        it('should provide correct explanation for OpPaymentIdentification objects', () => {
            expect(explainOpPaymentIdentification(testObject)).toEqual('OK');
            expect(explainOpPaymentIdentification(wrongObject)).toContain('property "id" not string');
            expect(explainOpPaymentIdentification(wrongObject)).toContain('property "schemeName" incorrect enum value "WrongScheme" for OpIdentificationScheme: Accepted values BIC, COID, TXID, SOSE, UNSTRUCTURED_ORG, UNSTRUCTURED_PERSON');
            expect(explainOpPaymentIdentification(wrongObject)).toContain('property "issuer" not string or undefined');
        });
    });

    describe('parseOpPaymentIdentification', () => {
        it('should correctly parse valid objects to OpPaymentIdentification', () => {
            expect(parseOpPaymentIdentification(testObject)).toEqual(testObject);
            expect(parseOpPaymentIdentification(wrongObject)).toBeUndefined();
        });
    });

    describe('isOpPaymentIdentificationOrUndefined', () => {
        it('should correctly identify OpPaymentIdentification or undefined', () => {
            expect(isOpPaymentIdentificationOrUndefined(testObject)).toBe(true);
            expect(isOpPaymentIdentificationOrUndefined(undefined)).toBe(true);
            expect(isOpPaymentIdentificationOrUndefined(wrongObject)).toBe(false);
        });
    });

    describe('explainOpPaymentIdentificationOrUndefined', () => {
        it('should provide correct explanation for OpPaymentIdentification or undefined', () => {
            expect(explainOpPaymentIdentificationOrUndefined(testObject)).toEqual('OK');
            expect(explainOpPaymentIdentificationOrUndefined(undefined)).toEqual('OK');
            expect(explainOpPaymentIdentificationOrUndefined(wrongObject)).toEqual('not OpPaymentIdentification or undefined');
        });
    });
});
