// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { jest } from '@jest/globals';
import "../../jest/matchers/index";
import { EntityMetadata } from "./types/EntityMetadata";
import { Table } from "./Table";
import { Id } from "./Id";
import { Column } from "./Column";
import { Entity } from "./Entity";
import { PostLoad } from "./PostLoad";
import { createEntityCallback, EntityCallback } from "./types/EntityCallback";
import { EntityCallbackType } from "./types/EntityCallbackType";
import { LogLevel } from "../types/LogLevel";

PostLoad.setLogLevel(LogLevel.NONE);
describe('PostLoad', () => {

    const callback = jest.fn();

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

        @PostLoad()
        public onPostLoad () : void {
            callback();
        }

    }

    let entity : FooEntity;
    let metadata : EntityMetadata;

    beforeEach(() => {
        entity = new FooEntity();
        metadata = entity.getMetadata();
        callback.mockClear();
    });

    it('can set callbacks metadata for PostLoad', () => {
        const expectedCallback : EntityCallback = createEntityCallback("onPostLoad", EntityCallbackType.POST_LOAD);
        expect(metadata.callbacks).toBeArray();
        expect(metadata.callbacks).toContainEqual(expectedCallback);
    });

});
