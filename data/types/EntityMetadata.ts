// Copyright (c) 2022-2023. Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

import { CreateEntityLikeCallback } from "./EntityLike";
import { EntityField } from "./EntityField";
import { EntityRelationOneToMany } from "./EntityRelationOneToMany";
import { EntityRelationManyToOne } from "./EntityRelationManyToOne";

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

    oneToManyRelations : EntityRelationOneToMany[];
    manyToOneRelations : EntityRelationManyToOne[];

    createEntity : CreateEntityLikeCallback | undefined;

}

export function createEntityMetadata (
    tableName          : string,
    idPropertyName     : string,
    fields             : EntityField[],
    oneToManyRelations : EntityRelationOneToMany[],
    manyToOneRelations : EntityRelationManyToOne[],
    createEntity       : CreateEntityLikeCallback | undefined,
) : EntityMetadata {
    return {
        tableName,
        idPropertyName,
        fields,
        oneToManyRelations,
        manyToOneRelations,
        createEntity
    };
}
