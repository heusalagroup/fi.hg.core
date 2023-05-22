// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { EntityField } from "../../types/EntityField";
import { EntityFieldType } from "../../types/EntityFieldType";
import { TemporalProperty } from "../../types/TemporalProperty";
import { TemporalType } from "../../types/TemporalType";
import { SelectQueryBuilder } from "../sql/select/SelectQueryBuilder";
import { EntitySelectQueryUtils } from "./EntitySelectQueryUtils";
import { ColumnDefinition } from "../../types/ColumnDefinition";

describe('EntitySelectQueryUtils', () => {

    describe('#includeEntityFields', () => {

        it('calls the correct methods on the builder for each field type', () => {

            const builder = {
                includeColumnAsTimestamp: jest.fn(),
                includeColumnAsTime: jest.fn(),
                includeColumnAsDate: jest.fn(),
                includeColumnAsText: jest.fn(),
                includeColumn: jest.fn()
            } as unknown as SelectQueryBuilder;

            const tableName = 'testTable';

            const fields: EntityField[] = [
                { fieldType: EntityFieldType.DATE_TIME, propertyName: 'datetime', columnName: 'date_time', nullable: false, updatable: true, insertable: true },
                { fieldType: EntityFieldType.BIGINT, propertyName: 'string', columnName: 'string_column', nullable: false, columnDefinition: ColumnDefinition.BIGINT, updatable: true, insertable: true },
            ];

            const temporalProperties: TemporalProperty[] = [
                { propertyName: 'date', temporalType: TemporalType.DATE },
                { propertyName: 'datetime', temporalType: TemporalType.TIMESTAMP },
            ];

            EntitySelectQueryUtils.includeEntityFields(builder, tableName, fields, temporalProperties);

            expect(builder.includeColumnAsTimestamp).toHaveBeenCalledWith(tableName, 'date_time', 'date_time');
            expect(builder.includeColumnAsTimestamp).toHaveBeenCalledTimes(1);

            expect(builder.includeColumnAsText).toHaveBeenCalledWith(tableName, 'string_column', 'string_column');
            expect(builder.includeColumnAsText).toHaveBeenCalledTimes(1);

            expect(builder.includeColumnAsTime).toHaveBeenCalledTimes(0);
            expect(builder.includeColumnAsDate).toHaveBeenCalledTimes(0);
            expect(builder.includeColumn).toHaveBeenCalledTimes(0);

            // Add more expect calls as needed

        });

    });

});
