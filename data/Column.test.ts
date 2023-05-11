// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../jest/matchers/index";
import { Column, Entity, Id, Table } from "./Entity";
import { EntityMetadata } from "./types/EntityMetadata";
import { createEntityField, EntityField } from "./types/EntityField";

describe('Column', () => {

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

    }

    let entity : FooEntity;
    let metadata : EntityMetadata;

    beforeEach(() => {
        entity = new FooEntity();
        metadata = entity.getMetadata();
    });

    it('can set fields metadata for string id field', () => {
        const expectedField : EntityField = createEntityField("fooId", "foo_id");
        expect(metadata.fields).toBeArray();
        expect(metadata.fields).toContainEqual(expectedField);
    });

    it('can set fields metadata for string property', () => {
        const expectedField : EntityField = createEntityField("fooName", "foo_name");
        expect(metadata.fields).toBeArray();
        expect(metadata.fields).toContainEqual(expectedField);
    });

    it('can set fields metadata for number property', () => {
        const expectedField : EntityField = createEntityField("fooNumber","foo_number");
        expect(metadata.fields).toBeArray();
        expect(metadata.fields).toContainEqual(expectedField);
    });

    it('can set fields metadata for boolean property', () => {
        const expectedField : EntityField = createEntityField("fooBoolean", "foo_boolean");
        expect(metadata.fields).toBeArray();
        expect(metadata.fields).toContainEqual(expectedField);
    });

});
