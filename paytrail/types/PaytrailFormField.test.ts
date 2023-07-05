// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createPaytrailFormField, explainPaytrailFormField, explainPaytrailFormFieldOrUndefined, isPaytrailFormField, isPaytrailFormFieldOrUndefined, parsePaytrailFormField } from "./PaytrailFormField";

describe('PaytrailFormField', () => {

    const mockedPaytrailFormField = {
        name: 'testName',
        value: 'testValue',
    };

    describe('createPaytrailFormField', () => {

        it( 'should create PaytrailFormField correctly', () => {
            const result = createPaytrailFormField( 'testName', 'testValue' );
            expect( result ).toEqual( mockedPaytrailFormField );
        } );

    });

    describe('isPaytrailFormField', () => {

        it('should validate if an object is PaytrailFormField', () => {
            const result = isPaytrailFormField(mockedPaytrailFormField);
            expect(result).toBe(true);
        });

        it('should return false if the object is not PaytrailFormField', () => {
            const result = isPaytrailFormField({ name: 'testName' }); // missing 'value'
            expect(result).toBe(false);
        });

    });

    describe('explainPaytrailFormField', () => {

        it( 'should explain why an object cannot be parsed into PaytrailFormField', () => {
            const result = explainPaytrailFormField( { name: 'testName' } ); // missing 'value'
            expect( result ).toContain( 'property "value" not string' );
        } );

    });

    describe('parsePaytrailFormField', () => {

        it( 'should parse object into PaytrailFormField if it is valid', () => {
            const result = parsePaytrailFormField( mockedPaytrailFormField );
            expect( result ).toEqual( mockedPaytrailFormField );
        } );

        it( 'should return undefined if the object cannot be parsed into PaytrailFormField', () => {
            const result = parsePaytrailFormField( { name: 'testName' } ); // missing 'value'
            expect( result ).toBeUndefined();
        } );
    });

    describe('isPaytrailFormFieldOrUndefined', () => {
        it( 'should validate if a value is PaytrailFormField or undefined', () => {
            expect( isPaytrailFormFieldOrUndefined( mockedPaytrailFormField ) ).toBe( true );
            expect( isPaytrailFormFieldOrUndefined( undefined ) ).toBe( true );
            expect( isPaytrailFormFieldOrUndefined( { name: 'testName' } ) ).toBe( false ); // missing 'value'
        } );
    });

    describe('explainPaytrailFormFieldOrUndefined', () => {

        it('should explain why a value is not PaytrailFormField or undefined', () => {
            const result = explainPaytrailFormFieldOrUndefined({ name: 'testName' }); // missing 'value'
            expect(result).toContain('not PaytrailFormField or undefined');
        });

    });

});
