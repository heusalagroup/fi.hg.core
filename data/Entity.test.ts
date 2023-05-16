// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { EntityMetadata } from "./types/EntityMetadata";
import "../../jest/matchers/index";
import { Table } from "./Table";
import { Id } from "./Id";
import { Column } from "./Column";
import { Entity } from "./Entity";

describe('Entity', () => {

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

    });

    describe('#clone', () => {

        it('can clone entity', () => {
            const clonedEntity : FooEntity = entity.clone();
            entity.fooBoolean = false;
            expect(clonedEntity?.fooBoolean).toBe(true);
        });

    });

});
