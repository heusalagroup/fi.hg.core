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

        constructor (dto ?: {name: string}) {
            super()
            this.id = undefined;
            this.name = dto?.name;
        }

        @Id()
        @Column('foo_id')
        public id ?: string;

        @Column('foo_name')
        public name ?: string;

    }


    @Table('bars')
    class BarEntity extends Entity {

        constructor (dto ?: {name: string}) {
            super()
            this.id = undefined;
            this.name = dto?.name;
        }

        @Id()
        @Column('bar_id')
        public id ?: string;

        @Column('bar_name')
        public name ?: string;

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
                'id',
                [
                    createEntityField('id', 'foo_id'),
                    createEntityField('name', 'foo_name')
                ],
                [],
                [],
                [],
                (dto?: any) => new FooEntity(dto),
                [],
                [],
                []
            );
            barMetadata = createEntityMetadata(
                'bars',
                'id',
                [
                    createEntityField('id', 'bar_id'),
                    createEntityField('name', 'bar_name')
                ],
                [],
                [],
                [],
                (dto?: any) => new BarEntity(dto),
                [],
                [],
                []
            );
            barEntity1 = await persister.insert(
                barMetadata,
                new BarEntity({name: 'Bar 123'}),
            );
            barEntity2 = await persister.insert(
                barMetadata,
                new BarEntity({name: 'Bar 456'}),
            );
            barEntity3 = await persister.insert(
                barMetadata,
                new BarEntity({name: 'Bar 789'}),
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
                expect( await persister.count(fooMetadata, Where.propertyEquals('name', 'Foo 123')) ).toBe(0);
            });

            it('can count items by property when there is three', async () => {
                expect( await persister.count(barMetadata, Where.propertyEquals('name', 'Bar 456')) ).toBe(1);
            });

        });

        describe('#existsBy', () => {
            it('can detect there is no matches', async () => {
                expect( await persister.existsBy(fooMetadata, Where.propertyEquals('name', 'Bar 456')) ).toBe(false);
            });
            it('can detect there is one match', async () => {
                expect( await persister.existsBy(barMetadata, Where.propertyEquals('name', 'Bar 456')) ).toBe(true);
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
                expect(barEntity2.id).toBeDefined();
                await persister.deleteAll(fooMetadata, Where.propertyEquals(fooMetadata.idPropertyName, barEntity2.id as string));
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                expect( await persister.count(barMetadata, undefined) ).toBe(3);
            });

            it('can delete items by property when there is three', async () => {
                expect(barEntity2.id).toBeDefined();
                await persister.deleteAll(barMetadata, Where.propertyEquals(barMetadata.idPropertyName, barEntity2.id as string));
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                expect( await persister.count(barMetadata, undefined) ).toBe(2);
            });

            it('can delete items by property list when there is none', async () => {
                expect(barEntity2.id).toBeDefined();
                await persister.deleteAll(fooMetadata, Where.propertyListEquals(fooMetadata.idPropertyName, [barEntity2.id as string]));
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                expect( await persister.count(barMetadata, undefined) ).toBe(3);
            });
            it('can delete items by property list when there is three', async () => {
                expect(barEntity2.id).toBeDefined();
                await persister.deleteAll(barMetadata, Where.propertyListEquals(barMetadata.idPropertyName, [barEntity2.id as string]));
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                expect( await persister.count(barMetadata, undefined) ).toBe(2);
            });

            it('can delete items by named property when there is none', async () => {
                expect(barEntity2.id).toBeDefined();
                await persister.deleteAll(fooMetadata, Where.propertyEquals('name', 'Bar 456'));
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                expect( await persister.count(barMetadata, undefined) ).toBe(3);
            });

            it('can delete items by named property when there is three', async () => {
                expect(barEntity2.id).toBeDefined();
                await persister.deleteAll(barMetadata, Where.propertyEquals('name', 'Bar 456'));
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
                expect(list[0].id).toBe(barEntity1.id);
                expect(list[1].id).toBe(barEntity2.id);
                expect(list[2].id).toBe(barEntity3.id);
                expect(list[0].name).toBe(barEntity1.name);
                expect(list[1].name).toBe(barEntity2.name);
                expect(list[2].name).toBe(barEntity3.name);
            });

            it('can find by id when there is no matches', async () => {
                expect(barEntity2.id).toBeDefined();
                expect( await persister.findAll(fooMetadata, Where.propertyEquals(fooMetadata.idPropertyName, barEntity2.id as string), undefined) ).toStrictEqual([]);
            });

            it('can find by id when there is one match', async () => {
                expect(barEntity2.id).toBeDefined();
                const list : BarEntity[] = await persister.findAll(barMetadata, Where.propertyEquals(barMetadata.idPropertyName, barEntity2.id as string), undefined);
                expect(list?.length).toBe(1);
                expect(list[0].id).toBe(barEntity2.id);
                expect(list[0].name).toBe(barEntity2.name);
            });

            it('can find by property when there is no matches', async () => {
                expect( await persister.findAll(fooMetadata, Where.propertyEquals('name', 'Bar 456'), undefined) ).toStrictEqual([]);
            });

            it('can find by property when detect there is one match', async () => {
                const list : BarEntity[] = await persister.findAll(barMetadata, Where.propertyEquals('name', 'Bar 456'), undefined);
                expect(list?.length).toBe(1);
                expect(list[0].id).toBe(barEntity2.id);
                expect(list[0].name).toBe(barEntity2.name);
            });

        });

        describe('#findBy', () => {

            it('can find by id when there is no matches', async () => {
                expect(barEntity2.id).toBeDefined();
                expect( await persister.findBy(fooMetadata, Where.propertyEquals(fooMetadata.idPropertyName, barEntity2.id as string), undefined) ).toBeUndefined();
            });

            it('can find by id when there is one match', async () => {
                expect(barEntity2.id).toBeDefined();
                const item : BarEntity | undefined = await persister.findBy(barMetadata, Where.propertyEquals(barMetadata.idPropertyName, barEntity2.id as string), undefined);
                expect(item).toBeDefined();
                expect(item?.id).toBe(barEntity2.id);
                expect(item?.name).toBe(barEntity2.name);
            });

            it('can find by property name when there is no matches', async () => {
                expect( await persister.findBy(fooMetadata, Where.propertyEquals('name', 'Bar 456'), undefined) ).toBeUndefined();
            });

            it('can find by property name there is one match', async () => {
                const item : BarEntity | undefined = await persister.findBy(barMetadata, Where.propertyEquals('name', 'Bar 456'), undefined);
                expect(item).toBeDefined();
                expect(item?.id).toBe(barEntity2.id);
                expect(item?.name).toBe(barEntity2.name);
            });

        });

        describe('#insert', () => {
            it('can insert new item', async () => {
                expect( await persister.count(fooMetadata, undefined) ).toBe(0);
                const entity = await persister.insert(fooMetadata, new FooEntity({name: 'Hello world'}));
                expect(entity).toBeDefined();
                expect(entity.name).toBe('Hello world');
                expect(entity.id).toBeDefined();
                expect( await persister.count(fooMetadata, undefined) ).toBe(1);
            });
        });

        describe('#update', () => {

            it('can update an item', async () => {
                expect(barEntity2.id).toBeDefined();
                barEntity2.name = 'Hello world';
                const entity = await persister.update(barMetadata, barEntity2);
                expect(entity).toBeDefined();
                expect(entity.name).toBe('Hello world');
                expect(entity.id).toBe(barEntity2.id);
                expect( await persister.count(barMetadata, undefined) ).toBe(3);
            });

            it('cannot update an item without update call', async () => {
                expect(barEntity2.id).toBeDefined();
                barEntity2.name = 'Hello world';
                const entity : BarEntity | undefined = await persister.findBy( barMetadata, Where.propertyEquals(barMetadata.idPropertyName, barEntity2.id as string), undefined );
                expect(entity).toBeDefined();
                expect(entity?.name).toBe('Bar 456');
                expect(entity?.id).toBe(barEntity2.id);
            });


        });

    });

});
