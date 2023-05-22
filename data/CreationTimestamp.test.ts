// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../jest/matchers/index";
import { EntityMetadata } from "./types/EntityMetadata";
import { createEntityField, EntityField } from "./types/EntityField";
import { Table } from "./Table";
import { Id } from "./Id";
import { Column } from "./Column";
import { Entity } from "./Entity";
import { Temporal } from "./Temporal";
import { TemporalType } from "./types/TemporalType";
import { createTemporalProperty, TemporalProperty } from "./types/TemporalProperty";
import { CreationTimestamp } from "./CreationTimestamp";

describe('CreationTimestamp', () => {

    @Table('bars')
    class BarEntity extends Entity {

        constructor (dto ?: {barName: string}) {
            super()
            this.barName = dto?.barName;
        }

        @Id()
        @Column('bar_id')
        public barId ?: string;

        @Column('bar_name')
        public barName ?: string;

        @CreationTimestamp()
        @Temporal(TemporalType.TIMESTAMP)
        @Column('bar_date')
        public barDate ?: string;

        @Temporal(TemporalType.TIMESTAMP)
        @Column('bar_updated')
        public barUpdated ?: string;

    }

    let entity : BarEntity;
    let metadata : EntityMetadata;

    beforeEach(() => {
        entity = new BarEntity();
        metadata = entity.getMetadata();
    });

    it('can set fields metadata for barId field', () => {
        const expectedField : EntityField = createEntityField("barId", "bar_id");
        expect(metadata.fields).toBeArray();
        expect(metadata.fields).toContainEqual(expectedField);
    });

    it('can set fields metadata for barName property', () => {
        const expectedField : EntityField = createEntityField("barName", "bar_name");
        expect(metadata.fields).toBeArray();
        expect(metadata.fields).toContainEqual(expectedField);
    });

    it('can set fields metadata for barDate property', () => {
        const expectedField : EntityField = createEntityField("barDate","bar_date");
        expect(metadata.fields).toBeArray();
        expect(metadata.fields).toContainEqual(expectedField);
    });

    it('can set fields metadata for barUpdated property', () => {
        const expectedField : EntityField = createEntityField("barUpdated", "bar_updated");
        expect(metadata.fields).toBeArray();
        expect(metadata.fields).toContainEqual(expectedField);
    });

    it('can set temporal metadata for barDate property', () => {
        const expectedField : TemporalProperty = createTemporalProperty("barDate", TemporalType.TIMESTAMP);
        expect(metadata.temporalProperties).toBeArray();
        expect(metadata.temporalProperties).toContainEqual(expectedField);
    });

    it('can set temporal metadata for barUpdated property', () => {
        const expectedField : TemporalProperty = createTemporalProperty("barUpdated", TemporalType.TIMESTAMP);
        expect(metadata.temporalProperties).toBeArray();
        expect(metadata.temporalProperties).toContainEqual(expectedField);
    });

    it('can set creation timestamp metadata for barDate property', () => {
        expect(metadata.creationTimestamps).toBeArray();
        expect(metadata.creationTimestamps).toContainEqual("barDate");
    });

    it('cannot set creation timestamp metadata for barUpdated property', () => {
        expect(metadata.creationTimestamps).toBeArray();
        expect(metadata.creationTimestamps).not.toContainEqual("barUpdated");
    });

});
