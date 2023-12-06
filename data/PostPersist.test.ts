// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { jest } from '@jest/globals';
import "../../jest/matchers/index";
import { EntityMetadata } from "./types/EntityMetadata";
import { Table } from "./Table";
import { Id } from "./Id";
import { Column } from "./Column";
import { Entity } from "./Entity";
import { PostPersist } from "./PostPersist";
import { createEntityCallback, EntityCallback } from "./types/EntityCallback";
import { EntityCallbackType } from "./types/EntityCallbackType";
import { LogLevel } from "../types/LogLevel";

PostPersist.setLogLevel(LogLevel.NONE);
describe('PostPersist', () => {

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

        @PostPersist()
        public onPostPersist () : void {
            callback();
        }

    }

    let entity : FooEntity;
    let metadata : EntityMetadata;

    beforeEach(() => {
        entity = new FooEntity();
        metadata = entity.getMetadata();
    });

    it('can set callbacks metadata for PostPersist', () => {
        const expectedCallback : EntityCallback = createEntityCallback("onPostPersist", EntityCallbackType.POST_PERSIST);
        expect(metadata.callbacks).toBeArray();
        expect(metadata.callbacks).toContainEqual(expectedCallback);
    });

});
