// Copyright (c) 2022-2023. Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

import { CreateEntityLikeCallback } from "./EntityLike";
import { EntityField } from "./EntityField";
import { EntityRelationOneToMany } from "./EntityRelationOneToMany";
import { EntityRelationManyToOne } from "./EntityRelationManyToOne";
import { TemporalProperty } from "./TemporalProperty";
import { EntityCallback } from "./EntityCallback";
import { map } from "../../functions/map";

export interface EntityMetadata {

    /**
     * The SQL table name
     */
    tableName      : string;

    /**
     * The property name of the primary key
     */
    idPropertyName : string;

    /**
     * Metadata for fields
     */
    fields         : EntityField[];

    /**
     * Metadata for temporal annotation
     */
    temporalProperties : TemporalProperty[];

    oneToManyRelations : EntityRelationOneToMany[];
    manyToOneRelations : EntityRelationManyToOne[];

    /**
     * Property names for @CreationTimestamp annotations
     */
    creationTimestamps : string[];

    /**
     * Property names for @UpdateTimestamp annotations
     */
    updateTimestamps : string[];

    createEntity : CreateEntityLikeCallback | undefined;

    callbacks : EntityCallback[];

}

export function createEntityMetadata (
    tableName          : string,
    idPropertyName     : string,
    fields             : readonly EntityField[],
    oneToManyRelations : readonly EntityRelationOneToMany[],
    manyToOneRelations : readonly EntityRelationManyToOne[],
    temporalProperties : readonly TemporalProperty[],
    createEntity       : CreateEntityLikeCallback | undefined,
    callbacks          : readonly EntityCallback[],
    creationTimestamps : readonly string[],
    updateTimestamps   : readonly string[]
) : EntityMetadata {
    return {
        tableName,
        idPropertyName,
        fields: map(fields, item => item),
        oneToManyRelations: map(oneToManyRelations, item => item),
        manyToOneRelations: map(manyToOneRelations, item => item),
        temporalProperties: map(temporalProperties, item => item),
        createEntity,
        callbacks: map(callbacks, item => item),
        creationTimestamps: map(creationTimestamps, item => item),
        updateTimestamps: map(updateTimestamps, item => item)
    };
}
