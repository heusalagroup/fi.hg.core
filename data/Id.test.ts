// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../jest/matchers/index";
import { Column, Entity, Id, Table } from "./Entity";
import { EntityMetadata } from "./types/EntityMetadata";

describe('Id', () => {

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

    it('can set idPropertyName metadata', () => {
        expect(metadata.idPropertyName).toBe('fooId');
    });

});
