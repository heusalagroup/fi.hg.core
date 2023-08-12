// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { MySqlEntityInsertQueryBuilder } from "./MySqlEntityInsertQueryBuilder";
import { createEntityMetadata, EntityMetadata } from "../../../types/EntityMetadata";
import { Entity } from "../../../Entity";
import { TemporalProperty } from "../../../types/TemporalProperty";
import { createEntityField, EntityField } from "../../../types/EntityField";
import { EntityRelationOneToMany } from "../../../types/EntityRelationOneToMany";
import { EntityRelationManyToOne } from "../../../types/EntityRelationManyToOne";
import { Table } from "../../../Table";
import { Id } from "../../../Id";
import { Column } from "../../../Column";
import { EntityFieldType } from "../../../types/EntityFieldType";
import { LogLevel } from "../../../../types/LogLevel";

describe('MySqlEntityInsertQueryBuilder', () => {

    const tablePrefix = 'db1_';
    const tableName = 'cars';
    const idColumn = 'car_id';
    const idPropertyName = 'carId';
    const nameColumn = 'car_name';
    const ageColumn = 'car_age';
    const termColumn = 'car_term';
    const idProperty = 'carId';
    const nameProperty = 'carName';
    const ageProperty = 'carAge';

    @Table(tableName)
    class CarEntity extends Entity {

        constructor (id ?: string | CarEntity, name ?: string, age?: number, term?: boolean) {
            super();
            if ( id && id instanceof CarEntity ) {
                this.carId = id.carId;
                this.carName = id.carName;
                this.carAge = id.carAge;
                this.carTerm = id.carTerm;
            } else {
                this.carId = id;
                this.carName = name;
                this.carAge = age;
                this.carTerm = term;
            }
        }

        @Id()
        @Column(idColumn)
        public carId ?: string | CarEntity;

        @Column(nameColumn)
        public carName ?: string;

        @Column(ageColumn)
        public carAge ?: number;

        @Column(termColumn, 'BOOL')
        public carTerm ?: boolean;

    }

    let fields: EntityField[];
    let oneToManyRelations : EntityRelationOneToMany[];
    let manyToOneRelations : EntityRelationManyToOne[];
    let temporalProperties : TemporalProperty[];
    let createEntity : () => Entity;

    let metadata : EntityMetadata;
    let carEntity1 : CarEntity;
    let carEntity2 : CarEntity;
    // let carEntity3 : CarEntity;
    // let entities : readonly Entity[];

    beforeEach( () => {

        MySqlEntityInsertQueryBuilder.setLogLevel(LogLevel.NONE);

        createEntity = () : Entity => new CarEntity();

        fields = [
            createEntityField(
                idProperty,
                idColumn,
                undefined,
                undefined,
                EntityFieldType.UNKNOWN,
                undefined
            ),
            createEntityField(
                nameProperty,
                nameColumn,
                undefined,
                undefined,
                EntityFieldType.UNKNOWN,
                undefined
            ),
            createEntityField(
                ageProperty,
                ageColumn,
                undefined,
                undefined,
                EntityFieldType.UNKNOWN,
                undefined
            ),
        ];

        oneToManyRelations = [];
        manyToOneRelations = [];
        temporalProperties = [];

        metadata = createEntityMetadata(
            tableName,
            idPropertyName,
            fields,
            oneToManyRelations,
            manyToOneRelations,
            temporalProperties,
            createEntity,
            [],
            [],
            []
        );

        carEntity1 = new CarEntity('1', 'Car A', 13, true);
        carEntity2 = new CarEntity('2', 'Car B', 99, false);
        // carEntity3 = new CarEntity('3', 'Car C', 3, true);

        // entities = [
        //     carEntity1,
        //     carEntity2,
        //     carEntity3,
        // ];

    })

    describe('create', () => {

        it('can build insert query builder', () => {
            const builder = MySqlEntityInsertQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);

            builder.appendEntity(
                carEntity1,
                metadata.fields,
                metadata.temporalProperties,
                [idPropertyName]
            );

            builder.appendEntity(
                carEntity2,
                metadata.fields,
                metadata.temporalProperties,
                [idPropertyName]
            );

            const [ queryString, values ] = builder.build();
            expect( queryString ).toBe(`INSERT INTO ?? (??, ??) VALUES (?, ?), (?, ?)`);

            expect( values ).toHaveLength(7);
            expect( values[0] ).toBe(tablePrefix+tableName);
            expect( values[1] ).toBe(nameColumn);
            expect( values[2] ).toBe(ageColumn);
            expect( values[3] ).toBe('Car A');
            expect( values[4] ).toBe(13);
            expect( values[5] ).toBe('Car B');
            expect( values[6] ).toBe(99);

        });

    });

});
