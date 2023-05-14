// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { MemoryPersister } from "./MemoryPersister";
import { createEntityMetadata, EntityMetadata } from "../../types/EntityMetadata";
import { createEntityField } from "../../types/EntityField";
import { LogLevel } from "../../../types/LogLevel";
import { Table } from "../../Table";
import { Entity } from "../../Entity";
import { Id } from "../../Id";
import { Column } from "../../Column";
import { Where } from "../../Where";

describe('MemoryPersister', () => {

    beforeAll(() => {
        MemoryPersister.setLogLevel(LogLevel.NONE);
    });

    @Table('foos')
    class FooEntity extends Entity {
        constructor (dto ?: {fooName: string}) {
            super()
            this.fooId = undefined;
            this.fooName = dto?.fooName;
        }

        @Id()
        @Column('foo_id')
        public fooId ?: string;

        @Column('foo_name')
        public fooName ?: string;

    }


    @Table('bars')
    class BarEntity extends Entity {
        constructor (dto ?: {barName: string}) {
            super()
            this.barId = undefined;
            this.barName = dto?.barName;
        }

        @Id()
        @Column('bar_id')
        public barId ?: string;

        @Column('bar_name')
        public barName ?: string;

    }

    describe('#constructor', () => {
        it('can create a persister', () => {
            expect( new MemoryPersister() ).toBeDefined();
        });
    });

    describe('instance', () => {

        let persister : MemoryPersister;
        let fooMetadata : EntityMetadata;
        let barMetadata : EntityMetadata;
        let barEntity1 : BarEntity;
        let barEntity2 : BarEntity;
        let barEntity3 : BarEntity;

        beforeEach(async () => {
            persister = new MemoryPersister();
            fooMetadata = createEntityMetadata(
                'foos',
                'fooId',
                [
                    createEntityField('fooId', 'foo_id'),
                    createEntityField('fooName', 'foo_name')
                ],
                [],
                [],
                [],
                (dto?: any) => new FooEntity(dto)
            );
            barMetadata = createEntityMetadata(
                'bars',
                'barId',
                [
                    createEntityField('barId', 'bar_id'),
                    createEntityField('barName', 'bar_name')
                ],
                [],
                [],
                [],
                (dto?: any) => new BarEntity(dto)
            );
            barEntity1 = await persister.insert(
                barMetadata,
                new BarEntity({barName: 'Bar 123'}),
            );
            barEntity2 = await persister.insert(
                barMetadata,
                new BarEntity({barName: 'Bar 456'}),
            );
            barEntity3 = await persister.insert(
                barMetadata,
                new BarEntity({barName: 'Bar 789'}),
            );
        });

        describe('#count', () => {

            it('can count all items when there is none', async () => {
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
            });
            it('can count all items when there is three', async () => {
                expect( await persister.count(barMetadata, undefined) ).toBe(3);
            });

            it('can count items by property when there is none', async () => {
                expect( await persister.count(fooMetadata, Where.propertyEquals('fooName', 'Foo 123')) ).toBe(0);
            });

            it('can count items by property when there is three', async () => {
                expect( await persister.count(barMetadata, Where.propertyEquals('barName', 'Bar 456')) ).toBe(1);
            });

        });

        describe('#existsBy', () => {
            it('can detect there is no matches', async () => {
                expect( await persister.existsBy(fooMetadata, Where.propertyEquals('barName', 'Bar 456')) ).toBe(false);
            });
            it('can detect there is one match', async () => {
                expect( await persister.existsBy(barMetadata, Where.propertyEquals('barName', 'Bar 456')) ).toBe(true);
            });
        });

        describe('#deleteAll', () => {

            it('can delete all items when there is none', async () => {
                await persister.deleteAll(fooMetadata, undefined);
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                expect( await persister.count(barMetadata, undefined) ).toBe(3);
            });

            it('can delete all items when there is three', async () => {
                expect( await persister.count(barMetadata, undefined) ).toBe(3);
                await persister.deleteAll(barMetadata, undefined);
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                expect( await persister.count(barMetadata, undefined) ).toBe(0);
            });

            it('can delete items by property when there is none', async () => {
                expect(barEntity2.barId).toBeDefined();
                await persister.deleteAll(fooMetadata, Where.propertyEquals(fooMetadata.idPropertyName, barEntity2.barId as string));
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                expect( await persister.count(barMetadata, undefined) ).toBe(3);
            });

            it('can delete items by property when there is three', async () => {
                expect(barEntity2.barId).toBeDefined();
                await persister.deleteAll(barMetadata, Where.propertyEquals(barMetadata.idPropertyName, barEntity2.barId as string));
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                expect( await persister.count(barMetadata, undefined) ).toBe(2);
            });

            it('can delete items by property list when there is none', async () => {
                expect(barEntity2.barId).toBeDefined();
                await persister.deleteAll(fooMetadata, Where.propertyListEquals(fooMetadata.idPropertyName, [barEntity2.barId as string]));
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                expect( await persister.count(barMetadata, undefined) ).toBe(3);
            });
            it('can delete items by property list when there is three', async () => {
                expect(barEntity2.barId).toBeDefined();
                await persister.deleteAll(barMetadata, Where.propertyListEquals(barMetadata.idPropertyName, [barEntity2.barId as string]));
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                expect( await persister.count(barMetadata, undefined) ).toBe(2);
            });

            it('can delete items by named property when there is none', async () => {
                expect(barEntity2.barId).toBeDefined();
                await persister.deleteAll(fooMetadata, Where.propertyEquals('barName', 'Bar 456'));
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                expect( await persister.count(barMetadata, undefined) ).toBe(3);
            });

            it('can delete items by named property when there is three', async () => {
                expect(barEntity2.barId).toBeDefined();
                await persister.deleteAll(barMetadata, Where.propertyEquals('barName', 'Bar 456'));
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                expect( await persister.count(barMetadata, undefined) ).toBe(2);
            });

        });

        describe('#findAll', () => {

            it('can detect there is no matches', async () => {
                expect( await persister.findAll(fooMetadata, undefined, undefined) ).toStrictEqual([]);
            });

            it('can detect there is three matches', async () => {
                const list : BarEntity[] = await persister.findAll(barMetadata, undefined, undefined);
                expect(list?.length).toBe(3);
                expect(list[0].barId).toBe(barEntity1.barId);
                expect(list[1].barId).toBe(barEntity2.barId);
                expect(list[2].barId).toBe(barEntity3.barId);
                expect(list[0].barName).toBe(barEntity1.barName);
                expect(list[1].barName).toBe(barEntity2.barName);
                expect(list[2].barName).toBe(barEntity3.barName);
            });

            it('can find by id when there is no matches', async () => {
                expect(barEntity2.barId).toBeDefined();
                expect( await persister.findAll(fooMetadata, Where.propertyEquals(fooMetadata.idPropertyName, barEntity2.barId as string), undefined) ).toStrictEqual([]);
            });

            it('can find by id when there is one match', async () => {
                expect(barEntity2.barId).toBeDefined();
                const list : BarEntity[] = await persister.findAll(barMetadata, Where.propertyEquals(barMetadata.idPropertyName, barEntity2.barId as string), undefined);
                expect(list?.length).toBe(1);
                expect(list[0].barId).toBe(barEntity2.barId);
                expect(list[0].barName).toBe(barEntity2.barName);
            });

            it('can find by property when there is no matches', async () => {
                expect( await persister.findAll(fooMetadata, Where.propertyEquals('barName', 'Bar 456'), undefined) ).toStrictEqual([]);
            });

            it('can find by property when detect there is one match', async () => {
                const list : BarEntity[] = await persister.findAll(barMetadata, Where.propertyEquals('barName', 'Bar 456'), undefined);
                expect(list?.length).toBe(1);
                expect(list[0].barId).toBe(barEntity2.barId);
                expect(list[0].barName).toBe(barEntity2.barName);
            });

        });

        describe('#findBy', () => {

            it('can find by id when there is no matches', async () => {
                expect(barEntity2.barId).toBeDefined();
                expect( await persister.findBy(fooMetadata, Where.propertyEquals(fooMetadata.idPropertyName, barEntity2.barId as string), undefined) ).toBeUndefined();
            });

            it('can find by id when there is one match', async () => {
                expect(barEntity2.barId).toBeDefined();
                const item : BarEntity | undefined = await persister.findBy(barMetadata, Where.propertyEquals(barMetadata.idPropertyName, barEntity2.barId as string), undefined);
                expect(item).toBeDefined();
                expect(item?.barId).toBe(barEntity2.barId);
                expect(item?.barName).toBe(barEntity2.barName);
            });

            it('can find by property name when there is no matches', async () => {
                expect( await persister.findBy(fooMetadata, Where.propertyEquals('barName', 'Bar 456'), undefined) ).toBeUndefined();
            });

            it('can find by property name there is one match', async () => {
                const item : BarEntity | undefined = await persister.findBy(barMetadata, Where.propertyEquals('barName', 'Bar 456'), undefined);
                expect(item).toBeDefined();
                expect(item?.barId).toBe(barEntity2.barId);
                expect(item?.barName).toBe(barEntity2.barName);
            });

        });

        describe('#insert', () => {
            it('can insert new item', async () => {
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                const entity = await persister.insert(fooMetadata, new FooEntity({fooName: 'Hello world'}));
                expect(entity).toBeDefined();
                expect(entity.fooName).toBe('Hello world');
                expect(entity.fooId).toBeDefined();
                expect( await persister.count(fooMetadata, undefined) ).toBe(1);
            });
        });

        describe('#update', () => {

            it('can update an item', async () => {
                expect(barEntity2.barId).toBeDefined();
                barEntity2.barName = 'Hello world';
                const entity = await persister.update(barMetadata, barEntity2);
                expect(entity).toBeDefined();
                expect(entity.barName).toBe('Hello world');
                expect(entity.barId).toBe(barEntity2.barId);
                expect( await persister.count(barMetadata, undefined) ).toBe(3);
            });

            it('cannot update an item without update call', async () => {
                expect(barEntity2.barId).toBeDefined();
                barEntity2.barName = 'Hello world';
                const entity : BarEntity | undefined = await persister.findBy( barMetadata, Where.propertyEquals(barMetadata.idPropertyName, barEntity2.barId as string), undefined );
                expect(entity).toBeDefined();
                expect(entity?.barName).toBe('Bar 456');
                expect(entity?.barId).toBe(barEntity2.barId);
            });

        });

    });

});
