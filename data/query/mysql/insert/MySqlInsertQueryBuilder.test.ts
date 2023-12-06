// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { MySqlInsertQueryBuilder } from "./MySqlInsertQueryBuilder";
import { QueryBuilder } from "../../types/QueryBuilder";
import { map } from "../../../../functions/map";

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

describe('MySqlInsertQueryBuilder', () => {

    const tablePrefix = 'db1_';
    const tableName = 'cars';
    // const idColumn = 'car_id';
    const nameColumn = 'car_name';
    const ageColumn = 'car_age';
    const dateColumn = 'car_date';
    // const idProperty = 'carId';
    // const nameProperty = 'carName';
    // const ageProperty = 'carAge';
    // const dateProperty = 'carDate';
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

        it('can build insert query builder', () => {
            const builder = MySqlInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
        });

    });



    describe('#setTablePrefix', () => {

        it('can set table prefix', () => {
            const builder = MySqlInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            expect(builder.getTablePrefix()).toBe(tablePrefix);
        });

    });


    describe('#setIntoTable', () => {

        it('can set table name where to insert into', () => {
            const builder = MySqlInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);
            expect(builder.getTableName()).toBe(tableName);
        });

    });


    describe('#addColumnName', () => {

        it('can add column name', () => {

            const builder = MySqlInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);
            builder.addColumnName(nameColumn);
            builder.appendValueList(['hello']);
            const [ , values ] = builder.build();
            expect( values ).toHaveLength(3);
            expect( values[1] ).toBe(nameColumn);

        });

    });


    describe('#appendValueList', () => {

        it('can append value to insert', () => {

            const builder = MySqlInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);
            builder.addColumnName(nameColumn);
            builder.appendValueList(['hello']);

            const [ , values ] = builder.build();
            expect( values ).toHaveLength(3);
            expect( values[2] ).toBe('hello');

        });

    });



    describe('#build', () => {

        it('can build insert query for one row with single column', () => {

            const builder = MySqlInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);
            builder.addColumnName(nameColumn);
            builder.appendValueList(['hello']);

            const [ queryString, values ] = builder.build();
            expect( queryString ).toBe(`INSERT INTO ?? (??) VALUES (?)`);

            expect( values ).toHaveLength(3);
            expect( values[0] ).toBe(tablePrefix+tableName);
            expect( values[1] ).toBe(nameColumn);
            expect( values[2] ).toBe('hello');

        });

        it('can build insert query for one row with single date column', () => {

            const builder = MySqlInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);

            builder.addColumnName(dateColumn);

            builder.appendValueListUsingQueryBuilder(dateOnlyListBuilder);

            const [ queryString, values ] = builder.build();
            expect( queryString ).toBe(`INSERT INTO ?? (??) VALUES (date query)`);

            expect( values ).toHaveLength(3);
            expect( values[0] ).toBe(tablePrefix+tableName);
            expect( values[1] ).toBe(dateColumn);
            expect( values[2] ).toBe('value of date query');

        });

        it('can build insert query for one row with name and date columns', () => {

            const builder = MySqlInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);

            builder.addColumnName(nameColumn);
            builder.addColumnName(dateColumn);

            builder.appendValueListUsingQueryBuilder(nameAndDateListBuilder);

            const [ queryString, values ] = builder.build();
            expect( queryString ).toBe(`INSERT INTO ?? (??, ??) VALUES (name query, date query)`);

            expect( values ).toHaveLength(5);
            expect( values[0] ).toBe(tablePrefix+tableName);
            expect( values[1] ).toBe(nameColumn);
            expect( values[2] ).toBe(dateColumn);
            expect( values[3] ).toBe('value of name query');
            expect( values[4] ).toBe('value of date query');

        });

        it('can build insert query for two rows with name and date columns', () => {

            const builder = MySqlInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);

            builder.addColumnName(nameColumn);
            builder.addColumnName(dateColumn);

            builder.appendValueListUsingQueryBuilder(nameAndDateListBuilder);

            nameAndDateListBuilder = mockQueryBuilderFactory();
            (nameAndDateListBuilder.buildQueryString as any).mockReturnValue('name query 2, date query 2');
            (nameAndDateListBuilder.getQueryValueFactories as any).mockReturnValue([() => 'value of name query 2', () => 'value of date query 2']);

            builder.appendValueListUsingQueryBuilder(nameAndDateListBuilder);

            const [ queryString, values ] = builder.build();
            expect( queryString ).toBe(`INSERT INTO ?? (??, ??) VALUES (name query, date query), (name query 2, date query 2)`);

            expect( values ).toHaveLength(7);
            expect( values[0] ).toBe(tablePrefix+tableName);
            expect( values[1] ).toBe(nameColumn);
            expect( values[2] ).toBe(dateColumn);
            expect( values[3] ).toBe('value of name query');
            expect( values[4] ).toBe('value of date query');
            expect( values[5] ).toBe('value of name query 2');
            expect( values[6] ).toBe('value of date query 2');

        });

        it('can build insert query with two columns', () => {

            const builder = MySqlInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);



            builder.addColumnName(nameColumn);
            builder.addColumnName(ageColumn);
            builder.appendValueList(['hello', 13]);

            const [ queryString, values ] = builder.build();
            expect( queryString ).toBe(`INSERT INTO ?? (??, ??) VALUES (?, ?)`);

            expect( values ).toHaveLength(5);
            expect( values[0] ).toBe(tablePrefix+tableName);
            expect( values[1] ).toBe(nameColumn);
            expect( values[2] ).toBe(ageColumn);
            expect( values[3] ).toBe('hello');
            expect( values[4] ).toBe(13);

        });

        it('can build insert query with two columns and two rows', () => {

            const builder = MySqlInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);

            builder.addColumnName(nameColumn);
            builder.addColumnName(ageColumn);
            builder.appendValueList(['hello', 13]);
            builder.appendValueList(['world', 99]);

            const [ queryString, values ] = builder.build();
            expect( queryString ).toBe(`INSERT INTO ?? (??, ??) VALUES (?, ?), (?, ?)`);

            expect( values ).toHaveLength(7);
            expect( values[0] ).toBe(tablePrefix+tableName);
            expect( values[1] ).toBe(nameColumn);
            expect( values[2] ).toBe(ageColumn);
            expect( values[3] ).toBe('hello');
            expect( values[4] ).toBe(13);
            expect( values[5] ).toBe('world');
            expect( values[6] ).toBe(99);

        });

        it('can build insert query from an object', () => {

            const builder = MySqlInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);

            builder.addColumnName(nameColumn);
            builder.addColumnName(ageColumn);
            builder.appendValueObject(['car_name', 'car_age'], {car_name: 'hello', car_age: 13});
            builder.appendValueObject(['car_name', 'car_age'], {car_name: 'world', car_age: 99});

            const [ queryString, values ] = builder.build();
            expect( queryString ).toBe(`INSERT INTO ?? (??, ??) VALUES (?, ?), (?, ?)`);

            expect( values ).toHaveLength(7);
            expect( values[0] ).toBe(tablePrefix+tableName);
            expect( values[1] ).toBe(nameColumn);
            expect( values[2] ).toBe(ageColumn);
            expect( values[3] ).toBe('hello');
            expect( values[4] ).toBe(13);
            expect( values[5] ).toBe('world');
            expect( values[6] ).toBe(99);

        });

        it('can build insert query from an object with extra values', () => {

            const builder = MySqlInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);

            builder.addColumnName(nameColumn);
            builder.addColumnName(ageColumn);
            builder.appendValueObject(['car_name', 'car_age'],{car_name: 'hello', car_age: 13, car_term: false});
            builder.appendValueObject(['car_name', 'car_age'],{car_term: true, car_age: 99, car_name: 'world'});

            const [ queryString, values ] = builder.build();
            expect( queryString ).toBe(`INSERT INTO ?? (??, ??) VALUES (?, ?), (?, ?)`);

            expect( values ).toHaveLength(7);
            expect( values[0] ).toBe(tablePrefix+tableName);
            expect( values[1] ).toBe(nameColumn);
            expect( values[2] ).toBe(ageColumn);
            expect( values[3] ).toBe('hello');
            expect( values[4] ).toBe(13);
            expect( values[5] ).toBe('world');
            expect( values[6] ).toBe(99);

        });

    });

});
