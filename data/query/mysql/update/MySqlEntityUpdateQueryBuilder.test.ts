// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { MySqlEntityUpdateQueryBuilder } from "./MySqlEntityUpdateQueryBuilder";
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
import { MySqlAndChainBuilder } from "../formulas/MySqlAndChainBuilder";

describe('MySqlEntityUpdateQueryBuilder', () => {

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
    // const termProperty = 'carTerm';

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
    // let carEntity2 : CarEntity;
    // let carEntity3 : CarEntity;
    // let entities : readonly Entity[];

    beforeEach( () => {

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
        // carEntity2 = new CarEntity('2', 'Car B', 99, false);
        // carEntity3 = new CarEntity('3', 'Car C', 3, true);

        // entities = [
        //     carEntity1,
        //     carEntity2,
        //     carEntity3,
        // ];

    })

    describe('create', () => {

        it('can build update query builder', () => {
            const builder = MySqlEntityUpdateQueryBuilder.create();
            expect( builder ).toBeDefined();
            builder.setTablePrefix(tablePrefix);
            builder.setTableName(tableName);

            builder.appendEntity(
                carEntity1,
                metadata.fields,
                metadata.temporalProperties,
                [idPropertyName]
            );

            const where = MySqlAndChainBuilder.create();
            where.setColumnEquals(tablePrefix+tableName, idColumn, "1");
            builder.setWhereFromQueryBuilder(where);

            const [ queryString, values ] = builder.build();

            expect( queryString ).toBe(`UPDATE ?? SET ?? = ?, ?? = ? WHERE (??.?? = ?)`);
            expect( values ).toHaveLength(8);

            // Table name
            expect( values[0] ).toBe(tablePrefix+tableName);

            // 1st column in set
            expect( values[1] ).toBe(nameColumn);
            expect( values[2] ).toBe('Car A');

            // 2nd column in set
            expect( values[3] ).toBe(ageColumn);
            expect( values[4] ).toBe(13);

            // Table in WHERE
            expect( values[5] ).toBe(tablePrefix+tableName);
            expect( values[6] ).toBe(idColumn);
            expect( values[7] ).toBe("1");

        });

    });

});
