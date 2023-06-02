// Copyright (c) 2022-2023. Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, isString } from "../../types/String";
import { explain, explainProperty } from "../../types/explain";

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

export function isEntityRelationManyToOne (value: unknown) : value is EntityRelationManyToOne {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'propertyName',
            'mappedTable',
        ])
        && isString(value?.propertyName)
        && isString(value?.mappedTable)
    );
}

export function explainEntityRelationManyToOne (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'propertyName',
                'mappedTable',
            ])
            , explainProperty("propertyName", explainString(value?.propertyName))
            , explainProperty("mappedTable", explainString(value?.mappedTable))
        ]
    );
}

export function stringifyEntityRelationManyToOne (value : EntityRelationManyToOne) : string {
    return `EntityRelationManyToOne(${value})`;
}

export function parseEntityRelationManyToOne (value: unknown) : EntityRelationManyToOne | undefined {
    if (isEntityRelationManyToOne(value)) return value;
    return undefined;
}
