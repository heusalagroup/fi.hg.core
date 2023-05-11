// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../../jest/matchers/index";
import { Repository } from "../types/Repository";
import { Column, Entity, Id, Table } from "../Entity";
import { RepositoryTestContext } from "./types/types/RepositoryTestContext";
import { Persister } from "../types/Persister";
import { createCrudRepositoryWithPersister } from "../types/CrudRepository";
import { find } from "../../functions/find";
import { Sort } from "../Sort";

export const basicCrudTests = (context : RepositoryTestContext) : void => {

    /**
     * Test entity for tests that require empty repository
     */
    @Table('foos')
    class FooEntity extends Entity {
        constructor (dto ?: {fooName: string}) {
            super()
            this.fooName = dto?.fooName;
        }

        @Id()
        @Column('foo_id', 'BIGINT')
        public fooId ?: string;

        @Column('foo_name')
        public fooName ?: string;

    }

    /**
     * Test entity for tests which require non-empty repository
     */
    @Table('bars')
    class BarEntity extends Entity {
        constructor (dto ?: {barName: string}) {
            super()
            this.barName = dto?.barName;
        }

        @Id()
        @Column('bar_id', 'BIGINT')
        public barId ?: string;

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

    }

    let persister : Persister;
    let fooRepository : FooRepository;
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

    beforeEach( async () => {

        persister = context.getPersister();

        fooRepository = createCrudRepositoryWithPersister<FooEntity, string, FooRepository>(
            new FooEntity(),
            persister
        );
        barRepository = createCrudRepositoryWithPersister<BarEntity, string, BarRepository>(
            new BarEntity(),
            persister
        );

        await fooRepository.deleteAll();
        await barRepository.deleteAll();

        barEntity1 = await persister.insert(
            new BarEntity({barName: barEntityName1}),
            new BarEntity().getMetadata()
        );
        barEntityId1 = barEntity1?.barId as string;
        if (!barEntityId1) throw new TypeError('barEntity1 failed to initialize');

        barEntity2 = await persister.insert(
            new BarEntity({barName: barEntityName2}),
            new BarEntity().getMetadata()
        );
        barEntityId2 = barEntity2?.barId as string;
        if (!barEntityId2) throw new TypeError('barEntity2 failed to initialize');

        barEntity3 = await persister.insert(
            new BarEntity({barName: barEntityName3}),
            new BarEntity().getMetadata()
        );
        barEntityId3 = barEntity3?.barId as string;
        if (!barEntityId3) throw new TypeError('barEntity3 failed to initialize');

        barEntity4 = await persister.insert(
            new BarEntity({barName: barEntityName4}),
            new BarEntity().getMetadata()
        );
        barEntityId4 = barEntity4?.barId as string;
        if (!barEntityId4) throw new TypeError('barEntity4 failed to initialize');

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

            const newEntity = new FooEntity({fooName: 'Hello world'});

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

    });

    describe('#saveAll', () => {

        it('can save fresh entities', async () => {

            expect( await fooRepository.count() ).toBe(0);

            const newEntity1 = new FooEntity({fooName: 'Hello world 1'});
            const newEntity2 = new FooEntity({fooName: 'Hello world 2'});

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

};
