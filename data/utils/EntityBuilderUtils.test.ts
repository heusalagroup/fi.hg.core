// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { ColumnSelectorCallback, EntityBuilderUtils } from "./EntityBuilderUtils";
import { EntityField } from "../types/EntityField";
import { EntityFieldType } from "../types/EntityFieldType";
import { TemporalProperty } from "../types/TemporalProperty";
import { TemporalType } from "../types/TemporalType";
import { ColumnDefinition } from "../types/ColumnDefinition";

describe('EntityBuilderUtils', () => {

    describe('#includeFields', () => {

        const tableName = 'testTable';

        let asTimestamp: ColumnSelectorCallback;
        let asTime: ColumnSelectorCallback;
        let asDate: ColumnSelectorCallback;
        let asBigint: ColumnSelectorCallback;
        let asSelf: ColumnSelectorCallback;

        beforeEach( () => {
            asTimestamp = jest.fn();
            asTime = jest.fn();
            asDate = jest.fn();
            asBigint = jest.fn();
            asSelf = jest.fn();

        });

        it('calls the correct callback based on the UNKNOWN field without columnDefinition', () => {

            const fields: EntityField[] = [
                {
                    fieldType: EntityFieldType.UNKNOWN,
                    propertyName: 'dateTime',
                    columnName: 'date_time',
                    nullable: false,
                    insertable: true,
                    updatable: true
                },
            ];

            const temporalProperties: TemporalProperty[] = [
            ];

            EntityBuilderUtils.includeFields(
                tableName,
                fields,
                temporalProperties,
                asTimestamp,
                asTime,
                asDate,
                asBigint,
                asSelf,
            );

            expect(asSelf).toHaveBeenCalledWith(tableName, 'date_time', 'dateTime');
            expect(asSelf).toHaveBeenCalledTimes(1);

            expect(asTimestamp).toHaveBeenCalledTimes(0);
            expect(asBigint).toHaveBeenCalledTimes(0);
            expect(asTime).toHaveBeenCalledTimes(0);
            expect(asDate).toHaveBeenCalledTimes(0);

            // Add more expect calls as needed

        });

        it('calls the correct callback based on the UNKNOWN field with columnDefinition as TIMESTAMP', () => {

            const fields: EntityField[] = [
                {
                    fieldType: EntityFieldType.UNKNOWN,
                    propertyName: 'dateTime',
                    columnName: 'date_time',
                    nullable: false,
                    insertable: true,
                    updatable: true,
                    columnDefinition: ColumnDefinition.TIMESTAMP
                },
            ];

            const temporalProperties: TemporalProperty[] = [
            ];

            EntityBuilderUtils.includeFields(
                tableName,
                fields,
                temporalProperties,
                asTimestamp,
                asTime,
                asDate,
                asBigint,
                asSelf,
            );

            expect(asTimestamp).toHaveBeenCalledWith(tableName, 'date_time', 'dateTime');
            expect(asTimestamp).toHaveBeenCalledTimes(1);

            expect(asSelf).toHaveBeenCalledTimes(0);
            expect(asBigint).toHaveBeenCalledTimes(0);
            expect(asTime).toHaveBeenCalledTimes(0);
            expect(asDate).toHaveBeenCalledTimes(0);

        });

        it('calls the correct callback based on the UNKNOWN field with temporal property as TIMESTAMP', () => {

            const fields: EntityField[] = [
                {
                    fieldType: EntityFieldType.UNKNOWN,
                    propertyName: 'dateTime',
                    columnName: 'date_time',
                    nullable: false,
                    updatable: true,
                    insertable: true
                },
            ];

            const temporalProperties: TemporalProperty[] = [
                {propertyName: 'dateTime', temporalType: TemporalType.TIMESTAMP}
            ];

            EntityBuilderUtils.includeFields(
                tableName,
                fields,
                temporalProperties,
                asTimestamp,
                asTime,
                asDate,
                asBigint,
                asSelf,
            );

            expect(asTimestamp).toHaveBeenCalledWith(tableName, 'date_time', 'dateTime');
            expect(asTimestamp).toHaveBeenCalledTimes(1);

            expect(asSelf).toHaveBeenCalledTimes(0);
            expect(asBigint).toHaveBeenCalledTimes(0);
            expect(asTime).toHaveBeenCalledTimes(0);
            expect(asDate).toHaveBeenCalledTimes(0);

            // Add more expect calls as needed

        });

        it('calls the correct callback based on the BIGINT column definition', () => {

            const fields: EntityField[] = [
                { fieldType: EntityFieldType.UNKNOWN, propertyName: 'fooId', columnName: 'foo_id', nullable: false, columnDefinition: ColumnDefinition.BIGINT, updatable: true, insertable: true },
            ];

            const temporalProperties: TemporalProperty[] = [
            ];

            EntityBuilderUtils.includeFields(
                tableName,
                fields,
                temporalProperties,
                asTimestamp,
                asTime,
                asDate,
                asBigint,
                asSelf,
            );

            expect(asBigint).toHaveBeenCalledWith(tableName, 'foo_id', 'fooId');
            expect(asBigint).toHaveBeenCalledTimes(1);

            expect(asSelf).toHaveBeenCalledTimes(0);
            expect(asTimestamp).toHaveBeenCalledTimes(0);
            expect(asTime).toHaveBeenCalledTimes(0);
            expect(asDate).toHaveBeenCalledTimes(0);

            // Add more expect calls as needed

        });

        it('calls multiple correct callbacks based on the field and temporal properties', () => {

            const fields: EntityField[] = [
                { fieldType: EntityFieldType.DATE_TIME, propertyName: 'dateTime', columnName: 'date_time', nullable: false, columnDefinition: ColumnDefinition.TIMESTAMP, updatable: true, insertable: true },
                { fieldType: EntityFieldType.STRING, propertyName: 'string', columnName: 'string_column', nullable: false, columnDefinition: ColumnDefinition.BIGINT, updatable: true, insertable: true },
                { fieldType: EntityFieldType.NUMBER, propertyName: 'number', columnName: 'number_column', nullable: false, updatable: true, insertable: true },
                // Add more field types as needed
            ];

            const temporalProperties: TemporalProperty[] = [
                { propertyName: 'time', temporalType: TemporalType.TIME },
                { propertyName: 'date', temporalType: TemporalType.DATE },
                // Add more temporal properties as needed
            ];

            EntityBuilderUtils.includeFields(
                tableName,
                fields,
                temporalProperties,
                asTimestamp,
                asTime,
                asDate,
                asBigint,
                asSelf,
            );

            expect(asTimestamp).toHaveBeenCalledWith(tableName, 'date_time', 'dateTime');
            expect(asTimestamp).toHaveBeenCalledTimes(1);

            expect(asBigint).toHaveBeenCalledWith(tableName, 'string_column', 'string');
            expect(asBigint).toHaveBeenCalledTimes(1);

            expect(asSelf).toHaveBeenCalledWith(tableName, 'number_column', 'number');
            expect(asSelf).toHaveBeenCalledTimes(1);

            expect(asTime).toHaveBeenCalledTimes(0);
            expect(asDate).toHaveBeenCalledTimes(0);

        });

    });

});
