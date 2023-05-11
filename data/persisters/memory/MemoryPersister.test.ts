// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { MemoryPersister } from "./MemoryPersister";
import { createEntityMetadata, EntityMetadata } from "../../types/EntityMetadata";
import { createEntityField } from "../../types/EntityField";
import { LogLevel } from "../../../types/LogLevel";
import { Table } from "../../Table";
import { Entity } from "../../Entity";
import { Id } from "../../Id";
import { Column } from "../../Column";

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
                (dto?: any) => new BarEntity(dto)
            );
            barEntity1 = await persister.insert(
                new BarEntity({barName: 'Bar 123'}),
                barMetadata
            );
            barEntity2 = await persister.insert(
                new BarEntity({barName: 'Bar 456'}),
                barMetadata
            );
            barEntity3 = await persister.insert(
                new BarEntity({barName: 'Bar 789'}),
                barMetadata
            );
        });

        describe('#count', () => {
            it('can count items when there is none', async () => {
                expect( await persister.count(fooMetadata) ).toBe(0);
            });
            it('can count items when there is three', async () => {
                expect( await persister.count(barMetadata) ).toBe(3);
            });
        });

        describe('#countByProperty', () => {
            it('can count items when there is none', async () => {
                expect( await persister.countByProperty('fooName', 'Foo 123', fooMetadata) ).toBe(0);
            });
            it('can count items when there is three', async () => {
                expect( await persister.countByProperty('barName', 'Bar 456', barMetadata) ).toBe(1);
            });
        });

        describe('#deleteAll', () => {
            it('can delete items when there is none', async () => {
                await persister.deleteAll(fooMetadata);
                expect( await persister.count(fooMetadata) ).toBe(0);
                expect( await persister.count(barMetadata) ).toBe(3);
            });
            it('can delete items when there is three', async () => {
                expect( await persister.count(barMetadata) ).toBe(3);
                await persister.deleteAll(barMetadata);
                expect( await persister.count(fooMetadata) ).toBe(0);
                expect( await persister.count(barMetadata) ).toBe(0);
            });
        });

        describe('#deleteAllById', () => {
            it('can delete items when there is none', async () => {
                expect(barEntity2.barId).toBeDefined();
                await persister.deleteAllById([barEntity2.barId as string], fooMetadata);
                expect( await persister.count(fooMetadata) ).toBe(0);
                expect( await persister.count(barMetadata) ).toBe(3);
            });
            it('can delete items when there is three', async () => {
                expect(barEntity2.barId).toBeDefined();
                await persister.deleteAllById([barEntity2.barId as string], barMetadata);
                expect( await persister.count(fooMetadata) ).toBe(0);
                expect( await persister.count(barMetadata) ).toBe(2);
            });
        });

        describe('#deleteById', () => {
            it('can delete items when there is none', async () => {
                expect(barEntity2.barId).toBeDefined();
                await persister.deleteById(barEntity2.barId as string, fooMetadata);
                expect( await persister.count(fooMetadata) ).toBe(0);
                expect( await persister.count(barMetadata) ).toBe(3);
            });
            it('can delete items when there is three', async () => {
                expect(barEntity2.barId).toBeDefined();
                await persister.deleteById(barEntity2.barId as string, barMetadata);
                expect( await persister.count(fooMetadata) ).toBe(0);
                expect( await persister.count(barMetadata) ).toBe(2);
            });
        });

        describe('#deleteAllByProperty', () => {
            it('can delete items when there is none', async () => {
                expect(barEntity2.barId).toBeDefined();
                await persister.deleteAllByProperty('barName', 'Bar 456', fooMetadata);
                expect( await persister.count(fooMetadata) ).toBe(0);
                expect( await persister.count(barMetadata) ).toBe(3);
            });
            it('can delete items when there is three', async () => {
                expect(barEntity2.barId).toBeDefined();
                await persister.deleteAllByProperty('barName', 'Bar 456',barMetadata);
                expect( await persister.count(fooMetadata) ).toBe(0);
                expect( await persister.count(barMetadata) ).toBe(2);
            });
        });

        describe('#existsByProperty', () => {
            it('can detect there is no matches', async () => {
                expect( await persister.existsByProperty('barName', 'Bar 456', fooMetadata) ).toBe(false);
            });
            it('can detect there is one match', async () => {
                expect( await persister.existsByProperty('barName', 'Bar 456', barMetadata) ).toBe(true);
            });
        });

        describe('#findAll', () => {
            it('can detect there is no matches', async () => {
                expect( await persister.findAll(fooMetadata, undefined) ).toStrictEqual([]);
            });
            it('can detect there is three matches', async () => {
                const list : BarEntity[] = await persister.findAll(barMetadata, undefined);
                expect(list?.length).toBe(3);
                expect(list[0].barId).toBe(barEntity1.barId);
                expect(list[1].barId).toBe(barEntity2.barId);
                expect(list[2].barId).toBe(barEntity3.barId);
                expect(list[0].barName).toBe(barEntity1.barName);
                expect(list[1].barName).toBe(barEntity2.barName);
                expect(list[2].barName).toBe(barEntity3.barName);
            });
        });

        describe('#findAllById', () => {
            it('can detect there is no matches', async () => {
                expect(barEntity2.barId).toBeDefined();
                expect( await persister.findAllById([barEntity2.barId as string], fooMetadata, undefined) ).toStrictEqual([]);
            });
            it('can detect there is one match', async () => {
                expect(barEntity2.barId).toBeDefined();
                const list : BarEntity[] = await persister.findAllById([barEntity2.barId as string], barMetadata, undefined);
                expect(list?.length).toBe(1);
                expect(list[0].barId).toBe(barEntity2.barId);
                expect(list[0].barName).toBe(barEntity2.barName);
            });
        });

        describe('#findAllByProperty', () => {
            it('can detect there is no matches', async () => {
                expect( await persister.findAllByProperty('barName', 'Bar 456', fooMetadata, undefined) ).toStrictEqual([]);
            });
            it('can detect there is one match', async () => {
                const list : BarEntity[] = await persister.findAllByProperty('barName', 'Bar 456', barMetadata, undefined);
                expect(list?.length).toBe(1);
                expect(list[0].barId).toBe(barEntity2.barId);
                expect(list[0].barName).toBe(barEntity2.barName);
            });
        });

        describe('#findById', () => {
            it('can detect there is no matches', async () => {
                expect(barEntity2.barId).toBeDefined();
                expect( await persister.findById(barEntity2.barId as string, fooMetadata, undefined) ).toBeUndefined();
            });
            it('can detect there is one match', async () => {
                expect(barEntity2.barId).toBeDefined();
                const item : BarEntity | undefined = await persister.findById(barEntity2.barId as string, barMetadata, undefined);
                expect(item).toBeDefined();
                expect(item?.barId).toBe(barEntity2.barId);
                expect(item?.barName).toBe(barEntity2.barName);
            });
        });

        describe('#findByProperty', () => {
            it('can detect there is no matches', async () => {
                expect( await persister.findByProperty('barName', 'Bar 456', fooMetadata, undefined) ).toBeUndefined();
            });
            it('can detect there is one match', async () => {
                const item : BarEntity | undefined = await persister.findByProperty('barName', 'Bar 456', barMetadata, undefined);
                expect(item).toBeDefined();
                expect(item?.barId).toBe(barEntity2.barId);
                expect(item?.barName).toBe(barEntity2.barName);
            });
        });

        describe('#insert', () => {
            it('can insert new item', async () => {
                expect( await persister.count(fooMetadata) ).toBe(0);
                const entity = await persister.insert(new FooEntity({fooName: 'Hello world'}), fooMetadata);
                expect(entity).toBeDefined();
                expect(entity.fooName).toBe('Hello world');
                expect(entity.fooId).toBeDefined();
                expect( await persister.count(fooMetadata) ).toBe(1);
            });
        });

        describe('#update', () => {

            it('can update an item', async () => {
                expect(barEntity2.barId).toBeDefined();
                barEntity2.barName = 'Hello world';
                const entity = await persister.update(barEntity2, barMetadata);
                expect(entity).toBeDefined();
                expect(entity.barName).toBe('Hello world');
                expect(entity.barId).toBe(barEntity2.barId);
                expect( await persister.count(barMetadata) ).toBe(3);
            });

            it('cannot update an item without update call', async () => {
                expect(barEntity2.barId).toBeDefined();
                barEntity2.barName = 'Hello world';
                const entity : BarEntity | undefined = await persister.findById( barEntity2.barId as string, barMetadata, undefined );
                expect(entity).toBeDefined();
                expect(entity?.barName).toBe('Bar 456');
                expect(entity?.barId).toBe(barEntity2.barId);
            });

        });

    });

});
