// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { MySqlUpdateQueryBuilder } from "./MySqlUpdateQueryBuilder";
import { QueryBuilder } from "../../types/QueryBuilder";
import { map } from "../../../../functions/map";
import { MySqlListQueryBuilder } from "../types/MySqlListQueryBuilder";
import { MySqlAndChainBuilder } from "../formulas/MySqlAndChainBuilder";

/**
 * Note: This mock can be modified by changing return values of `buildQueryString` and
 * `getQueryValueFactories`. The default implementations for `.buildQueryValues()`
 * and `.build()` use these two.
 */
export const mockQueryBuilderFactory = (): QueryBuilder => {
    let me : QueryBuilder = {
        valueOf: jest.fn<any>().mockReturnValue(''),
        toString: jest.fn<any>().mockReturnValue(''),
        build: jest.fn<any>().mockImplementation(() => [me.buildQueryString(), me.buildQueryValues()]),
        buildQueryString: jest.fn<any>().mockReturnValue('query'),
        buildQueryValues: jest.fn<any>().mockImplementation(() => map(me.getQueryValueFactories(), item => item())),
        getQueryValueFactories: jest.fn<any>().mockReturnValue([() => 'value of query']),
    };
    return me;
};

describe('MySqlUpdateQueryBuilder', () => {

    const tablePrefix = 'db1_';
    const tableName = 'cars';
    const idColumn = 'car_id';
    const nameColumn = 'car_name';
    // const ageColumn = 'car_age';
    const dateColumn = 'car_date';
    // const idProperty = 'carId';
    // const nameProperty = 'carName';
    // const ageProperty = 'carAge';
    // const dateProperty = 'carDate';
    const dateValue = '2023-04-04T14:58:59Z';
    const dateValueInDb = '2023-04-04 14:58:59';
    let dateOnlyListBuilder : QueryBuilder;
    let nameAndDateListBuilder : QueryBuilder;

    beforeAll( () => {

        dateOnlyListBuilder = mockQueryBuilderFactory();
        (dateOnlyListBuilder.buildQueryString as any).mockReturnValue('date query');
        (dateOnlyListBuilder.getQueryValueFactories as any).mockReturnValue([() => 'value of date query']);

        nameAndDateListBuilder = mockQueryBuilderFactory();
        (nameAndDateListBuilder.buildQueryString as any).mockReturnValue('name query, date query');
        (nameAndDateListBuilder.getQueryValueFactories as any).mockReturnValue([() => 'value of name query', () => 'value of date query']);

    });

    beforeEach( () => {
        jest.clearAllMocks();
    });

    describe('#create', () => {

        it('can build update query builder', () => {
            const builder = MySqlUpdateQueryBuilder.create();
            expect( builder ).toBeDefined();
        });

    });

    describe('#setTablePrefix', () => {

        it('can set table prefix', () => {
            const builder = MySqlUpdateQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            expect(builder.getTablePrefix()).toBe(tablePrefix);
        });

    });

    describe('#setTableName', () => {

        it('can set table name which to update', () => {
            const builder = MySqlUpdateQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);
            expect(builder.getTableName()).toBe(tableName);
        });

    });

    describe('#getCompleteTableName', () => {

        it('can get full table name which to update', () => {
            const builder = MySqlUpdateQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);
            expect(builder.getCompleteTableName()).toBe(tablePrefix+tableName);
        });

    });

    describe('#build', () => {

        it('can build update query with single column', () => {

            const builder = MySqlUpdateQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);

            const setList = MySqlListQueryBuilder.create();
            setList.setAssignmentWithParam(nameColumn, 'hello');
            builder.appendSetListUsingQueryBuilder(setList);

            const where = MySqlAndChainBuilder.create();
            where.setColumnEquals(tablePrefix+tableName, idColumn, "1");
            builder.setWhereFromQueryBuilder(where);

            const [ queryString, values ] = builder.build();
            expect( queryString ).toBe(`UPDATE ?? SET ?? = ? WHERE (??.?? = ?)`);

            expect( values ).toHaveLength(6);
            expect( values[0] ).toBe(tablePrefix+tableName);
            expect( values[1] ).toBe(nameColumn);
            expect( values[2] ).toBe('hello');
            expect( values[3] ).toBe(tablePrefix+tableName);
            expect( values[4] ).toBe(idColumn);
            expect( values[5] ).toBe("1");

        });

        it('can build update query with single date column', () => {

            const builder = MySqlUpdateQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);

            const setList = MySqlListQueryBuilder.create();
            setList.setAssignmentWithParamAsTimestamp(dateColumn, dateValue);
            builder.appendSetListUsingQueryBuilder(setList);

            const where = MySqlAndChainBuilder.create();
            where.setColumnEquals(tablePrefix+tableName, idColumn, "1");
            builder.setWhereFromQueryBuilder(where);

            const [ queryString, values ] = builder.build();
            expect( queryString ).toBe(`UPDATE ?? SET ?? = DATE_FORMAT(?, '%Y-%m-%d %H:%i:%s') WHERE (??.?? = ?)`);

            expect( values ).toHaveLength(6);
            expect( values[0] ).toBe(tablePrefix+tableName);
            expect( values[1] ).toBe(dateColumn);
            expect( values[2] ).toBe(dateValueInDb);
            expect( values[3] ).toBe(tablePrefix+tableName);
            expect( values[4] ).toBe(idColumn);
            expect( values[5] ).toBe("1");

        });

        it('can build update query for one row with name and date columns', () => {

            const builder = MySqlUpdateQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);

            const setList = MySqlListQueryBuilder.create();
            setList.setAssignmentWithParam(nameColumn, 'hello');
            setList.setAssignmentWithParamAsTimestamp(dateColumn, dateValue);
            builder.appendSetListUsingQueryBuilder(setList);

            const where = MySqlAndChainBuilder.create();
            where.setColumnEquals(tablePrefix+tableName, idColumn, "1");
            builder.setWhereFromQueryBuilder(where);

            const [ queryString, values ] = builder.build();
            expect( queryString ).toBe(`UPDATE ?? SET ?? = ?, ?? = DATE_FORMAT(?, '%Y-%m-%d %H:%i:%s') WHERE (??.?? = ?)`);

            expect( values ).toHaveLength(8);
            expect( values[0] ).toBe(tablePrefix+tableName);
            expect( values[1] ).toBe(nameColumn);
            expect( values[2] ).toBe('hello');
            expect( values[3] ).toBe(dateColumn);
            expect( values[4] ).toBe(dateValueInDb);
            expect( values[5] ).toBe(tablePrefix+tableName);
            expect( values[6] ).toBe(idColumn);
            expect( values[7] ).toBe("1");

        });

    });

});
