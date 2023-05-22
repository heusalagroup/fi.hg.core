// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../../jest/matchers/index";
import { EntityUtils } from "./EntityUtils";
import { Table } from "../Table";
import { Entity } from "../Entity";
import { Id } from "../Id";
import { Column } from "../Column";
import { EntityFieldType } from "../types/EntityFieldType";

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

    describe('#getColumnName', () => {

        it('can get column name', () => {
            expect( EntityUtils.getColumnName('fooBar', [{fieldType: EntityFieldType.UNKNOWN, propertyName: 'fooBar', columnName: 'foo_bar', nullable: false, updatable: true, insertable: true}])).toBe('foo_bar');
        })

    });

});
