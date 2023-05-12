// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../../jest/matchers/index";
import { EntityUtils } from "./EntityUtils";
import { createEntityMetadata, EntityMetadata } from "../types/EntityMetadata";
import { createEntityField } from "../types/EntityField";
import { Table } from "../Table";
import { Entity } from "../Entity";
import { Id } from "../Id";
import { Column } from "../Column";

describe('EntityUtils', () => {

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
            this.barName = undefined;
        }

        @Id()
        @Column('bar_id')
        public barId ?: string;

        @Column('bar_name')
        public barName ?: string;

    }

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
                (dto?: any) => new FooEntity(dto)
            );

        });

        it('can turn fresh entity as JSON object', () => {
            const fooJson = EntityUtils.toJSON(fooEntity, fooMetadata);
            expect( fooJson ).toBeRegularObject();
            expect( fooJson?.fooId ).not.toBeDefined();
            expect( fooJson?.fooName ).toBe('Hello world');
        });

        it('can turn older entity with id as JSON object', () => {
            const fooJson = EntityUtils.toJSON(fooEntityWithId, fooMetadata);
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
                (dto?: any) => new FooEntity(dto)
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
                (dto?: any) => new BarEntity(dto)
            );

        });

        it('can clone fresh entity without id and changes do not propagate to the parent', () => {
            const clonedEntity : FooEntity = EntityUtils.clone(fooEntity, fooMetadata);
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
            const clonedEntity : FooEntity = EntityUtils.clone(fooEntity, fooMetadata);
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
            const clonedEntity : FooEntity = EntityUtils.clone(fooEntityWithId, fooMetadata);
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
            const clonedEntity : FooEntity = EntityUtils.clone(fooEntityWithId, fooMetadata);
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

            const clonedEntity : BarEntity = EntityUtils.clone(barEntityWithId, barMetadata);
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
