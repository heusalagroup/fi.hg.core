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
import { Temporal } from "../Temporal";
import { TemporalType } from "../types/TemporalType";
import { CreationTimestamp } from "../CreationTimestamp";

export const basicCrudTests = (context : RepositoryTestContext) : void => {

    /**
     * Test entity for tests that require empty repository
     */
    @Table('foos')
    class FooEntity extends Entity {
        constructor (dto ?: {fooName: string, fooDate: string | undefined, nonUpdatable : string}) {
            super()
            this.fooName = dto?.fooName;
            this.fooDate = dto?.fooDate;
            this.nonUpdatable = dto?.nonUpdatable ?? '';
        }

        @Id()
        @Column('foo_id', 'BIGINT', {updatable: false})
        public fooId ?: string;

        @CreationTimestamp()
        @Column('foo_date', 'timestamp')
        @Temporal(TemporalType.TIMESTAMP)
        public fooDate ?: string;

        @Column('foo_name')
        public fooName ?: string;

        @Column('non_updatable', undefined, {updatable: false})
        public nonUpdatable ?: string;

    }

    /**
     * Test entity for tests which require non-empty repository
     */
    @Table('bars')
    class BarEntity extends Entity {

        constructor (dto ?: {barName: string, barDate: string}) {
            super()
            const barName = dto?.barName ?? undefined;
            const barDate = dto?.barDate ?? undefined;
            this.barName = barName;
            this.barDate = barDate;
        }

        @Id()
        @Column('bar_id', 'BIGINT', {updatable: false})
        public barId ?: string;

        @Temporal(TemporalType.TIMESTAMP)
        @Column('bar_date', 'timestamp')
        public barDate ?: string;

        @Column('bar_name')
        public barName ?: string;

    }

    interface FooRepository extends Repository<FooEntity, string> {

        findAllByFooName(name: string, sort?: Sort) : Promise<FooEntity[]>;
        findByFooName (name: string, sort?: Sort): Promise<FooEntity | undefined>;
        deleteAllByFooName (name: string): Promise<void>;
        existsByFooName (name : string): Promise<boolean>;
        countByFooName (name: string) : Promise<number>;

        findAllByFooId (ids: readonly string[], sort?: Sort) : Promise<FooEntity[]>;
        findByFooId (id: string, sort?: Sort): Promise<FooEntity | undefined>;
        deleteAllByFooId (id: string): Promise<void>;
        existsByFooId (id : string): Promise<boolean>;
        countByFooId (id : string) : Promise<number>;

        findAllByFooDateBetween (start: string, end: string, sort?: Sort) : Promise<FooEntity[]>;
        findByFooDateBetween (start: string, end: string, sort?: Sort): Promise<FooEntity | undefined>;
        deleteAllByFooDateBetween (start: string, end: string): Promise<void>;
        existsByFooDateBetween (start: string, end: string): Promise<boolean>;
        countByFooDateBetween (start: string, end: string) : Promise<number>;

    }

    interface BarRepository extends Repository<BarEntity, string> {

        findAllByBarName(name: string, sort?: Sort) : Promise<BarEntity[]>;
        findByBarName (name: string, sort?: Sort): Promise<BarEntity | undefined>;
        deleteAllByBarName (name: string): Promise<void>;
        existsByBarName (name : string): Promise<boolean>;
        countByBarName (name : string) : Promise<number>;

        findAllByBarId(id: string, sort?: Sort) : Promise<BarEntity[]>;
        findByBarId (id: string, sort?: Sort) : Promise<BarEntity | undefined>;
        deleteAllByBarId (id: string) : Promise<void>;
        existsByBarId (id : string) : Promise<boolean>;
        countByBarId (id : string) : Promise<number>;

        findAllByBarDateBetween (start: string, end: string, sort?: Sort) : Promise<BarEntity[]>;
        findByBarDateBetween (start: string, end: string, sort?: Sort): Promise<BarEntity | undefined>;
        deleteAllByBarDateBetween (start: string, end: string): Promise<void>;
        existsByBarDateBetween (start: string, end: string): Promise<boolean>;
        countByBarDateBetween (start: string, end: string) : Promise<number>;

        findAllByBarDateBefore (value: string, sort?: Sort) : Promise<BarEntity[]>;
        findByBarDateBefore (value: string, sort?: Sort): Promise<BarEntity | undefined>;
        deleteAllByBarDateBefore (value: string): Promise<void>;
        existsByBarDateBefore (value: string): Promise<boolean>;
        countByBarDateBefore (value: string) : Promise<number>;

        findAllByBarDateAfter (value: string, sort?: Sort) : Promise<BarEntity[]>;
        findByBarDateAfter (value: string, sort?: Sort): Promise<BarEntity | undefined>;
        deleteAllByBarDateAfter (value: string): Promise<void>;
        existsByBarDateAfter (value: string): Promise<boolean>;
        countByBarDateAfter (value: string) : Promise<number>;

    }

    let persister : Persister;

    /**
     * This is an empty repository for testing
     */
    let fooRepository : FooRepository;

    /**
     * This repository will have four items
     */
    let barRepository : BarRepository;
    let barEntity1 : BarEntity;
    let barEntity2 : BarEntity;
    let barEntity3 : BarEntity;
    let barEntity4 : BarEntity;
    let barEntityId1 : string;
    let barEntityId2 : string;
    let barEntityId3 : string;
    let barEntityId4 : string;

    let barEntityName1 : string = 'Bar 123';
    let barEntityName2 : string = 'Bar 456';
    let barEntityName3 : string = 'Bar 789';
    let barEntityName4 : string = 'Bar 123';

    let dateBeforeEntity1       : string = '2023-04-04T14:58:59Z';
    let barEntityDate1          : string = '2023-04-30T10:03:12Z';
    let dateBetweenEntity1And2  : string = '2023-05-02T17:44:14Z';
    let barEntityDate2          : string = '2023-05-11T17:12:03Z';
    let dateBetweenEntity2And3  : string = '2023-05-11T17:57:00Z';
    let barEntityDate3          : string = '2023-05-12T07:44:12Z';
    let dateBetweenEntity3And4  : string = '2023-05-12T15:30:42Z';
    let barEntityDate4          : string = '2023-05-12T15:55:39Z';
    let dateAfterEntity4        : string = '2023-05-12T15:55:59Z';

    beforeEach( async () => {

        persister = context.getPersister();

        // Will be initialized with no entities
        fooRepository = createCrudRepositoryWithPersister<FooEntity, string, FooRepository>(
            new FooEntity(),
            persister
        );
        await fooRepository.deleteAll();

        // Will be initialized with four entities
        barRepository = createCrudRepositoryWithPersister<BarEntity, string, BarRepository>(
            new BarEntity(),
            persister
        );
        await barRepository.deleteAll();

        barEntity1 = await persister.insert(
            new BarEntity().getMetadata(),
            new BarEntity({barName: barEntityName1, barDate: barEntityDate1}),
        );

        barEntityId1 = barEntity1?.barId as string;
        if (!barEntityId1) throw new TypeError('barEntity1 failed to initialize');
        if (barEntity1.barDate !== barEntityDate1) throw new TypeError(`barEntity1 date did not initialize correctly: ${barEntity1.barDate}`);

        barEntity2 = await persister.insert(
            new BarEntity().getMetadata(),
            new BarEntity({barName: barEntityName2, barDate: barEntityDate2}),
        );
        barEntityId2 = barEntity2?.barId as string;
        if (!barEntityId2) throw new TypeError('barEntity2 failed to initialize');
        if (barEntityId1 === barEntityId2) throw new TypeError(`barEntity2 failed to initialize (not unique ID with barEntityId1 and barEntityId2): ${barEntityId1}`);
        if (barEntity2.barDate !== barEntityDate2) throw new TypeError(`barEntity1 date did not initialize correctly: ${barEntity2.barDate}`);


        barEntity3 = await persister.insert(
            new BarEntity().getMetadata(),
            new BarEntity({barName: barEntityName3, barDate: barEntityDate3}),
        );
        barEntityId3 = barEntity3?.barId as string;
        if (!barEntityId3) throw new TypeError('barEntity3 failed to initialize');
        if (barEntityId1 === barEntityId3) throw new TypeError(`barEntityId3 failed to initialize (not unique ID with entity 1): ${barEntityId1}`);
        if (barEntityId2 === barEntityId3) throw new TypeError(`barEntityId3 failed to initialize (not unique ID with entity 2): ${barEntityId2}`);
        if (barEntity3.barDate !== barEntityDate3) throw new TypeError(`barEntity1 date did not initialize correctly: ${barEntity3.barDate}`);

        barEntity4 = await persister.insert(
            new BarEntity().getMetadata(),
            new BarEntity({barName: barEntityName4, barDate: barEntityDate4}),
        );
        barEntityId4 = barEntity4?.barId as string;
        if (!barEntityId4) throw new TypeError('barEntity4 failed to initialize');
        if (barEntityId1 === barEntityId4) throw new TypeError(`barEntityId4 failed to initialize (not unique ID with entity 1): ${barEntityId1}`);
        if (barEntityId2 === barEntityId4) throw new TypeError(`barEntityId4 failed to initialize (not unique ID with entity 2): ${barEntityId2}`);
        if (barEntityId3 === barEntityId4) throw new TypeError(`barEntityId4 failed to initialize (not unique ID with entity 3): ${barEntityId3}`);
        if (barEntity4.barDate !== barEntityDate4) throw new TypeError(`barEntity1 date did not initialize correctly: ${barEntity4.barDate}`);

    });

    describe('#count', () => {

        it('can count entities', async () => {
            expect( await barRepository.count() ).toBe(4);
        });

    });

    describe('#delete', () => {

        it('can delete entity by entity object', async () => {

            expect( await barRepository.count() ).toBe(4);
            await barRepository.delete(barEntity2);
            expect( await barRepository.count() ).toBe(3);

            let entity : BarEntity | undefined = await barRepository.findByBarId(barEntityId2);
            expect(entity).not.toBeDefined();

        });

    });

    describe('#deleteById', () => {

        it('can delete entity by id', async () => {

            expect( await barRepository.count() ).toBe(4);
            await barRepository.deleteById(barEntityId2);
            expect( await barRepository.count() ).toBe(3);

            let entity : BarEntity | undefined = await barRepository.findByBarId(barEntityId2);
            expect(entity).not.toBeDefined();

        });

    });

    describe('#deleteAll', () => {

        it('can delete all entities', async () => {
            expect( await barRepository.count() ).toBe(4);
            await barRepository.deleteAll();
            expect( await barRepository.count() ).toBe(0);
        });

        it('can delete all entities with few ids', async () => {

            expect( await barRepository.count() ).toBe(4);
            await barRepository.deleteAll(
                [
                    barEntity2,
                    barEntity3
                ]
            );
            expect( await barRepository.count() ).toBe(2);

            let entity1 : BarEntity | undefined = await barRepository.findByBarId(barEntityId1);
            expect(entity1).toBeDefined();

            let entity2 : BarEntity | undefined = await barRepository.findByBarId(barEntityId2);
            expect(entity2).not.toBeDefined();

            let entity3 : BarEntity | undefined = await barRepository.findByBarId(barEntityId3);
            expect(entity3).not.toBeDefined();

            let entity4 : BarEntity | undefined = await barRepository.findByBarId(barEntityId4);
            expect(entity4).toBeDefined();

        });

    });

    describe('#deleteAllById', () => {

        it('can delete all entities by id', async () => {
            expect( await barRepository.count() ).toBe(4);
            await barRepository.deleteAllById( [barEntityId2] );
            expect( await barRepository.count() ).toBe(3);
        });

        it('can delete all entities by few ids', async () => {
            expect( await barRepository.count() ).toBe(4);
            await barRepository.deleteAllById(
                [
                    barEntityId2,
                    barEntityId3
                ]
            );
            expect( await barRepository.count() ).toBe(2);

            let entity1 : BarEntity | undefined = await barRepository.findByBarId(barEntityId1);
            expect(entity1).toBeDefined();

            let entity2 : BarEntity | undefined = await barRepository.findByBarId(barEntityId2);
            expect(entity2).not.toBeDefined();

            let entity3 : BarEntity | undefined = await barRepository.findByBarId(barEntityId3);
            expect(entity3).not.toBeDefined();

            let entity4 : BarEntity | undefined = await barRepository.findByBarId(barEntityId4);
            expect(entity4).toBeDefined();

        });

    });

    describe('#existsById', () => {

        it('can find if entity exists', async () => {
            expect( await barRepository.existsById( barEntityId2 ) ).toBe(true);
            await barRepository.deleteAllById( [barEntityId2] );
            expect( await barRepository.existsById( barEntityId2 ) ).toBe(false);
        });

    });

    describe('#findAll', () => {

        it('can find all entities unsorted', async () => {
            const items = await barRepository.findAll();
            expect(items).toBeArray();
            expect(items?.length).toBe(4);

            // Order may be different
            const item1 = find(items, (item) => item.barId === barEntityId1);
            const item2 = find(items, (item) => item.barId === barEntityId2);
            const item3 = find(items, (item) => item.barId === barEntityId3);

            expect(item1).toBeDefined();
            expect(item1?.barId).toBe(barEntityId1);
            expect(item1?.barName).toBe(barEntityName1);

            expect(item2).toBeDefined();
            expect(item2?.barId).toBe(barEntityId2);
            expect(item2?.barName).toBe(barEntityName2);

            expect(item3).toBeDefined();
            expect(item3?.barId).toBe(barEntityId3);
            expect(item3?.barName).toBe(barEntityName3);

        });

        it('can find all entities sorted by name and id in ascending order', async () => {

            const items = await barRepository.findAll( Sort.by('barName', 'barId') );
            expect(items).toBeArray();
            expect(items?.length).toBe(4);

            expect(items[0]).toBeDefined();
            expect(items[0]?.barId).toBe(barEntityId1);
            expect(items[0]?.barName).toBe(barEntityName1);

            expect(items[1]).toBeDefined();
            expect(items[1]?.barId).toBe(barEntityId4);
            expect(items[1]?.barName).toBe(barEntityName4);

            expect(items[2]).toBeDefined();
            expect(items[2]?.barId).toBe(barEntityId2);
            expect(items[2]?.barName).toBe(barEntityName2);

            expect(items[3]).toBeDefined();
            expect(items[3]?.barId).toBe(barEntityId3);
            expect(items[3]?.barName).toBe(barEntityName3);

        });

        it('can find all entities sorted by name and id in desc order', async () => {

            const items = await barRepository.findAll( Sort.by(Sort.Direction.DESC, 'barName', 'barId') );
            expect(items).toBeArray();
            expect(items?.length).toBe(4);

            expect(items[0]).toBeDefined();
            expect(items[0]?.barId).toBe(barEntityId3);
            expect(items[0]?.barName).toBe(barEntityName3);

            expect(items[1]).toBeDefined();
            expect(items[1]?.barId).toBe(barEntityId2);
            expect(items[1]?.barName).toBe(barEntityName2);

            expect(items[2]).toBeDefined();
            expect(items[2]?.barId).toBe(barEntityId4);
            expect(items[2]?.barName).toBe(barEntityName4);

            expect(items[3]).toBeDefined();
            expect(items[3]?.barId).toBe(barEntityId1);
            expect(items[3]?.barName).toBe(barEntityName1);

        });

    });

    describe('#findAllById', () => {

        it('can find all entities by id unsorted', async () => {
            const items = await barRepository.findAllById([barEntityId2, barEntityId3]);
            expect(items).toBeArray();
            expect(items?.length).toBe(2);
            expect(items[0]?.barId).toBe(barEntityId2);
            expect(items[0]?.barName).toBe(barEntityName2);
            expect(items[1]?.barId).toBe(barEntityId3);
            expect(items[1]?.barName).toBe(barEntityName3);
        });

        it('can find all entities by id in ascending order', async () => {
            const items = await barRepository.findAllById([barEntityId2, barEntityId3], Sort.by('barName') );
            expect(items).toBeArray();
            expect(items?.length).toBe(2);
            expect(items[0]).toBeDefined();
            expect(items[0]?.barId).toBe(barEntityId2);
            expect(items[0]?.barName).toBe(barEntityName2);
            expect(items[1]).toBeDefined();
            expect(items[1]?.barId).toBe(barEntityId3);
            expect(items[1]?.barName).toBe(barEntityName3);
        });

        it('can find all entities by id in desc order', async () => {
            const items = await barRepository.findAllById([barEntityId2, barEntityId3], Sort.by(Sort.Direction.DESC,'barName') );
            expect(items).toBeArray();
            expect(items?.length).toBe(2);
            expect(items[1]).toBeDefined();
            expect(items[1]?.barId).toBe(barEntityId2);
            expect(items[1]?.barName).toBe(barEntityName2);
            expect(items[0]).toBeDefined();
            expect(items[0]?.barId).toBe(barEntityId3);
            expect(items[0]?.barName).toBe(barEntityName3);
        });

    });

    describe('#findById', () => {

        it('can find entity by id unsorted', async () => {
            const item = await barRepository.findById(barEntityId2);
            expect(item).toBeDefined();
            expect(item?.barId).toBe(barEntityId2);
            expect(item?.barName).toBe(barEntityName2);
        });

        it('can find entity by id by asc order', async () => {
            const item = await barRepository.findById(barEntityId2, Sort.by('barName'));
            expect(item).toBeDefined();
            expect(item?.barId).toBe(barEntityId2);
            expect(item?.barName).toBe(barEntityName2);
        });

        it('can find entity by id by desc order', async () => {
            const item = await barRepository.findById(barEntityId2, Sort.by(Sort.Direction.DESC,'barName'));
            expect(item).toBeDefined();
            expect(item?.barId).toBe(barEntityId2);
            expect(item?.barName).toBe(barEntityName2);
        });

    });

    describe('#find', () => {

        it('can find entities by property unsorted', async () => {
            const items = await barRepository.find("barName", barEntityName2);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]?.barId).toBe(barEntityId2);
            expect(items[0]?.barName).toBe(barEntityName2);
        });

        it('can find entities by property in asc order', async () => {
            const items = await barRepository.find("barName", barEntityName2, Sort.by('barName'));
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]?.barId).toBe(barEntityId2);
            expect(items[0]?.barName).toBe(barEntityName2);
        });

        it('can find entities by property in desc order', async () => {
            const items = await barRepository.find("barName", barEntityName2, Sort.by(Sort.Direction.DESC,'barName'));
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]?.barId).toBe(barEntityId2);
            expect(items[0]?.barName).toBe(barEntityName2);
        });

    });

    describe('#save', () => {

        it('can save fresh entity', async () => {

            expect( await fooRepository.count() ).toBe(0);

            const newEntity = new FooEntity({fooName: 'Hello world', fooDate: '2023-05-12T15:42:09+03:00', nonUpdatable: 'hello'});

            const savedItem = await fooRepository.save(newEntity);
            expect(savedItem).toBeDefined();
            expect(savedItem.fooId).toBeDefined();
            expect(savedItem.fooName).toBe('Hello world');

            const addedId : string = savedItem?.fooId as string;

            expect( await fooRepository.count() ).toBe(1);

            const foundItem = await fooRepository.findById(addedId);
            expect(foundItem).toBeDefined();
            expect(foundItem?.fooId).toBe(addedId);
            expect(foundItem?.fooName).toBe('Hello world');

        });

        it('can save fresh entity with undefined field', async () => {

            expect( await fooRepository.count() ).toBe(0);

            const newEntity = new FooEntity({fooName: 'Hello world', fooDate: undefined, nonUpdatable: 'hello'});

            const savedItem = await fooRepository.save(newEntity);
            expect(savedItem).toBeDefined();
            expect(savedItem.fooId).toBeDefined();
            expect(savedItem.fooName).toBe('Hello world');
            expect(savedItem.fooDate).toBeDefined();

            expect( await fooRepository.count() ).toBe(1);

        });

        it('can save fresh entity with non-updatable column', async () => {

            expect( await fooRepository.count() ).toBe(0);

            const newEntity = new FooEntity({fooName: 'Hello world', fooDate: '2023-05-12T15:42:09+03:00', nonUpdatable: 'hello'});

            const savedItem = await fooRepository.save(newEntity);
            expect(savedItem).toBeDefined();
            expect(savedItem.fooId).toBeDefined();
            expect(savedItem.fooName).toBe('Hello world');
            expect(savedItem.nonUpdatable).toBe('hello');

            const addedId : string = savedItem?.fooId as string;

            expect( await fooRepository.count() ).toBe(1);

            const foundItem = await fooRepository.findById(addedId);
            expect(foundItem).toBeDefined();
            expect(foundItem?.fooId).toBe(addedId);
            expect(foundItem?.fooName).toBe('Hello world');
            expect(foundItem?.nonUpdatable).toBe('hello');

        });

        it('can save older entity', async () => {

            expect( await barRepository.count() ).toBe(4);

            barEntity2.barName = 'Hello world';

            const savedItem = await barRepository.save(barEntity2);
            expect(savedItem).toBeDefined();
            expect(savedItem.barId).toBe(barEntityId2);
            expect(savedItem.barName).toBe('Hello world');

            expect( await barRepository.count() ).toBe(4);

            const foundItem = await barRepository.findById(barEntityId2);
            expect(foundItem).toBeDefined();
            expect(foundItem?.barId).toBe(barEntityId2);
            expect(foundItem?.barName).toBe('Hello world');

        });

        it('cannot save older entity with non-updatable field when no other field has changed', async () => {

            expect( await fooRepository.count() ).toBe(0);

            const newEntity = new FooEntity({fooName: 'Hello world', fooDate: '2023-05-12T15:42:09+03:00', nonUpdatable: 'hello'});

            let savedItem = await fooRepository.save(newEntity);
            expect(savedItem).toBeDefined();
            expect(savedItem.fooId).toBeDefined();
            expect(savedItem.fooName).toBe('Hello world');
            expect(savedItem.nonUpdatable).toBe('hello');

            let addedId : string = savedItem?.fooId as string;

            expect( await fooRepository.count() ).toBe(1);

            let foundItem : FooEntity | undefined = await fooRepository.findById(addedId);
            expect(foundItem).toBeDefined();
            expect(foundItem?.fooId).toBe(addedId);
            expect(foundItem?.fooName).toBe('Hello world');
            expect(foundItem?.nonUpdatable).toBe('hello');

            if (!foundItem) throw new TypeError(`foundItem not defined`);

            foundItem.nonUpdatable = 'Something else';

            savedItem = await fooRepository.save(foundItem);
            expect(savedItem).toBeDefined();
            expect(savedItem.fooId).toBeDefined();
            expect(savedItem.fooName).toBe('Hello world');
            expect(savedItem.nonUpdatable).toBe('hello');

            addedId = savedItem?.fooId as string;

            expect( await fooRepository.count() ).toBe(1);

            foundItem = await fooRepository.findById(addedId);
            expect(foundItem).toBeDefined();
            expect(foundItem?.fooId).toBe(addedId);
            expect(foundItem?.fooName).toBe('Hello world');
            expect(foundItem?.nonUpdatable).toBe('hello');

        });

        it('cannot save older entity with non-updatable field when some other field has changed', async () => {

            expect( await fooRepository.count() ).toBe(0);

            const newEntity = new FooEntity({fooName: 'Hello world', fooDate: '2023-05-12T15:42:09+03:00', nonUpdatable: 'hello'});

            let savedItem = await fooRepository.save(newEntity);
            expect(savedItem).toBeDefined();
            expect(savedItem.fooId).toBeDefined();
            expect(savedItem.fooName).toBe('Hello world');
            expect(savedItem.nonUpdatable).toBe('hello');

            let addedId : string = savedItem?.fooId as string;

            expect( await fooRepository.count() ).toBe(1);

            let foundItem : FooEntity | undefined = await fooRepository.findById(addedId);
            expect(foundItem).toBeDefined();
            expect(foundItem?.fooId).toBe(addedId);
            expect(foundItem?.fooName).toBe('Hello world');
            expect(foundItem?.nonUpdatable).toBe('hello');

            if (!foundItem) throw new TypeError(`foundItem not defined`);

            foundItem.nonUpdatable = 'Something else';
            foundItem.fooName = 'New name';

            savedItem = await fooRepository.save(foundItem);
            expect(savedItem).toBeDefined();
            expect(savedItem.fooId).toBeDefined();
            expect(savedItem.fooName).toBe('New name');
            expect(savedItem.nonUpdatable).toBe('hello');

            addedId = savedItem?.fooId as string;

            expect( await fooRepository.count() ).toBe(1);

            foundItem = await fooRepository.findById(addedId);
            expect(foundItem).toBeDefined();
            expect(foundItem?.fooId).toBe(addedId);
            expect(foundItem?.fooName).toBe('New name');
            expect(foundItem?.nonUpdatable).toBe('hello');

        });

    });

    describe('#saveAll', () => {

        it('can save fresh entities', async () => {

            expect( await fooRepository.count() ).toBe(0);

            const newEntity1 = new FooEntity({fooName: 'Hello world 1', fooDate: '2023-05-12T10:22:32+03:00', nonUpdatable: 'hello'});
            const newEntity2 = new FooEntity({fooName: 'Hello world 2', fooDate: '2023-05-12T15:42:09+03:00', nonUpdatable: 'hello'});

            const savedItems = await fooRepository.saveAll([newEntity1, newEntity2]);
            expect(savedItems).toBeArray();
            expect(savedItems?.length).toBe(2);

            expect(savedItems[0]?.fooId).toBeDefined();
            expect(savedItems[0]?.fooName).toBe('Hello world 1');

            expect(savedItems[1]?.fooId).toBeDefined();
            expect(savedItems[1]?.fooName).toBe('Hello world 2');

            const addedId1 : string = savedItems[0]?.fooId as string;
            const addedId2 : string = savedItems[1]?.fooId as string;

            expect( await fooRepository.count() ).toBe(2);

            const foundItem1 = await fooRepository.findById(addedId1);
            expect(foundItem1).toBeDefined();
            expect(foundItem1?.fooId).toBe(addedId1);
            expect(foundItem1?.fooName).toBe('Hello world 1');

            const foundItem2 = await fooRepository.findById(addedId2);
            expect(foundItem2).toBeDefined();
            expect(foundItem2?.fooId).toBe(addedId2);
            expect(foundItem2?.fooName).toBe('Hello world 2');

        });

        it('can save older entities', async () => {

            expect( await barRepository.count() ).toBe(4);

            barEntity2.barName = 'Hello world 1';
            barEntity3.barName = 'Hello world 2';

            const savedItems = await barRepository.saveAll([barEntity2, barEntity3]);
            expect(savedItems).toBeArray();
            expect(savedItems?.length).toBe(2);

            expect(savedItems[0].barId).toBe(barEntityId2);
            expect(savedItems[0].barName).toBe('Hello world 1');

            expect(savedItems[1].barId).toBe(barEntityId3);
            expect(savedItems[1].barName).toBe('Hello world 2');

            expect( await barRepository.count() ).toBe(4);

            const foundItem2 = await barRepository.findById(barEntityId2);
            expect(foundItem2).toBeDefined();
            expect(foundItem2?.barId).toBe(barEntityId2);
            expect(foundItem2?.barName).toBe('Hello world 1');

            const foundItem3 = await barRepository.findById(barEntityId3);
            expect(foundItem3).toBeDefined();
            expect(foundItem3?.barId).toBe(barEntityId3);
            expect(foundItem3?.barName).toBe('Hello world 2');

        });

    });



    describe('#findAllByBarName', () => {

        it('can fetch single entity by barName property unsorted', async () => {
            const items = await barRepository.findAllByBarName(barEntityName2);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]).toBeDefined();
            expect(items[0]?.barId).toBe(barEntityId2);
            expect(items[0]?.barName).toBe(barEntityName2);
        });

        it('can fetch single entity by barName property in asc order', async () => {
            const items = await barRepository.findAllByBarName(barEntityName2, Sort.by('barName'));
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]).toBeDefined();
            expect(items[0]?.barId).toBe(barEntityId2);
            expect(items[0]?.barName).toBe(barEntityName2);
        });

        it('can fetch single entity by barName property in desc order', async () => {
            const items = await barRepository.findAllByBarName(barEntityName2, Sort.by(Sort.Direction.DESC,'barName'));
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]).toBeDefined();
            expect(items[0]?.barId).toBe(barEntityId2);
            expect(items[0]?.barName).toBe(barEntityName2);
        });

        it('can fetch multiple entities by barName property unsorted', async () => {
            const items = await barRepository.findAllByBarName(barEntityName1);
            expect(items).toBeArray();
            expect(items?.length).toBe(2);

            const item1 = find(items, (item) => item.barId === barEntity1.barId);
            const item4 = find(items, (item) => item.barId === barEntity4.barId);

            expect(item1).toBeDefined();
            expect(item4).toBeDefined();
            expect(item1?.barId).toBe(barEntityId1);
            expect(item1?.barName).toBe(barEntityName1);
            expect(item4?.barId).toBe(barEntityId4);
            expect(item4?.barName).toBe(barEntityName4);
        });

        it('can fetch multiple entities by barId property in asc order', async () => {
            const items = await barRepository.findAllByBarName(barEntityName1, Sort.by('barId'));
            expect(items).toBeArray();
            expect(items?.length).toBe(2);
            expect(items[0]).toBeDefined();
            expect(items[0]?.barId).toBe(barEntityId1);
            expect(items[0]?.barName).toBe(barEntityName1);
            expect(items[1]).toBeDefined();
            expect(items[1]?.barId).toBe(barEntityId4);
            expect(items[1]?.barName).toBe(barEntityName4);
        });

        it('can fetch multiple entities by barId property in desc order', async () => {
            const items = await barRepository.findAllByBarName(barEntityName1, Sort.by(Sort.Direction.DESC,'barId'));
            expect(items).toBeArray();
            expect(items?.length).toBe(2);

            expect(items[0]).toBeDefined();
            expect(items[0]?.barId).toBe(barEntityId4);
            expect(items[0]?.barName).toBe(barEntityName4);

            expect(items[1]).toBeDefined();
            expect(items[1]?.barId).toBe(barEntityId1);
            expect(items[1]?.barName).toBe(barEntityName1);
        });

    });

    describe('#findByBarName', () => {

        it('can find entity by barName property unsorted', async () => {
            const entity : BarEntity | undefined = await barRepository.findByBarName(barEntityName2);
            expect(entity).toBeDefined();
            expect(entity?.barId).toBe(barEntityId2);
            expect(entity?.barName).toBe(barEntityName2);
        });

        it('can find entity by barName property in asc order', async () => {
            const entity : BarEntity | undefined = await barRepository.findByBarName(barEntityName2, Sort.by('barName'));
            expect(entity).toBeDefined();
            expect(entity?.barId).toBe(barEntityId2);
            expect(entity?.barName).toBe(barEntityName2);
        });

        it('can find entity by barName property in desc order', async () => {
            const entity : BarEntity | undefined = await barRepository.findByBarName(barEntityName2, Sort.by(Sort.Direction.DESC,'barName'));
            expect(entity).toBeDefined();
            expect(entity?.barId).toBe(barEntityId2);
            expect(entity?.barName).toBe(barEntityName2);
        });

    });

    describe('#deleteAllByBarName', () => {

        it('can delete all properties by barName', async () => {
            await barRepository.deleteAllByBarName(barEntityName2);
            const entity : BarEntity | undefined = await barRepository.findByBarName(barEntityName2);
            expect(entity).not.toBeDefined();
        });

    });

    describe('#existsByBarName', () => {

        it('can find if entity exists by barName', async () => {
            expect( await barRepository.existsByBarName(barEntityName2) ).toBe(true);
            await barRepository.deleteAllByBarName(barEntityName2);
            expect( await barRepository.existsByBarName(barEntityName2) ).toBe(false);
        });

    });

    describe('#countByBarName', () => {

        it('can count entities by barName', async () => {
            expect( await barRepository.countByBarName(barEntityName2) ).toBe(1);
            await barRepository.deleteAllByBarName(barEntityName2);
            expect( await barRepository.countByBarName(barEntityName2) ).toBe(0);
        });

    });



    describe('#findAllByBarId', () => {

        it('can find all entities by barId unsorted', async () => {
            const items = await barRepository.findAllByBarId(barEntityId2);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]?.barId).toBe(barEntityId2);
            expect(items[0]?.barName).toBe(barEntityName2);
        });

        it('can find all entities by barId in asc order', async () => {
            const items = await barRepository.findAllByBarId(barEntityId2, Sort.by('barName'));
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]?.barId).toBe(barEntityId2);
            expect(items[0]?.barName).toBe(barEntityName2);
        });

        it('can find all entities by barId in desc order', async () => {
            const items = await barRepository.findAllByBarId(barEntityId2, Sort.by(Sort.Direction.DESC,'barName'));
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]?.barId).toBe(barEntityId2);
            expect(items[0]?.barName).toBe(barEntityName2);
        });

    });

    describe('#findByBarId', () => {

        it('can find an entity by barId unsorted', async () => {
            const item = await barRepository.findByBarId(barEntityId2);
            expect(item?.barId).toBe(barEntityId2);
            expect(item?.barName).toBe(barEntityName2);
        });

        it('can find an entity by barId in asc order', async () => {
            const item = await barRepository.findByBarId(barEntityId2, Sort.by('barName'));
            expect(item?.barId).toBe(barEntityId2);
            expect(item?.barName).toBe(barEntityName2);
        });

        it('can find an entity by barId in desc order', async () => {
            const item = await barRepository.findByBarId(barEntityId2, Sort.by(Sort.Direction.DESC,'barName'));
            expect(item?.barId).toBe(barEntityId2);
            expect(item?.barName).toBe(barEntityName2);
        });

    });

    describe('#deleteAllByBarId', () => {

        it('can delete all entities by barId', async () => {
            await barRepository.deleteAllByBarId(barEntityId2);
            const item = await barRepository.findByBarId(barEntityId2);
            expect(item).toBeUndefined();
        });

    });

    describe('#existsByBarId', () => {

        it('can find if entities exist by barId', async () => {
            expect( await barRepository.existsByBarId(barEntityId2) ).toBe(true);
            await barRepository.deleteAllByBarId(barEntityId2);
            expect( await barRepository.existsByBarId(barEntityId2) ).toBe(false);
        });

    });

    describe('#countByBarId', () => {

        it('can count entities by barId', async () => {
            expect( await barRepository.countByBarId(barEntityId2) ).toBe(1);
            await barRepository.deleteAllByBarId(barEntityId2);
            expect( await barRepository.countByBarId(barEntityId2) ).toBe(0);
        });

    });



    describe('#findAllByBarDateBetween', () => {

        it('can find all entities between values by date unordered', async () => {
            const items = await barRepository.findAllByBarDateBetween(barEntityDate2, barEntityDate3);
            expect(items).toHaveLength(2);

            const item2 = find(items, (item) => item.barId === barEntityId2);
            const item3 = find(items, (item) => item.barId === barEntityId3);

            expect(item2).toBeDefined();
            expect(item3).toBeDefined();

            expect(item2?.barId).toBe(barEntityId2);
            expect(item2?.barName).toBe(barEntityName2);
            expect(item2?.barDate).toBe(barEntityDate2);

            expect(item3?.barId).toBe(barEntityId3);
            expect(item3?.barName).toBe(barEntityName3);
            expect(item3?.barDate).toBe(barEntityDate3);

        });

        it('can find all entities by barId in asc order', async () => {
            const items = await barRepository.findAllByBarDateBetween(barEntityDate2, barEntityDate3, Sort.by('barDate'));
            expect(items).toHaveLength(2);
            expect(items[0]?.barId).toBe(barEntityId2);
            expect(items[0]?.barName).toBe(barEntityName2);
            expect(items[0]?.barDate).toBe(barEntityDate2);
            expect(items[1]?.barId).toBe(barEntityId3);
            expect(items[1]?.barName).toBe(barEntityName3);
            expect(items[1]?.barDate).toBe(barEntityDate3);
        });

        it('can find all entities by barId in desc order', async () => {
            const items = await barRepository.findAllByBarDateBetween(barEntityDate2, barEntityDate3, Sort.by(Sort.Direction.DESC,'barDate'));
            expect(items).toHaveLength(2);
            expect(items[0]?.barId).toBe(barEntityId3);
            expect(items[0]?.barName).toBe(barEntityName3);
            expect(items[0]?.barDate).toBe(barEntityDate3);
            expect(items[1]?.barId).toBe(barEntityId2);
            expect(items[1]?.barName).toBe(barEntityName2);
            expect(items[1]?.barDate).toBe(barEntityDate2);
        });

    });

    describe('#findByBarDateBetween', () => {

        it('can find an entity between times in unsorted order', async () => {
            const item = await barRepository.findByBarDateBetween(dateBetweenEntity3And4, dateAfterEntity4);
            expect(item?.barId).toBe(barEntityId4);
            expect(item?.barName).toBe(barEntityName4);
        });

        it('can find an entity between times in asc order', async () => {
            const item = await barRepository.findByBarDateBetween(dateBeforeEntity1, dateBetweenEntity1And2, Sort.by('barDate'));
            expect(item?.barId).toBe(barEntityId1);
            expect(item?.barName).toBe(barEntityName1);
        });

        it('can find an entity between times in desc order', async () => {
            const item = await barRepository.findByBarDateBetween(dateBetweenEntity1And2, dateBetweenEntity2And3, Sort.by(Sort.Direction.DESC,'barDate'));
            expect(item?.barId).toBe(barEntityId2);
            expect(item?.barName).toBe(barEntityName2);
        });

    });

    describe('#deleteAllByBarDateBetween', () => {

        it('can delete all entities by barDate between range', async () => {
            await barRepository.deleteAllByBarDateBetween(dateBeforeEntity1, dateBetweenEntity3And4);
            const item = await barRepository.count();
            expect(item).toBe(1);
        });

    });

    describe('#existsByBarDateBetween', () => {

        it('can find if entities exist between range', async () => {
            expect( await barRepository.existsByBarDateBetween(dateBetweenEntity1And2, dateBetweenEntity3And4) ).toBe(true);
            await barRepository.deleteAllByBarDateBetween(barEntityDate2, barEntityDate3);
            expect( await barRepository.existsByBarDateBetween(dateBetweenEntity1And2, dateBetweenEntity3And4) ).toBe(false);
        });

    });

    describe('#countByBarDateBetween', () => {

        it('can count entities by barId', async () => {
            expect( await barRepository.countByBarDateBetween(dateBetweenEntity1And2, dateAfterEntity4) ).toBe(3);
            await barRepository.deleteAllByBarDateBetween(dateBetweenEntity1And2, dateAfterEntity4);
            expect( await barRepository.countByBarDateBetween(dateBeforeEntity1, dateBetweenEntity3And4) ).toBe(1);
        });

    });



    describe('#findAllByBarDateBefore', () => {

        it('can find all entities before time, unordered', async () => {

            // Matches 1 and 2 ...OR... 2 and 1 (because unordered)
            const items = await barRepository.findAllByBarDateBefore(dateBetweenEntity2And3);
            expect(items).toHaveLength(2);

            const item1 = find(items, (item) => item.barId === barEntityId1);
            const item2 = find(items, (item) => item.barId === barEntityId2);

            expect(item1).toBeDefined();
            expect(item2).toBeDefined();

            expect(item1?.barId).toBe(barEntityId1);
            expect(item1?.barName).toBe(barEntityName1);
            expect(item1?.barDate).toBe(barEntityDate1);

            expect(item2?.barId).toBe(barEntityId2);
            expect(item2?.barName).toBe(barEntityName2);
            expect(item2?.barDate).toBe(barEntityDate2);

        });

        it('can find all entities before time, in asc order', async () => {
            // Matches 1 and 2, in asc order
            const items = await barRepository.findAllByBarDateBefore(dateBetweenEntity2And3, Sort.by('barDate'));
            expect(items).toHaveLength(2);

            expect(items[0]?.barId).toBe(barEntityId1);
            expect(items[0]?.barName).toBe(barEntityName1);
            expect(items[0]?.barDate).toBe(barEntityDate1);

            expect(items[1]?.barId).toBe(barEntityId2);
            expect(items[1]?.barName).toBe(barEntityName2);
            expect(items[1]?.barDate).toBe(barEntityDate2);

        });

        it('can find all entities before time, in desc order', async () => {

            // Matches 2 and 1, in desc order
            const items = await barRepository.findAllByBarDateBefore(dateBetweenEntity2And3, Sort.by(Sort.Direction.DESC,'barDate'));
            expect(items).toHaveLength(2);

            expect(items[0]?.barId).toBe(barEntityId2);
            expect(items[0]?.barName).toBe(barEntityName2);
            expect(items[0]?.barDate).toBe(barEntityDate2);

            expect(items[1]?.barId).toBe(barEntityId1);
            expect(items[1]?.barName).toBe(barEntityName1);
            expect(items[1]?.barDate).toBe(barEntityDate1);
        });

    });

    describe('#findByBarDateBefore', () => {

        it('cannot find an entity before there was any', async () => {
            const item = await barRepository.findByBarDateBefore(dateBeforeEntity1);
            expect(item).toBeUndefined();
        });

        it('can find an entity before time in unsorted order', async () => {

            // Matches entity 1
            const item = await barRepository.findByBarDateBefore(dateBetweenEntity1And2);
            expect(item?.barId).toBe(barEntityId1);
            expect(item?.barName).toBe(barEntityName1);

        });

        it('can find an entity before time in asc order', async () => {
            // Matches entity 1
            const item = await barRepository.findByBarDateBefore(dateBetweenEntity3And4, Sort.by('barDate'));
            expect(item?.barId).toBe(barEntityId1);
            expect(item?.barName).toBe(barEntityName1);
        });

        it('can find an entity before time in desc order', async () => {
            // Matches entity 3
            const item = await barRepository.findByBarDateBefore(dateBetweenEntity3And4, Sort.by(Sort.Direction.DESC,'barDate'));
            expect(item?.barId).toBe(barEntityId3);
            expect(item?.barName).toBe(barEntityName3);
        });

    });

    describe('#deleteAllByBarDateBefore', () => {

        it('can delete all entities before time', async () => {

            // Deletes entities 1, 2 and 3
            await barRepository.deleteAllByBarDateBefore(dateBetweenEntity3And4);

            // Matches entity 4
            expect( await barRepository.count() ).toBe(1);

        });

    });

    describe('#existsByBarDateBefore', () => {

        it('can find if entities exist before time', async () => {
            expect( await barRepository.existsByBarDateBefore(dateBetweenEntity1And2) ).toBe(true);
            await barRepository.deleteAllByBarDateBefore(barEntityDate2);
            expect( await barRepository.existsByBarDateBefore(dateBetweenEntity1And2) ).toBe(false);
        });

    });

    describe('#countByBarDateBefore', () => {

        it('can count entities before time', async () => {

            // Matches entities 1, 2 and 3
            expect( await barRepository.countByBarDateBefore(dateBetweenEntity3And4) ).toBe(3);

            // Deletes entity 1
            await barRepository.deleteAllByBarDateBefore(dateBetweenEntity1And2);

            // Matches entities 2 and 3
            expect( await barRepository.countByBarDateBefore(dateBetweenEntity3And4) ).toBe(2);

        });

    });



    describe('#findAllByBarDateAfter', () => {

        it('can find all entities after time, unordered', async () => {

            // Finds entities 3 and 4  ... OR .. 4 and 3
            const items = await barRepository.findAllByBarDateAfter(dateBetweenEntity2And3);
            expect(items).toHaveLength(2);

            const item3 = find(items, (item) => item.barId === barEntityId3);
            const item4 = find(items, (item) => item.barId === barEntityId4);

            expect(item3).toBeDefined();
            expect(item4).toBeDefined();

            expect(item4?.barId).toBe(barEntityId4);
            expect(item4?.barName).toBe(barEntityName4);
            expect(item4?.barDate).toBe(barEntityDate4);

            expect(item3?.barId).toBe(barEntityId3);
            expect(item3?.barName).toBe(barEntityName3);
            expect(item3?.barDate).toBe(barEntityDate3);

        });

        it('can find all entities after time in asc order', async () => {

            // Finds entities 3 and 4 in asc order
            const items = await barRepository.findAllByBarDateAfter(dateBetweenEntity2And3, Sort.by('barDate'));
            expect(items).toHaveLength(2);
            expect(items[0]?.barId).toBe(barEntityId3);
            expect(items[0]?.barName).toBe(barEntityName3);
            expect(items[0]?.barDate).toBe(barEntityDate3);
            expect(items[1]?.barId).toBe(barEntityId4);
            expect(items[1]?.barName).toBe(barEntityName4);
            expect(items[1]?.barDate).toBe(barEntityDate4);
        });

        it('can find all entities after time in desc order', async () => {
            // Finds entities 4 and 3
            const items = await barRepository.findAllByBarDateAfter(dateBetweenEntity2And3, Sort.by(Sort.Direction.DESC,'barDate'));
            expect(items).toHaveLength(2);
            expect(items[0]?.barId).toBe(barEntityId4);
            expect(items[0]?.barName).toBe(barEntityName4);
            expect(items[0]?.barDate).toBe(barEntityDate4);
            expect(items[1]?.barId).toBe(barEntityId3);
            expect(items[1]?.barName).toBe(barEntityName3);
            expect(items[1]?.barDate).toBe(barEntityDate3);
        });

    });

    describe('#findByBarDateAfter', () => {

        it('can find an entity after time in unsorted order', async () => {
            // Matches 4
            const item = await barRepository.findByBarDateAfter(dateBetweenEntity3And4);
            expect(item?.barId).toBe(barEntityId4);
            expect(item?.barName).toBe(barEntityName4);
        });

        it('can find an entity after time in asc order', async () => {
            // Matches entities 2, 3 and 4, in asc order 2 will be first
            const item = await barRepository.findByBarDateAfter(dateBetweenEntity1And2, Sort.by('barDate'));
            expect(item?.barId).toBe(barEntityId2);
            expect(item?.barName).toBe(barEntityName2);
        });

        it('can find an entity after time in DESC order', async () => {
            // Matches entities 3 and 4, in desc order 4 fill be first one
            const item = await barRepository.findByBarDateAfter(dateBetweenEntity1And2, Sort.by(Sort.Direction.DESC,'barDate'));
            expect(item?.barId).toBe(barEntityId4);
            expect(item?.barName).toBe(barEntityName4);
        });

    });

    describe('#deleteAllByBarDateAfter', () => {

        it('can delete all entities after barDate', async () => {
            await barRepository.deleteAllByBarDateAfter(dateBetweenEntity3And4); // Deletes item 4
            const item = await barRepository.count();
            expect(item).toBe(3);
        });

    });

    describe('#existsByBarDateAfter', () => {

        it('can find if entities exist after barDate', async () => {
            expect( await barRepository.existsByBarDateAfter(dateBetweenEntity1And2) ).toBe(true);
            await barRepository.deleteAllByBarDateBetween(dateBetweenEntity1And2, dateAfterEntity4); // Deletes items 2, 3 and 4
            expect( await barRepository.existsByBarDateAfter(dateBetweenEntity1And2) ).toBe(false);
        });

    });

    describe('#countByBarDateAfter', () => {

        it('can count entities after barDate', async () => {
            expect( await barRepository.countByBarDateAfter(dateBetweenEntity1And2) ).toBe(3);
            await barRepository.deleteAllByBarDateAfter(dateBetweenEntity1And2);
            expect( await barRepository.countByBarDateAfter(dateBeforeEntity1) ).toBe(1);
        });

    });


};
