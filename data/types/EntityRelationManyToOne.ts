// Copyright (c) 2022-2023. Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

export interface EntityRelationManyToOne {

    /**
     * The property name on the class
     */
    readonly propertyName : string;

    /**
     * The remote table in which this entity is mapped to.
     *
     * @See {@link ManyToOne}
     */
    readonly mappedTable : string;

}

export function createEntityRelationManyToOne (
    propertyName  : string,
    mappedTable   : string
) : EntityRelationManyToOne {
    return {
        propertyName,
        mappedTable
    };
}
