// Copyright (c) 2022-2023. Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

import { CreateEntityLikeCallback } from "./EntityLike";
import { EntityField, explainEntityField, isEntityField } from "./EntityField";
import { EntityRelationOneToMany, explainEntityRelationOneToMany, isEntityRelationOneToMany } from "./EntityRelationOneToMany";
import { EntityRelationManyToOne, explainEntityRelationManyToOne, isEntityRelationManyToOne } from "./EntityRelationManyToOne";
import { explainTemporalProperty, isTemporalProperty, TemporalProperty } from "./TemporalProperty";
import { EntityCallback, explainEntityCallback, isEntityCallback } from "./EntityCallback";
import { map } from "../../functions/map";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, isString } from "../../types/String";
import { explainArrayOf, isArrayOf } from "../../types/Array";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainStringArray, isStringArray } from "../../types/StringArray";
import { explainFunction, isFunction } from "../../types/Function";
import { isUndefined } from "../../types/undefined";

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

export function isEntityMetadata (value: unknown) : value is EntityMetadata {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'tableName',
            'idPropertyName',
            'fields',
            'temporalProperties',
            'oneToManyRelations',
            'manyToOneRelations',
            'creationTimestamps',
            'updateTimestamps',
            'createEntity',
            'callbacks',
        ])
        && isString(value?.tableName)                                    // string;
        && isString(value?.idPropertyName)                               // string;
        && isArrayOf<EntityField>(value?.fields, isEntityField)          // EntityField[];
        && isArrayOf<TemporalProperty>(value?.temporalProperties, isTemporalProperty)        // TemporalProperty[];
        && isArrayOf<EntityRelationOneToMany>(value?.oneToManyRelations, isEntityRelationOneToMany) // EntityRelationOneToMany[];
        && isArrayOf<EntityRelationManyToOne>(value?.manyToOneRelations, isEntityRelationManyToOne) // EntityRelationManyToOne[];
        && isStringArray(value?.creationTimestamps)                      // string[];
        && isStringArray(value?.updateTimestamps)                        // string[];
        && isFunction(value?.createEntity)                               // CreateEntityLikeCallback | undefined;
        && isArrayOf<EntityCallback>(value?.callbacks, isEntityCallback)                   // EntityCallback[];
    );
}

export function explainEntityMetadata (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'tableName',
                'idPropertyName',
                'fields',
                'temporalProperties',
                'oneToManyRelations',
                'manyToOneRelations',
                'creationTimestamps',
                'updateTimestamps',
                'createEntity',
                'callbacks',
            ])

            , explainProperty("tableName", explainString(value?.tableName))
            , explainProperty("idPropertyName", explainString(value?.idPropertyName))
            , explainProperty("fields", explainArrayOf<EntityField>("EntityField", explainEntityField, value?.fields, isEntityField))
            , explainProperty("temporalProperties", explainArrayOf<TemporalProperty>("TemporalProperty", explainTemporalProperty, value?.temporalProperties, isTemporalProperty))
            , explainProperty("oneToManyRelations", explainArrayOf<EntityRelationOneToMany>("EntityRelationOneToMany", explainEntityRelationOneToMany, value?.oneToManyRelations, isEntityRelationOneToMany))
            , explainProperty("manyToOneRelations", explainArrayOf<EntityRelationManyToOne>("EntityRelationManyToOne", explainEntityRelationManyToOne, value?.manyToOneRelations, isEntityRelationManyToOne))
            , explainProperty("creationTimestamps", explainStringArray(value?.creationTimestamps))
            , explainProperty("updateTimestamps", explainStringArray(value?.updateTimestamps))
            , explainProperty("createEntity", explainFunction(value?.createEntity))
            , explainProperty("callbacks", explainArrayOf<EntityCallback>("EntityCallback", explainEntityCallback, value?.callbacks, isEntityCallback))
        ]
    );
}

export function stringifyEntityMetadata (value : EntityMetadata) : string {
    return `EntityMetadata(${value})`;
}

export function parseEntityMetadata (value: unknown) : EntityMetadata | undefined {
    if (isEntityMetadata(value)) return value;
    return undefined;
}

export function isEntityMetadataOrUndefined (value: unknown): value is EntityMetadata | undefined {
    return isUndefined(value) || isEntityMetadata(value);
}

export function explainEntityMetadataOrUndefined (value: unknown): string {
    return isEntityMetadataOrUndefined(value) ? explainOk() : explainNot(explainOr(['EntityMetadata', 'undefined']));
}
