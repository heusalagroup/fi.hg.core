// Copyright (c) 2022-2023. Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

export interface EntityRelationOneToMany {

    /**
     * The property name on the class
     */
    readonly propertyName : string;

    /**
     * The property name in which this relation is mapped to in the remote entity
     */
    readonly mappedBy : string;

    /**
     * The remote table in which this entity is mapped to, if known.
     *
     * This will be reverse-matched using the mappedBy property and the column
     * name from the `@ManyToOne` and `@JoinColumn` annotations.
     *
     * @See PersiserMetadataManagerImpl
     */
    readonly mappedTable ?: string | undefined;

}

export function createEntityRelationOneToMany (
    propertyName  : string,
    mappedBy      : string,
    mappedTable  ?: string | undefined
) : EntityRelationOneToMany {
    return {
        propertyName,
        mappedBy,
        mappedTable
    };
}
