// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createPaytrailErrorDTO, explainPaytrailErrorDTO, explainPaytrailErrorDTOOrUndefined, isPaytrailErrorDTO, isPaytrailErrorDTOOrUndefined, parsePaytrailErrorDTO } from "./PaytrailErrorDTO";

describe('PaytrailErrorDTO', () => {

    const mockedErrorMessage = 'Test error message';

    const mockedPaytrailErrorDTO = {
        status: 'error',
        message: mockedErrorMessage,
    };

    describe('createPaytrailErrorDTO', () => {
        it('creates PaytrailErrorDTO correctly', () => {
            const result = createPaytrailErrorDTO(mockedErrorMessage);
            expect(result).toEqual(mockedPaytrailErrorDTO);
        });
    });

    describe('isPaytrailErrorDTO', () => {
        it('validates if an object is PaytrailErrorDTO', () => {
            const result = isPaytrailErrorDTO(mockedPaytrailErrorDTO);
            expect(result).toBe(true);
        });

        it('returns false if the object is not PaytrailErrorDTO', () => {
            const result = isPaytrailErrorDTO({ status: 'error' }); // Missing message property
            expect(result).toBe(false);
        });
    });

    describe('explainPaytrailErrorDTO', () => {
        it('explains why an object cannot be parsed into PaytrailErrorDTO', () => {
            const result = explainPaytrailErrorDTO({ status: 'error' }); // Missing message property
            expect(result).toContain('property "message" not string');
        });
    });

    describe('parsePaytrailErrorDTO', () => {
        it('parses object into PaytrailErrorDTO if it is valid', () => {
            const result = parsePaytrailErrorDTO(mockedPaytrailErrorDTO);
            expect(result).toEqual(mockedPaytrailErrorDTO);
        });

        it('returns undefined if the object cannot be parsed into PaytrailErrorDTO', () => {
            const result = parsePaytrailErrorDTO({ status: 'error' }); // Missing message property
            expect(result).toBeUndefined();
        });
    });

    describe('isPaytrailErrorDTOOrUndefined', () => {

        it('validates if a value is PaytrailErrorDTO or undefined', () => {
            expect(isPaytrailErrorDTOOrUndefined(mockedPaytrailErrorDTO)).toBe(true);
            expect(isPaytrailErrorDTOOrUndefined(undefined)).toBe(true);
            expect(isPaytrailErrorDTOOrUndefined({ status: 'error' })).toBe(false); // Missing message property
        });

    });

    describe('explainPaytrailErrorDTOOrUndefined', () => {
        it('explains why a value is not PaytrailErrorDTO or undefined', () => {
            const result = explainPaytrailErrorDTOOrUndefined({ status: 'error' }); // Missing message property
            expect(result).toContain('not PaytrailErrorDTO or undefined');
        });
    });

});
