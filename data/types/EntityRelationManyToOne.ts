// Copyright (c) 2022-2023. Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

export interface EntityRelationManyToOne {

    /**
     * The property name on the class
     */
    readonly propertyName : string;

    /**
     * The remote table in which this entity is mapped to, if known.
     *
     * This will be reverse-matched using the mappedBy property and the column
     * name from the `@OneToMany` and `@JoinColumn` annotations.
     *
     * @See PersiserMetadataManagerImpl
     */
    readonly mappedTable ?: string | undefined;

}

export function createEntityRelationManyToOne (
    propertyName  : string,
    mappedTable  ?: string | undefined
) : EntityRelationManyToOne {
    return {
        propertyName,
        mappedTable
    };
}
