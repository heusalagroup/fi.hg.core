// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../../jest/matchers/index";
import { find } from "../../functions/find";
import { Repository } from "../types/Repository";
import { RepositoryTestContext } from "./types/types/RepositoryTestContext";
import { Persister } from "../types/Persister";
import { createCrudRepositoryWithPersister } from "../types/CrudRepository";
import { Sort } from "../Sort";
import { Table } from "../Table";
import { Entity } from "../Entity";
import { Id } from "../Id";
import { Column } from "../Column";
import { ReadonlyJsonObject } from "../../Json";
import { isDeepStrictEqual } from "util";
import { MySqlPersister } from "../../../mysql/MySqlPersister";
import { LogLevel } from "../../types/LogLevel";
import { PersisterType } from "../persisters/types/PersisterType";
import { LogService } from "../../LogService";

const LOG = LogService.createLogger( 'typeNativeJsonTests' );

export const typeNativeJsonTests = (context : RepositoryTestContext) : void => {

    let persister : Persister;
    const persisterType = context.getPersisterType();
    const isMemory = persisterType === PersisterType.MEMORY;
    const isPg     = persisterType === PersisterType.POSTGRESQL;
    const isMySql  = persisterType === PersisterType.MYSQL;

    interface MyJsonData extends ReadonlyJsonObject {
        readonly name : string;
    }

    /**
     * Test json entities
     */
    @Table('type_test_jsonb_data')
    class DataEntity extends Entity {

        constructor (dto ?: {dataJson: MyJsonData}) {
            super()
            this.dataJson = dto?.dataJson;
        }

        @Id()
        @Column('data_id', 'BIGINT')
        public dataId ?: string;

        @Column('data_json', 'JSONB')
        public dataJson ?: MyJsonData;

    }

    interface DataRepository extends Repository<DataEntity, string> {

        findAllByDataJson (ids: readonly string[] | string, sort?: Sort) : Promise<DataEntity[]>;
        findByDataJson (id: string, sort?: Sort): Promise<DataEntity | undefined>;
        deleteAllByDataJson (id: string): Promise<void>;
        existsByDataJson (id : string): Promise<boolean>;
        countByDataJson (id : string) : Promise<number>;

        findAllByDataJson(name: MyJsonData, sort?: Sort) : Promise<DataEntity[]>;
        findByDataJson (name: MyJsonData, sort?: Sort): Promise<DataEntity | undefined>;
        deleteAllByDataJson (name: MyJsonData): Promise<void>;
        existsByDataJson (name : MyJsonData): Promise<boolean>;
        countByDataJson (name: MyJsonData) : Promise<number>;

        findAllByDataJsonBetween (start: MyJsonData, end: MyJsonData, sort?: Sort) : Promise<DataEntity[]>;
        findByDataJsonBetween (start: MyJsonData, end: MyJsonData, sort?: Sort): Promise<DataEntity | undefined>;
        deleteAllByDataJsonBetween (start: MyJsonData, end: MyJsonData): Promise<void>;
        existsByDataJsonBetween (start: MyJsonData, end: MyJsonData): Promise<boolean>;
        countByDataJsonBetween (start: MyJsonData, end: MyJsonData) : Promise<number>;

        findAllByDataJsonBefore (value: MyJsonData, sort?: Sort) : Promise<DataEntity[]>;
        findByDataJsonBefore (value: MyJsonData, sort?: Sort): Promise<DataEntity | undefined>;
        deleteAllByDataJsonBefore (value: MyJsonData): Promise<void>;
        existsByDataJsonBefore (value: MyJsonData): Promise<boolean>;
        countByDataJsonBefore (value: MyJsonData) : Promise<number>;

        findAllByDataJsonAfter (value: MyJsonData, sort?: Sort) : Promise<DataEntity[]>;
        findByDataJsonAfter (value: MyJsonData, sort?: Sort): Promise<DataEntity | undefined>;
        deleteAllByDataJsonAfter (value: MyJsonData): Promise<void>;
        existsByDataJsonAfter (value: MyJsonData): Promise<boolean>;
        countByDataJsonAfter (value: MyJsonData) : Promise<number>;

    }

    /**
     * This repository will have four items
     */
    let dataRepository : DataRepository;
    let dataEntity1 : DataEntity;
    let dataEntity2 : DataEntity;
    let dataEntity3 : DataEntity;
    let dataEntity4 : DataEntity;
    let dataEntityId1 : string;
    let dataEntityId2 : string;
    let dataEntityId3 : string;
    let dataEntityId4 : string;

    // Entity 5 is duplicate of json in dataEntityId1. This is not initialized by default
    let dataEntity5 : DataEntity;
    let dataEntityId5 : string;

    const jsonDataNameBefore1      : string = 'Bar 1';
    const jsonDataName1            : string = 'Bar 12';
    const jsonDataNameBetween1And2 : string = 'Bar 124';
    const jsonDataName2            : string = 'Bar 456';
    const jsonDataNameBetween2And3 : string = 'Bar 567';
    const jsonDataName3            : string = 'Bar 789';
    const jsonDataNameBetween3And4 : string = 'Bar 900';
    const jsonDataName4            : string = 'Bar 1200';
    const jsonDataNameAfter4       : string = 'Bar 2900';

    const jsonDataBefore1          : MyJsonData = { name: jsonDataNameBefore1 };
    const jsonDataEntity1          : MyJsonData = { name: jsonDataName1 };
    const jsonDataBetween1And2     : MyJsonData = { name: jsonDataNameBetween1And2 };
    const jsonDataEntity2          : MyJsonData = { name: jsonDataName2 };
    const jsonDataBetween2And3     : MyJsonData = { name: jsonDataNameBetween2And3 };
    const jsonDataEntity3          : MyJsonData = { name: jsonDataName3 };
    const jsonDataBetween3And4     : MyJsonData = { name: jsonDataNameBetween3And4 };
    const jsonDataEntity4          : MyJsonData = { name: jsonDataName4 };
    const jsonDataAfter4           : MyJsonData = { name: jsonDataNameAfter4 };

    // Entity 5 Must be same as dataEntityId1, but not initialized by default
    const jsonDataName5            : string = jsonDataName1;
    const jsonDataEntity5          : MyJsonData = { name: jsonDataName5 };

    beforeEach( async () => {

        MySqlPersister.setLogLevel(LogLevel.DEBUG)

        persister = context.getPersister();

        LOG.info(`Persister: ${persisterType}`);

        // Will be initialized with four entities
        dataRepository = createCrudRepositoryWithPersister<DataEntity, string, DataRepository>(
            new DataEntity(),
            persister
        );
        await dataRepository.deleteAll();

        dataEntity1 = await persister.insert(
            new DataEntity().getMetadata(),
            new DataEntity({dataJson: jsonDataEntity1}),
        );

        dataEntityId1 = dataEntity1?.dataId as string;
        if (!dataEntityId1) throw new TypeError('barEntity1 failed to initialize');
        if (!isDeepStrictEqual(dataEntity1.dataJson, jsonDataEntity1)) throw new TypeError(`barEntity1 data did not initialize correctly: ${dataEntity1.dataJson}`);

        dataEntity2 = await persister.insert(
            new DataEntity().getMetadata(),
            new DataEntity({dataJson: jsonDataEntity2}),
        );
        dataEntityId2 = dataEntity2?.dataId as string;
        if (!dataEntityId2) throw new TypeError('barEntity2 failed to initialize');
        if (dataEntityId1 === dataEntityId2) throw new TypeError(`barEntity2 failed to initialize (not unique ID with barEntityId1 and barEntityId2): ${dataEntityId1}`);
        if (!isDeepStrictEqual(dataEntity2.dataJson, jsonDataEntity2)) throw new TypeError(`barEntity2 data did not initialize correctly: ${dataEntity2.dataJson}`);

        dataEntity3 = await persister.insert(
            new DataEntity().getMetadata(),
            new DataEntity({dataJson: jsonDataEntity3}),
        );
        dataEntityId3 = dataEntity3?.dataId as string;
        if (!dataEntityId3) throw new TypeError('barEntity3 failed to initialize');
        if (dataEntityId1 === dataEntityId3) throw new TypeError(`barEntityId3 failed to initialize (not unique ID with entity 1): ${dataEntityId1}`);
        if (dataEntityId2 === dataEntityId3) throw new TypeError(`barEntityId3 failed to initialize (not unique ID with entity 2): ${dataEntityId2}`);
        if (!isDeepStrictEqual(dataEntity3.dataJson, jsonDataEntity3)) throw new TypeError(`barEntity3 data did not initialize correctly: ${dataEntity3.dataJson}`);

        dataEntity4 = await persister.insert(
            new DataEntity().getMetadata(),
            new DataEntity({dataJson: jsonDataEntity4}),
        );
        dataEntityId4 = dataEntity4?.dataId as string;
        if (!dataEntityId4) throw new TypeError('barEntity4 failed to initialize');
        if (dataEntityId1 === dataEntityId4) throw new TypeError(`barEntityId4 failed to initialize (not unique ID with entity 1): ${dataEntityId1}`);
        if (dataEntityId2 === dataEntityId4) throw new TypeError(`barEntityId4 failed to initialize (not unique ID with entity 2): ${dataEntityId2}`);
        if (dataEntityId3 === dataEntityId4) throw new TypeError(`barEntityId4 failed to initialize (not unique ID with entity 3): ${dataEntityId3}`);
        if (!isDeepStrictEqual(dataEntity4.dataJson, jsonDataEntity4)) throw new TypeError(`barEntity4 data did not initialize correctly: ${dataEntity4.dataJson}`);

    });

    describe('Create', () => {

        describe('#save', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can save fresh entity', async () => {

                expect( await dataRepository.count() ).toBe(4);

                const newEntity = new DataEntity({dataJson: { name: 'Hello world' }});

                const savedItem = await dataRepository.save(newEntity);
                expect(savedItem).toBeDefined();
                expect(savedItem.dataId).toBeDefined();
                expect(savedItem.dataJson).toStrictEqual( { name: 'Hello world' });

                const addedId : string = savedItem?.dataId as string;

                expect( await dataRepository.count() ).toBe(5);

                const foundItem = await dataRepository.findById(addedId);
                expect(foundItem).toBeDefined();
                expect(foundItem?.dataId).toBe(addedId);
                expect(foundItem?.dataJson).toStrictEqual( { name: 'Hello world' });

            });

        });

        describe('#saveAll', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can save multiple fresh entities', async () => {

                expect( await dataRepository.count() ).toBe(4);

                const newEntity1 = new DataEntity({dataJson: { name: 'Hello world 1' }});
                const newEntity2 = new DataEntity({dataJson: { name: 'Hello world 2' }});

                const savedItems = await dataRepository.saveAll([newEntity1, newEntity2]);
                expect(savedItems).toBeArray();
                expect(savedItems?.length).toBe(2);

                expect(savedItems[0]?.dataId).toBeDefined();
                expect(savedItems[0]?.dataJson).toStrictEqual( { name: 'Hello world 1' });

                expect(savedItems[1]?.dataId).toBeDefined();
                expect(savedItems[1]?.dataJson).toStrictEqual( { name: 'Hello world 2' });

                const addedId1 : string = savedItems[0]?.dataId as string;
                const addedId2 : string = savedItems[1]?.dataId as string;

                expect( await dataRepository.count() ).toBe(6);

                const foundItem1 = await dataRepository.findById(addedId1);
                expect(foundItem1).toBeDefined();
                expect(foundItem1?.dataId).toBe(addedId1);
                expect(foundItem1?.dataJson).toStrictEqual( {name: 'Hello world 1' });

                const foundItem2 = await dataRepository.findById(addedId2);
                expect(foundItem2).toBeDefined();
                expect(foundItem2?.dataId).toBe(addedId2);
                expect(foundItem2?.dataJson).toStrictEqual( { name: 'Hello world 2' });

            });

        });

    });

    describe('Read', () => {

        describe('#count', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can count entities', async () => {
                expect( await dataRepository.count() ).toBe(4);
            });

        });

        // TODO: We don't have reliable solution to implement equality
        //       query for all persisters right now.
        //       .
        //       Status:
        //       - Memory: Passed
        //       - PostgreSQL: Passed
        //       - MySQL: Failed
        //
        describe('#countByDataJson', () => {

            (isMySql ? it.skip : it)('can count entities by dataJson', async () => {
                expect( await dataRepository.countByDataJson(jsonDataEntity2) ).toBe(1);
                await dataRepository.deleteAllByDataJson(jsonDataEntity2);
                expect( await dataRepository.countByDataJson(jsonDataEntity2) ).toBe(0);
            });

        });

        // TODO: We don't have reliable solution to implement equality
        //       query for all persisters right now.
        //       .
        //       Status:
        //       - Memory: Passed
        //       - PostgreSQL: Passed
        //       - MySQL: Failed
        //
        describe('#existsByDataJson', () => {

            (isMySql ? it.skip : it)('can find if entity exists by dataJson', async () => {
                expect( await dataRepository.existsByDataJson(jsonDataEntity2) ).toBe(true);
                await dataRepository.deleteAllByDataJson(jsonDataEntity2);
                expect( await dataRepository.existsByDataJson(jsonDataEntity2) ).toBe(false);
            });

        });

        describe('#existsById', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can find if entity exists', async () => {
                expect( await dataRepository.existsById( dataEntityId2 ) ).toBe(true);
                await dataRepository.deleteAllById( [dataEntityId2] );
                expect( await dataRepository.existsById( dataEntityId2 ) ).toBe(false);
            });

        });


        describe('#findAll', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can find all entities unsorted', async () => {
                const items = await dataRepository.findAll();
                expect(items).toBeArray();
                expect(items?.length).toBe(4);

                // Order may be different
                const item1 = find(items, (item) => item.dataId === dataEntityId1);
                const item2 = find(items, (item) => item.dataId === dataEntityId2);
                const item3 = find(items, (item) => item.dataId === dataEntityId3);

                expect(item1).toBeDefined();
                expect(item1?.dataId).toBe(dataEntityId1);
                expect(item1?.dataJson).toStrictEqual(jsonDataEntity1);

                expect(item2).toBeDefined();
                expect(item2?.dataId).toBe(dataEntityId2);
                expect(item2?.dataJson).toStrictEqual(jsonDataEntity2);

                expect(item3).toBeDefined();
                expect(item3?.dataId).toBe(dataEntityId3);
                expect(item3?.dataJson).toStrictEqual(jsonDataEntity3);

            });

            // FIXME: This would be nice, but fails on MySQL and PostgreSQL still (not implemented)
            it.skip('can find all entities sorted by name and id in ascending order', async () => {

                const items = await dataRepository.findAll( Sort.by('dataJson.name', 'dataId') );
                expect(items).toBeArray();
                expect(items?.length).toBe(4);

                expect(items[0]).toBeDefined();
                expect(items[0]?.dataId).toBe(dataEntityId1);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity1);

                expect(items[1]).toBeDefined();
                expect(items[1]?.dataId).toBe(dataEntityId4);
                expect(items[1]?.dataJson).toStrictEqual(jsonDataEntity4);

                expect(items[2]).toBeDefined();
                expect(items[2]?.dataId).toBe(dataEntityId2);
                expect(items[2]?.dataJson).toStrictEqual(jsonDataEntity2);

                expect(items[3]).toBeDefined();
                expect(items[3]?.dataId).toBe(dataEntityId3);
                expect(items[3]?.dataJson).toStrictEqual(jsonDataEntity3);

            });

            // FIXME: This would be nice, but fails on MySQL and PostgreSQL still (not implemented)
            it.skip('can find all entities sorted by name and id in desc order', async () => {

                const items = await dataRepository.findAll( Sort.by(Sort.Direction.DESC, 'dataJson.name', 'dataId') );
                expect(items).toBeArray();
                expect(items?.length).toBe(4);

                expect(items[0]).toBeDefined();
                expect(items[0]?.dataId).toBe(dataEntityId3);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity3);

                expect(items[1]).toBeDefined();
                expect(items[1]?.dataId).toBe(dataEntityId2);
                expect(items[1]?.dataJson).toStrictEqual(jsonDataEntity2);

                expect(items[2]).toBeDefined();
                expect(items[2]?.dataId).toBe(dataEntityId4);
                expect(items[2]?.dataJson).toStrictEqual(jsonDataEntity4);

                expect(items[3]).toBeDefined();
                expect(items[3]?.dataId).toBe(dataEntityId1);
                expect(items[3]?.dataJson).toStrictEqual(jsonDataEntity1);

            });

        });

        describe('#findAllByDataJson', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL:
            //       - MySQL: Failed
            //
            (isMySql ? it.skip : it)('can fetch single entity by dataJson property unsorted', async () => {
                const items = await dataRepository.findAllByDataJson(jsonDataEntity2);
                expect(items).toBeArray();
                expect(items?.length).toBe(1);
                expect(items[0]).toBeDefined();
                expect(items[0]?.dataId).toBe(dataEntityId2);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity2);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            //
            (isMemory ? it : it.skip)('can fetch single entity by dataJson property in asc order', async () => {
                const items = await dataRepository.findAllByDataJson(jsonDataEntity2, Sort.by('dataJson.name'));
                expect(items).toBeArray();
                expect(items?.length).toBe(1);
                expect(items[0]).toBeDefined();
                expect(items[0]?.dataId).toBe(dataEntityId2);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity2);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            //
            (isMemory ? it : it.skip)('can fetch single entity by dataJson property in desc order', async () => {
                const items = await dataRepository.findAllByDataJson(jsonDataEntity2, Sort.by(Sort.Direction.DESC,'dataJson.name'));
                expect(items).toBeArray();
                expect(items?.length).toBe(1);
                expect(items[0]).toBeDefined();
                expect(items[0]?.dataId).toBe(dataEntityId2);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity2);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            //
            (isMySql ? it.skip : it)('can fetch multiple entities by dataJson property unsorted', async () => {

                // Initialize as same as entity 1
                dataEntity5 = await persister.insert(
                    new DataEntity().getMetadata(),
                    new DataEntity({dataJson: jsonDataEntity5}),
                );
                dataEntityId5 = dataEntity5?.dataId as string;
                if (!dataEntityId5) throw new TypeError('barEntity5 failed to initialize');
                if (dataEntityId1 === dataEntityId5) throw new TypeError(`barEntityId5 failed to initialize (not unique ID with entity 1): ${dataEntityId1}`);
                if (dataEntityId2 === dataEntityId5) throw new TypeError(`barEntityId5 failed to initialize (not unique ID with entity 2): ${dataEntityId2}`);
                if (dataEntityId3 === dataEntityId5) throw new TypeError(`barEntityId5 failed to initialize (not unique ID with entity 3): ${dataEntityId3}`);
                if (!isDeepStrictEqual(dataEntity5?.dataJson, jsonDataEntity5)) throw new TypeError(`barEntity5 data did not initialize correctly: ${dataEntity5.dataJson}`);

                const items = await dataRepository.findAllByDataJson(jsonDataEntity1);
                expect(items).toBeArray();
                expect(items?.length).toBe(2);

                const item1 = find(items, (item) => item.dataId === dataEntity1.dataId);
                const item5 = find(items, (item) => item.dataId === dataEntity5.dataId);

                expect(item1).toBeDefined();
                expect(item5).toBeDefined();
                expect(item1?.dataId).toBe(dataEntityId1);
                expect(item1?.dataJson).toStrictEqual(jsonDataEntity1);
                expect(item5?.dataId).toBe(dataEntityId5);
                expect(item5?.dataJson).toStrictEqual(jsonDataEntity5);

            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            //
            (isMySql ? it.skip : it)('can fetch multiple entities by dataId property in asc order', async () => {

                // Initialize as same as entity 1
                dataEntity5 = await persister.insert(
                    new DataEntity().getMetadata(),
                    new DataEntity({dataJson: jsonDataEntity5}),
                );
                dataEntityId5 = dataEntity5?.dataId as string;
                if (!dataEntityId5) throw new TypeError('barEntity5 failed to initialize');
                if (dataEntityId1 === dataEntityId5) throw new TypeError(`barEntityId5 failed to initialize (not unique ID with entity 1): ${dataEntityId1}`);
                if (dataEntityId2 === dataEntityId5) throw new TypeError(`barEntityId5 failed to initialize (not unique ID with entity 2): ${dataEntityId2}`);
                if (dataEntityId3 === dataEntityId5) throw new TypeError(`barEntityId5 failed to initialize (not unique ID with entity 3): ${dataEntityId3}`);
                if (!isDeepStrictEqual(dataEntity5?.dataJson, jsonDataEntity5)) throw new TypeError(`barEntity5 data did not initialize correctly: ${dataEntity5.dataJson}`);

                const items = await dataRepository.findAllByDataJson(jsonDataEntity1, Sort.by('dataJson'));
                expect(items).toBeArray();
                expect(items?.length).toBe(2);
                expect(items[0]).toBeDefined();
                expect(items[0]?.dataId).toBe(dataEntityId1);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity1);
                expect(items[1]).toBeDefined();
                expect(items[1]?.dataId).toBe(dataEntityId5);
                expect(items[1]?.dataJson).toStrictEqual(jsonDataEntity5);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            //
            (isMemory ? it : it.skip)('can fetch multiple entities by dataId property in desc order', async () => {

                // Initialize as same as entity 1
                dataEntity5 = await persister.insert(
                    new DataEntity().getMetadata(),
                    new DataEntity({dataJson: jsonDataEntity5}),
                );
                dataEntityId5 = dataEntity5?.dataId as string;
                if (!dataEntityId5) throw new TypeError('barEntity5 failed to initialize');
                if (dataEntityId1 === dataEntityId5) throw new TypeError(`barEntityId5 failed to initialize (not unique ID with entity 1): ${dataEntityId1}`);
                if (dataEntityId2 === dataEntityId5) throw new TypeError(`barEntityId5 failed to initialize (not unique ID with entity 2): ${dataEntityId2}`);
                if (dataEntityId3 === dataEntityId5) throw new TypeError(`barEntityId5 failed to initialize (not unique ID with entity 3): ${dataEntityId3}`);
                if (!isDeepStrictEqual(dataEntity5?.dataJson, jsonDataEntity5)) throw new TypeError(`barEntity5 data did not initialize correctly: ${dataEntity5.dataJson}`);

                const items = await dataRepository.findAllByDataJson(jsonDataEntity1, Sort.by(Sort.Direction.DESC,'dataJson'));
                expect(items).toBeArray();
                expect(items?.length).toBe(2);

                expect(items[0]).toBeDefined();
                expect(items[0]?.dataId).toBe(dataEntityId5);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity5);

                expect(items[1]).toBeDefined();
                expect(items[1]?.dataId).toBe(dataEntityId1);
                expect(items[1]?.dataJson).toStrictEqual(jsonDataEntity1);
            });

        });

        describe('#findAllById', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can find all entities by id unsorted', async () => {
                const items = await dataRepository.findAllById([dataEntityId2, dataEntityId3]);
                expect(items).toBeArray();
                expect(items?.length).toBe(2);
                expect(items[0]?.dataId).toBe(dataEntityId2);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity2);
                expect(items[1]?.dataId).toBe(dataEntityId3);
                expect(items[1]?.dataJson).toStrictEqual(jsonDataEntity3);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            (isMemory ? it : it.skip)('can find all entities by id in ascending order', async () => {
                const items = await dataRepository.findAllById([dataEntityId2, dataEntityId3], Sort.by('dataJson.name') );
                expect(items).toBeArray();
                expect(items?.length).toBe(2);
                expect(items[0]).toBeDefined();
                expect(items[0]?.dataId).toBe(dataEntityId2);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity2);
                expect(items[1]).toBeDefined();
                expect(items[1]?.dataId).toBe(dataEntityId3);
                expect(items[1]?.dataJson).toStrictEqual(jsonDataEntity3);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            (isMemory ? it : it.skip)('can find all entities by id in desc order', async () => {
                const items = await dataRepository.findAllById([dataEntityId2, dataEntityId3], Sort.by(Sort.Direction.DESC,'dataJson.name') );
                expect(items).toBeArray();
                expect(items?.length).toBe(2);
                expect(items[1]).toBeDefined();
                expect(items[1]?.dataId).toBe(dataEntityId2);
                expect(items[1]?.dataJson).toStrictEqual(jsonDataEntity2);
                expect(items[0]).toBeDefined();
                expect(items[0]?.dataId).toBe(dataEntityId3);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity3);
            });

        });


        describe('#find', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can find entities by property unsorted', async () => {
                const items = await dataRepository.find("dataJson", jsonDataEntity2);
                expect(items).toBeArray();
                expect(items?.length).toBe(1);
                expect(items[0]?.dataId).toBe(dataEntityId2);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity2);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            (isMemory ? it : it.skip)('can find entities by property in asc order', async () => {
                const items = await dataRepository.find("dataJson", jsonDataEntity2, Sort.by('dataJson.name'));
                expect(items).toBeArray();
                expect(items?.length).toBe(1);
                expect(items[0]?.dataId).toBe(dataEntityId2);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity2);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            (isMemory ? it : it.skip)('can find entities by property in desc order', async () => {
                const items = await dataRepository.find("dataJson", jsonDataEntity2, Sort.by(Sort.Direction.DESC,'dataJson.name'));
                expect(items).toBeArray();
                expect(items?.length).toBe(1);
                expect(items[0]?.dataId).toBe(dataEntityId2);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity2);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            (isMemory ? it : it.skip)('can find entities by child property unsorted', async () => {
                const items = await dataRepository.find("dataJson.name", jsonDataName2);
                expect(items).toBeArray();
                expect(items?.length).toBe(1);
                expect(items[0]?.dataId).toBe(dataEntityId2);
                expect(items[0]?.dataJson?.name).toStrictEqual(jsonDataName2);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            (isMemory ? it : it.skip)('can find entities by child property in asc order', async () => {
                const items = await dataRepository.find("dataJson.name", jsonDataName2, Sort.by('dataJson.name'));
                expect(items).toBeArray();
                expect(items?.length).toBe(1);
                expect(items[0]?.dataId).toBe(dataEntityId2);
                expect(items[0]?.dataJson?.name).toStrictEqual(jsonDataName2);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            (isMemory ? it : it.skip)('can find entities by child property in desc order', async () => {
                const items = await dataRepository.find("dataJson.name", jsonDataName2, Sort.by(Sort.Direction.DESC,'dataJson.name'));
                expect(items).toBeArray();
                expect(items?.length).toBe(1);
                expect(items[0]?.dataId).toBe(dataEntityId2);
                expect(items[0]?.dataJson?.name).toStrictEqual(jsonDataName2);
            });

        });

        describe('#findByDataJson', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can find entity by dataJson property unsorted', async () => {
                const entity : DataEntity | undefined = await dataRepository.findByDataJson(jsonDataEntity2);
                expect(entity).toBeDefined();
                expect(entity?.dataId).toBe(dataEntityId2);
                expect(entity?.dataJson).toStrictEqual(jsonDataEntity2);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            (isMemory ? it : it.skip)('can find entity by dataJson property in asc order', async () => {
                const entity : DataEntity | undefined = await dataRepository.findByDataJson(jsonDataEntity2, Sort.by('dataJson.name'));
                expect(entity).toBeDefined();
                expect(entity?.dataId).toBe(dataEntityId2);
                expect(entity?.dataJson).toStrictEqual(jsonDataEntity2);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            (isMemory ? it : it.skip)('can find entity by dataJson property in desc order', async () => {
                const entity : DataEntity | undefined = await dataRepository.findByDataJson(jsonDataEntity2, Sort.by(Sort.Direction.DESC,'dataJson.name'));
                expect(entity).toBeDefined();
                expect(entity?.dataId).toBe(dataEntityId2);
                expect(entity?.dataJson).toStrictEqual(jsonDataEntity2);
            });

        });

        describe('#findById', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can find entity by id unsorted', async () => {
                const item = await dataRepository.findById(dataEntityId2);
                expect(item).toBeDefined();
                expect(item?.dataId).toBe(dataEntityId2);
                expect(item?.dataJson).toStrictEqual(jsonDataEntity2);
            });

            // FIXME: This would be nice, but fails on MySQL and PostgreSQL still (not implemented)
            it.skip('can find entity by id by asc order', async () => {
                const item = await dataRepository.findById(dataEntityId2, Sort.by('dataJson.name'));
                expect(item).toBeDefined();
                expect(item?.dataId).toBe(dataEntityId2);
                expect(item?.dataJson).toStrictEqual(jsonDataEntity2);
            });

            // FIXME: This would be nice, but fails on MySQL and PostgreSQL still (not implemented)
            it.skip('can find entity by id by desc order', async () => {
                const item = await dataRepository.findById(dataEntityId2, Sort.by(Sort.Direction.DESC,'dataJson.name'));
                expect(item).toBeDefined();
                expect(item?.dataId).toBe(dataEntityId2);
                expect(item?.dataJson).toStrictEqual(jsonDataEntity2);
            });

        });

    });

    describe('Update', () => {

        describe('#save', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can save older entity', async () => {

                expect( await dataRepository.count() ).toBe(4);

                dataEntity2.dataJson = {
                    ...(dataEntity2.dataJson ? dataEntity2.dataJson : {}),
                    name: 'Hello world'
                };

                const savedItem = await dataRepository.save(dataEntity2);
                expect(savedItem).toBeDefined();
                expect(savedItem.dataId).toBe(dataEntityId2);
                expect(savedItem?.dataJson).toStrictEqual( { name: 'Hello world' });

                expect( await dataRepository.count() ).toBe(4);

                const foundItem = await dataRepository.findById(dataEntityId2);
                expect(foundItem).toBeDefined();
                expect(foundItem?.dataId).toBe(dataEntityId2);
                expect(foundItem?.dataJson).toStrictEqual( { name: 'Hello world' });

            });

        });

        describe('#saveAll', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can save multiple older entities', async () => {

                expect( await dataRepository.count() ).toBe(4);

                dataEntity2.dataJson = { name : 'Hello world 1' };
                dataEntity3.dataJson = { name : 'Hello world 2' };

                const savedItems = await dataRepository.saveAll([dataEntity2, dataEntity3]);
                expect(savedItems).toBeArray();
                expect(savedItems?.length).toBe(2);

                expect(savedItems[0].dataId).toBe(dataEntityId2);
                expect(savedItems[0].dataJson).toStrictEqual( { name: 'Hello world 1' });

                expect(savedItems[1].dataId).toBe(dataEntityId3);
                expect(savedItems[1].dataJson).toStrictEqual( { name: 'Hello world 2' });

                expect( await dataRepository.count() ).toBe(4);

                const foundItem2 = await dataRepository.findById(dataEntityId2);
                expect(foundItem2).toBeDefined();
                expect(foundItem2?.dataId).toBe(dataEntityId2);
                expect(foundItem2?.dataJson).toStrictEqual( { name: 'Hello world 1' });

                const foundItem3 = await dataRepository.findById(dataEntityId3);
                expect(foundItem3).toBeDefined();
                expect(foundItem3?.dataId).toBe(dataEntityId3);
                expect(foundItem3?.dataJson).toStrictEqual( { name: 'Hello world 2' });

            });

        });

    });

    describe('Delete', () => {

        describe('#delete', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can delete entity by entity object', async () => {

                expect( await dataRepository.count() ).toBe(4);
                await dataRepository.delete(dataEntity2);
                expect( await dataRepository.count() ).toBe(3);

                let entity : DataEntity | undefined = await dataRepository.findById(dataEntityId2);
                expect(entity).not.toBeDefined();

            });

        });

        describe('#deleteById', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can delete entity by id', async () => {

                expect( await dataRepository.count() ).toBe(4);
                await dataRepository.deleteById(dataEntityId2);
                expect( await dataRepository.count() ).toBe(3);

                let entity : DataEntity | undefined = await dataRepository.findById(dataEntityId2);
                expect(entity).not.toBeDefined();

            });

        });

        describe('#deleteAll', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can delete all entities', async () => {
                expect( await dataRepository.count() ).toBe(4);
                await dataRepository.deleteAll();
                expect( await dataRepository.count() ).toBe(0);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can delete few entities with an array of entities', async () => {

                expect( await dataRepository.count() ).toBe(4);
                await dataRepository.deleteAll(
                    [
                        dataEntity2,
                        dataEntity3
                    ]
                );
                expect( await dataRepository.count() ).toBe(2);

                let entity1 : DataEntity | undefined = await dataRepository.findById(dataEntityId1);
                expect(entity1).toBeDefined();

                let entity2 : DataEntity | undefined = await dataRepository.findById(dataEntityId2);
                expect(entity2).not.toBeDefined();

                let entity3 : DataEntity | undefined = await dataRepository.findById(dataEntityId3);
                expect(entity3).not.toBeDefined();

                let entity4 : DataEntity | undefined = await dataRepository.findById(dataEntityId4);
                expect(entity4).toBeDefined();

            });

        });

        describe('#deleteAllById', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can delete all entities by id', async () => {
                expect( await dataRepository.count() ).toBe(4);
                await dataRepository.deleteAllById( [dataEntityId2] );
                expect( await dataRepository.count() ).toBe(3);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can delete all entities by few ids', async () => {
                expect( await dataRepository.count() ).toBe(4);
                await dataRepository.deleteAllById(
                    [
                        dataEntityId2,
                        dataEntityId3
                    ]
                );
                expect( await dataRepository.count() ).toBe(2);

                let entity1 : DataEntity | undefined = await dataRepository.findById(dataEntityId1);
                expect(entity1).toBeDefined();

                let entity2 : DataEntity | undefined = await dataRepository.findById(dataEntityId2);
                expect(entity2).not.toBeDefined();

                let entity3 : DataEntity | undefined = await dataRepository.findById(dataEntityId3);
                expect(entity3).not.toBeDefined();

                let entity4 : DataEntity | undefined = await dataRepository.findById(dataEntityId4);
                expect(entity4).toBeDefined();

            });

        });

        describe('#deleteAllByDataJson', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can delete all properties by dataJson', async () => {
                await dataRepository.deleteAllByDataJson(jsonDataEntity2);
                const entity : DataEntity | undefined = await dataRepository.findByDataJson(jsonDataEntity2);
                expect(entity).not.toBeDefined();
            });

        });

    });

    // TODO: Skipped: We don't have reliable solution to implement range query for the whole JSON object or array.
    describe('Between', () => {

        describe('#findAllByDataJsonBetween', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory: Failed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            it.skip('can find all entities between values by date unordered', async () => {
                const items = await dataRepository.findAllByDataJsonBetween( { name: '1' }, { name: '2' });
                expect(items).toHaveLength(2);

                const item2 = find(items, (item) => item.dataId === dataEntityId2);
                const item3 = find(items, (item) => item.dataId === dataEntityId3);

                expect(item2).toBeDefined();
                expect(item3).toBeDefined();

                expect(item2?.dataId).toBe(dataEntityId2);
                expect(item2?.dataJson).toStrictEqual(jsonDataEntity2);

                expect(item3?.dataId).toBe(dataEntityId3);
                expect(item3?.dataJson).toStrictEqual(jsonDataEntity3);

            });

            // FIXME: This would be nice, but fails on MySQL and PostgreSQL still (not implemented)
            it.skip('can find all entities by dataId in asc order', async () => {
                const items = await dataRepository.findAllByDataJsonBetween(jsonDataEntity1, jsonDataEntity3, Sort.by('dataJson.name'));
                expect(items).toHaveLength(2);
                expect(items[0]?.dataId).toBe(dataEntityId2);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity2);
                expect(items[1]?.dataId).toBe(dataEntityId3);
                expect(items[1]?.dataJson).toStrictEqual(jsonDataEntity3);
            });

            // FIXME: This would be nice, but fails on MySQL and PostgreSQL still (not implemented)
            it.skip('can find all entities by dataId in desc order', async () => {
                const items = await dataRepository.findAllByDataJsonBetween(jsonDataEntity2, jsonDataEntity3, Sort.by(Sort.Direction.DESC,'dataJson.name'));
                expect(items).toHaveLength(2);
                expect(items[0]?.dataId).toBe(dataEntityId3);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity3);
                expect(items[1]?.dataId).toBe(dataEntityId2);
                expect(items[1]?.dataJson).toStrictEqual(jsonDataEntity2);
            });

        });

        describe('#findByDataJsonBetween', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory: Failed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            it.skip('can find an entity between times in unsorted order', async () => {
                const item = await dataRepository.findByDataJsonBetween(jsonDataBetween3And4, jsonDataAfter4);
                expect(item?.dataId).toBe(dataEntityId4);
                expect(item?.dataJson).toStrictEqual(jsonDataEntity4);
            });

            // FIXME: This would be nice, but fails on MySQL and PostgreSQL still (not implemented)
            it.skip('can find an entity between times in asc order', async () => {
                const item = await dataRepository.findByDataJsonBetween(jsonDataBefore1, jsonDataBetween1And2, Sort.by('dataJson.name'));
                expect(item?.dataId).toBe(dataEntityId1);
                expect(item?.dataJson).toStrictEqual(jsonDataEntity1);
            });

            // FIXME: This would be nice, but fails on MySQL and PostgreSQL still (not implemented)
            it.skip('can find an entity between times in desc order', async () => {
                const item = await dataRepository.findByDataJsonBetween(jsonDataBetween1And2, jsonDataBetween2And3, Sort.by(Sort.Direction.DESC,'dataJson.name'));
                expect(item?.dataId).toBe(dataEntityId2);
                expect(item?.dataJson).toStrictEqual(jsonDataEntity2);
            });

        });

        describe('#deleteAllByDataJsonBetween', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory: Failed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            it.skip('can delete all entities by barDate between range', async () => {
                await dataRepository.deleteAllByDataJsonBetween(jsonDataBefore1, jsonDataBetween3And4);
                const item = await dataRepository.count();
                expect(item).toBe(1);
            });

        });

        describe('#existsByDataJsonBetween', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now. This could be done
            //       though.
            //       .
            //       Status:
            //       - Memory: Passed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('can find if entities exist between range', async () => {
                expect( await dataRepository.existsByDataJsonBetween(jsonDataBetween1And2, jsonDataBetween3And4) ).toBe(true);
                await dataRepository.deleteAllByDataJsonBetween(jsonDataEntity2, jsonDataEntity3);
                expect( await dataRepository.existsByDataJsonBetween(jsonDataBetween1And2, jsonDataBetween3And4) ).toBe(false);
            });

        });

        describe('#countByDataJsonBetween', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory: Failed
            //       - PostgreSQL: Failed
            //       - MySQL: Failed
            it.skip('can count entities by dataId', async () => {
                expect( await dataRepository.countByDataJsonBetween(jsonDataBetween1And2, jsonDataAfter4) ).toBe(3);
                await dataRepository.deleteAllByDataJsonBetween(jsonDataBetween1And2, jsonDataAfter4);
                expect( await dataRepository.countByDataJsonBetween(jsonDataBefore1, jsonDataBetween3And4) ).toBe(1);
            });

        });

    });

    describe('Before', () => {

        describe('#findAllByDataJsonBefore', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory:
            //       - PostgreSQL: Failed
            //       - MySQL:
            it.skip('can find all entities before time, unordered', async () => {

                // Matches 1 and 2 ...OR... 2 and 1 (because unordered)
                const items = await dataRepository.findAllByDataJsonBefore(jsonDataBetween2And3);
                expect(items).toHaveLength(2);

                const item1 = find(items, (item) => item.dataId === dataEntityId1);
                const item2 = find(items, (item) => item.dataId === dataEntityId2);

                expect(item1).toBeDefined();
                expect(item2).toBeDefined();

                expect(item1?.dataId).toBe(dataEntityId1);
                expect(item1?.dataJson).toStrictEqual(jsonDataEntity1);

                expect(item2?.dataId).toBe(dataEntityId2);
                expect(item2?.dataJson).toStrictEqual(jsonDataEntity2);

            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory:
            //       - PostgreSQL: Failed
            //       - MySQL:
            it.skip('can find all entities before time, in asc order', async () => {
                // Matches 1 and 2, in asc order
                const items = await dataRepository.findAllByDataJsonBefore(jsonDataBetween2And3, Sort.by('dataJson.name'));
                expect(items).toHaveLength(2);

                expect(items[0]?.dataId).toBe(dataEntityId1);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity1);

                expect(items[1]?.dataId).toBe(dataEntityId2);
                expect(items[1]?.dataJson).toStrictEqual(jsonDataEntity2);

            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory:
            //       - PostgreSQL: Failed
            //       - MySQL:
            it.skip('can find all entities before time, in desc order', async () => {

                // Matches 2 and 1, in desc order
                const items = await dataRepository.findAllByDataJsonBefore(jsonDataBetween2And3, Sort.by(Sort.Direction.DESC,'dataJson.name'));
                expect(items).toHaveLength(2);

                expect(items[0]?.dataId).toBe(dataEntityId2);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity2);

                expect(items[1]?.dataId).toBe(dataEntityId1);
                expect(items[1]?.dataJson).toStrictEqual(jsonDataEntity1);
            });

        });

        describe('#findByDataJsonBefore', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory:
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isMySql ? it.skip : it)('cannot find an entity before there was any', async () => {
                const item = await dataRepository.findByDataJsonBefore(jsonDataBefore1);
                expect(item).toBeUndefined();
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory: Failed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isPg ? it : it.skip)('can find an entity before time in unsorted order', async () => {

                // Matches entity 1
                const item = await dataRepository.findByDataJsonBefore(jsonDataBetween1And2);
                expect(item?.dataId).toBe(dataEntityId1);
                expect(item?.dataJson).toStrictEqual(jsonDataEntity1);

            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory:
            //       - PostgreSQL: Failed
            //       - MySQL:
            it.skip('can find an entity before time in asc order', async () => {
                // Matches entity 1
                const item = await dataRepository.findByDataJsonBefore(jsonDataBetween3And4, Sort.by('dataJson.name'));
                expect(item?.dataId).toBe(dataEntityId1);
                expect(item?.dataJson).toStrictEqual(jsonDataEntity1);
            });

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory:
            //       - PostgreSQL: Failed
            //       - MySQL:
            it.skip('can find an entity before time in desc order', async () => {
                // Matches entity 3
                const item = await dataRepository.findByDataJsonBefore(jsonDataBetween3And4, Sort.by(Sort.Direction.DESC,'dataJson.name'));
                expect(item?.dataId).toBe(dataEntityId3);
                expect(item?.dataJson).toStrictEqual(jsonDataEntity3);
            });

        });

        describe('#deleteAllByDataJsonBefore', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory:
            //       - PostgreSQL: Failed
            //       - MySQL:
            it.skip('can delete all entities before time', async () => {

                // Deletes entities 1, 2 and 3
                await dataRepository.deleteAllByDataJsonBefore(jsonDataBetween3And4);

                // Matches entity 4
                expect( await dataRepository.count() ).toBe(1);

            });

        });

        describe('#existsByDataJsonBefore', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory: Failed
            //       - PostgreSQL: Passed
            //       - MySQL: Failed
            (isPg ? it : it.skip)('can find if entities exist before time', async () => {
                expect( await dataRepository.existsByDataJsonBefore(jsonDataBetween1And2) ).toBe(true);
                await dataRepository.deleteAllByDataJsonBefore(jsonDataEntity2);
                expect( await dataRepository.existsByDataJsonBefore(jsonDataBetween1And2) ).toBe(false);
            });

        });

        describe('#countByDataJsonBefore', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory:
            //       - PostgreSQL: Failed
            //       - MySQL:
            it.skip('can count entities before time', async () => {

                // Matches entities 1, 2 and 3
                expect( await dataRepository.countByDataJsonBefore(jsonDataBetween3And4) ).toBe(3);

                // Deletes entity 1
                await dataRepository.deleteAllByDataJsonBefore(jsonDataBetween1And2);

                // Matches entities 2 and 3
                expect( await dataRepository.countByDataJsonBefore(jsonDataBetween3And4) ).toBe(2);

            });

        });

    });

    // TODO: Skipped: Test which persister works
    describe('After', () => {

        describe('#findAllByDataJsonAfter', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory:
            //       - PostgreSQL: Failed
            //       - MySQL:
            it.skip('can find all entities after time, unordered', async () => {

                // Finds entities 3 and 4  ... OR .. 4 and 3
                const items = await dataRepository.findAllByDataJsonAfter(jsonDataBetween2And3);
                expect(items).toHaveLength(2);

                const item3 = find(items, (item) => item.dataId === dataEntityId3);
                const item4 = find(items, (item) => item.dataId === dataEntityId4);

                expect(item3).toBeDefined();
                expect(item4).toBeDefined();

                expect(item4?.dataId).toBe(dataEntityId4);
                expect(item4?.dataJson).toStrictEqual(jsonDataEntity4);

                expect(item3?.dataId).toBe(dataEntityId3);
                expect(item3?.dataJson).toStrictEqual(jsonDataEntity3);

            });

            // FIXME: This would be nice, but fails on MySQL and PostgreSQL still (not implemented)
            it.skip('can find all entities after time in asc order', async () => {

                // Finds entities 3 and 4 in asc order
                const items = await dataRepository.findAllByDataJsonAfter(jsonDataBetween2And3, Sort.by('dataJson.name'));
                expect(items).toHaveLength(2);
                expect(items[0]?.dataId).toBe(dataEntityId3);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity3);
                expect(items[1]?.dataId).toBe(dataEntityId4);
                expect(items[1]?.dataJson).toStrictEqual(jsonDataEntity4);
            });

            // FIXME: This would be nice, but fails on MySQL and PostgreSQL still (not implemented)
            it.skip('can find all entities after time in desc order', async () => {
                // Finds entities 4 and 3
                const items = await dataRepository.findAllByDataJsonAfter(jsonDataBetween2And3, Sort.by(Sort.Direction.DESC,'dataJson.name'));
                expect(items).toHaveLength(2);
                expect(items[0]?.dataId).toBe(dataEntityId4);
                expect(items[0]?.dataJson).toStrictEqual(jsonDataEntity4);
                expect(items[1]?.dataId).toBe(dataEntityId3);
                expect(items[1]?.dataJson).toStrictEqual(jsonDataEntity3);
            });

        });

        describe('#findByDataJsonAfter', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory:
            //       - PostgreSQL: Failed
            //       - MySQL:
            it.skip('can find an entity after time in unsorted order', async () => {
                // Matches 4
                const item = await dataRepository.findByDataJsonAfter(jsonDataBetween3And4);
                expect(item?.dataId).toBe(dataEntityId4);
                expect(item?.dataJson).toStrictEqual(jsonDataEntity4);
            });

            // FIXME: This would be nice, but fails on MySQL and PostgreSQL still (not implemented)
            it.skip('can find an entity after time in asc order', async () => {
                // Matches entities 2, 3 and 4, in asc order 2 will be first
                const item = await dataRepository.findByDataJsonAfter(jsonDataBetween1And2, Sort.by('dataJson.name'));
                expect(item?.dataId).toBe(dataEntityId2);
                expect(item?.dataJson).toStrictEqual(jsonDataEntity2);
            });

            // FIXME: This would be nice, but fails on MySQL and PostgreSQL still (not implemented)
            it.skip('can find an entity after time in DESC order', async () => {
                // Matches entities 3 and 4, in desc order 4 fill be first one
                const item = await dataRepository.findByDataJsonAfter(jsonDataBetween1And2, Sort.by(Sort.Direction.DESC,'dataJson.name'));
                expect(item?.dataId).toBe(dataEntityId4);
                expect(item?.dataJson).toStrictEqual(jsonDataEntity4);
            });

        });

        describe('#deleteAllByDataJsonAfter', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory:
            //       - PostgreSQL: Failed
            //       - MySQL:
            it.skip('can delete all entities after barDate', async () => {
                await dataRepository.deleteAllByDataJsonAfter(jsonDataBetween3And4); // Deletes item 4
                const item = await dataRepository.count();
                expect(item).toBe(3);
            });

        });

        describe('#existsByDataJsonAfter', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory:
            //       - PostgreSQL: Failed
            //       - MySQL:
            it.skip('can find if entities exist after barDate', async () => {
                expect( await dataRepository.existsByDataJsonAfter(jsonDataBetween1And2) ).toBe(true);
                await dataRepository.deleteAllByDataJsonBetween(jsonDataBetween1And2, jsonDataAfter4); // Deletes items 2, 3 and 4
                expect( await dataRepository.existsByDataJsonAfter(jsonDataBetween1And2) ).toBe(false);
            });

        });

        describe('#countByDataJsonAfter', () => {

            // TODO: We don't have reliable implementation to equality
            //       query for all persisters right now.
            //       .
            //       Status:
            //       - Memory:
            //       - PostgreSQL: Failed
            //       - MySQL:
            it.skip('can count entities after barDate', async () => {
                expect( await dataRepository.countByDataJsonAfter(jsonDataBetween1And2) ).toBe(3);
                await dataRepository.deleteAllByDataJsonAfter(jsonDataBetween1And2);
                expect( await dataRepository.countByDataJsonAfter(jsonDataBefore1) ).toBe(1);
            });

        });

    });

};
