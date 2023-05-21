// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createEntityMetadata, EntityMetadata } from "./types/EntityMetadata";
import "../../jest/matchers/index";
import { Table } from "./Table";
import { Id } from "./Id";
import { Column } from "./Column";
import { cloneEntity, Entity } from "./Entity";
import { createEntityField } from "./types/EntityField";

describe('Entity', () => {


    @Table('bars')
    class BarEntity extends Entity {
        constructor (dto ?: {barName: string}) {
            super()
            this.barId = undefined;
            this.barName = undefined;
        }

        @Id()
        @Column('bar_id')
        public barId ?: string;

        @Column('bar_name')
        public barName ?: string;

    }

    @Table('foos')
    class FooEntity extends Entity {

        constructor (dto ?: {fooName: string}) {
            super()
            this.fooName = dto?.fooName;
        }

        @Id()
        @Column('foo_id')
        public fooId ?: string;

        @Column('foo_name')
        public fooName ?: string;

        @Column('foo_number')
        public fooNumber ?: number;

        @Column('foo_boolean')
        public fooBoolean ?: boolean;

        @Column('foo_nullable', undefined, {nullable: false})
        public nullableFoo ?: boolean;

        @Column('foo_insertable', undefined, {insertable: false})
        public insertableFoo ?: boolean;

        @Column('foo_updatable', undefined, {updatable: false})
        public updatableFoo ?: boolean;

    }

    let entity : FooEntity;
    let metadata : EntityMetadata;

    beforeEach(() => {
        entity = new FooEntity();
        entity.fooId = '123';
        entity.fooName = 'Foo 123';
        entity.fooNumber = 123;
        entity.fooBoolean = true;
        metadata = entity.getMetadata();
    });

    describe('#getMetadata', () => {

        it('can get metadata', () => {
            const metadata = entity.getMetadata();
            expect(metadata?.tableName).toBe("foos");
            expect(metadata?.idPropertyName).toBe("fooId");
            expect(metadata?.createEntity).toBeFunction();
            expect(metadata?.fields).toStrictEqual(
                [
                   {
                       "columnName": "foo_id",
                       "propertyName": "fooId",
                       "fieldType": "UNKNOWN",
                       "insertable": true,
                       "updatable": true,
                       "nullable": true,
                   },
                   {
                       "columnName": "foo_name",
                       "propertyName": "fooName",
                       "fieldType": "UNKNOWN",
                       "insertable": true,
                       "updatable": true,
                       "nullable": true
                   },
                   {
                       "columnName": "foo_number",
                       "propertyName": "fooNumber",
                       "fieldType": "UNKNOWN",
                       "insertable": true,
                       "updatable": true,
                       "nullable": true
                   },
                   {
                       "columnName": "foo_boolean",
                       "propertyName": "fooBoolean",
                       "fieldType": "UNKNOWN",
                       "insertable": true,
                       "updatable": true,
                       "nullable": true
                   },
                   {
                       "columnName": "foo_nullable",
                       "propertyName": "nullableFoo",
                       "fieldType": "UNKNOWN",
                       "insertable": true,
                       "updatable": true,
                       "nullable": false
                   },
                   {
                       "columnName": "foo_insertable",
                       "propertyName": "insertableFoo",
                       "fieldType": "UNKNOWN",
                       "insertable": false,
                       "updatable": true,
                       "nullable": true
                   },
                   {
                       "columnName": "foo_updatable",
                       "propertyName": "updatableFoo",
                       "fieldType": "UNKNOWN",
                       "insertable": true,
                       "updatable": false,
                       "nullable": true
                   }
               ]
            );
            expect(metadata?.oneToManyRelations).toStrictEqual([]);
            expect(metadata?.manyToOneRelations).toStrictEqual([]);
        });

    });

    describe('#toJSON', () => {

        let fooMetadata : EntityMetadata;
        let fooEntity : FooEntity;
        let fooEntityWithId : FooEntity;

        beforeEach(() => {

            fooEntity = new FooEntity({fooName: 'Hello world'});

            fooEntityWithId = new FooEntity({fooName: 'Hello world'});
            fooEntityWithId.fooId = '123';

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
                (dto?: any) => new FooEntity(dto),
                []
            );

        });

        it('can get entity as json', () => {
            const json = entity.toJSON();
            expect(json).toStrictEqual(
                {
                    fooId: '123',
                    fooName: 'Foo 123',
                    fooNumber: 123,
                    fooBoolean: true
                }
            );
        });

        it('can turn fresh entity as JSON object', () => {
            const fooJson = fooEntity.toJSON();
            expect( fooJson ).toBeRegularObject();
            expect( fooJson?.fooId ).not.toBeDefined();
            expect( fooJson?.fooName ).toBe('Hello world');
        });

        it('can turn older entity with id as JSON object', () => {
            const fooJson = fooEntityWithId.toJSON();
            expect( fooJson ).toBeRegularObject();
            expect( fooJson?.fooId ).toBe('123');
            expect( fooJson?.fooName ).toBe('Hello world');
        });

    });

    describe('#clone', () => {


        let fooMetadata : EntityMetadata;
        let fooEntity : FooEntity;
        let fooEntityWithId : FooEntity;

        let barMetadata : EntityMetadata;
        let barEntity : BarEntity;
        let barEntityWithId : BarEntity;


        beforeEach(() => {

            fooEntity = new FooEntity({fooName: 'Hello world'});

            fooEntityWithId = new FooEntity({fooName: 'Hello world'});
            fooEntityWithId.fooId = '123';

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
                (dto?: any) => new FooEntity(dto),
                []
            );

            barEntity = new BarEntity({barName: 'Hello world'});

            barEntityWithId = new BarEntity();
            barEntityWithId.barId = '123';
            barEntityWithId.barName = 'Hello world';

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
                (dto?: any) => new BarEntity(dto),
                []
            );

        });

        it('can clone entity', () => {
            const clonedEntity : FooEntity = entity.clone();
            entity.fooBoolean = false;
            expect(clonedEntity?.fooBoolean).toBe(true);
        });

        it('can clone fresh entity without id and changes do not propagate to the parent', () => {
            const clonedEntity : FooEntity = cloneEntity(fooEntity, fooMetadata);
            expect( clonedEntity?.fooId ).not.toBeDefined();
            expect( clonedEntity?.fooName ).toBe('Hello world');
            expect( fooEntity?.fooId ).not.toBeDefined();
            expect( fooEntity?.fooName ).toBe('Hello world');
            clonedEntity.fooName = '123';
            expect( clonedEntity?.fooId ).not.toBeDefined();
            expect( clonedEntity?.fooName ).toBe('123');
            expect( fooEntity?.fooId ).not.toBeDefined();
            expect( fooEntity?.fooName ).toBe('Hello world');
        });

        it('can clone fresh entity without id and changes in the parent do not propagate to the child', () => {
            const clonedEntity : FooEntity = cloneEntity(fooEntity, fooMetadata);
            expect( clonedEntity?.fooId ).not.toBeDefined();
            expect( clonedEntity?.fooName ).toBe('Hello world');
            expect( fooEntity?.fooId ).not.toBeDefined();
            expect( fooEntity?.fooName ).toBe('Hello world');
            fooEntity.fooName = '123';
            expect( clonedEntity?.fooId ).not.toBeDefined();
            expect( clonedEntity?.fooName ).toBe('Hello world');
            expect( fooEntity?.fooId ).not.toBeDefined();
            expect( fooEntity?.fooName ).toBe('123');
        });

        it('can clone older entity with ID and changes do not propagate to the parent', () => {
            const clonedEntity : FooEntity = cloneEntity(fooEntityWithId, fooMetadata);
            expect( clonedEntity?.fooId ).toBe('123');
            expect( clonedEntity?.fooName ).toBe('Hello world');
            expect( fooEntityWithId?.fooId ).toBe('123');
            expect( fooEntityWithId?.fooName ).toBe('Hello world');
            clonedEntity.fooName = '123';
            expect( clonedEntity?.fooId ).toBe('123');
            expect( clonedEntity?.fooName ).toBe('123');
            expect( fooEntityWithId?.fooId ).toBe('123');
            expect( fooEntityWithId?.fooName ).toBe('Hello world');
        });

        it('can clone older entity with ID and changes in the parent do not propagate to the child', () => {
            const clonedEntity : FooEntity = cloneEntity(fooEntityWithId, fooMetadata);
            expect( clonedEntity?.fooId ).toBe('123');
            expect( clonedEntity?.fooName ).toBe('Hello world');
            expect( fooEntityWithId?.fooId ).toBe('123');
            expect( fooEntityWithId?.fooName ).toBe('Hello world');
            fooEntityWithId.fooName = '123';
            expect( clonedEntity?.fooId ).toBe('123');
            expect( clonedEntity?.fooName ).toBe('Hello world');
            expect( fooEntityWithId?.fooId ).toBe('123');
            expect( fooEntityWithId?.fooName ).toBe('123');
        });

        it('can clone entity with properties that are not initialized in the entity constructor', () => {
            expect( barEntityWithId?.barId ).toBe('123');
            expect( barEntityWithId?.barName ).toBe('Hello world');

            const clonedEntity : BarEntity = cloneEntity(barEntityWithId, barMetadata);
            expect( clonedEntity?.barId ).toBe('123');
            expect( clonedEntity?.barName ).toBe('Hello world');
            expect( barEntityWithId?.barId ).toBe('123');
            expect( barEntityWithId?.barName ).toBe('Hello world');
            barEntityWithId.barName = '123';
            expect( clonedEntity?.barId ).toBe('123');
            expect( clonedEntity?.barName ).toBe('Hello world');
            expect( barEntityWithId?.barId ).toBe('123');
            expect( barEntityWithId?.barName ).toBe('123');
        });

    });

});
