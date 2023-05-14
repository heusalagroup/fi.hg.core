// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum EntityFieldType {
    UNKNOWN = "UNKNOWN",
    STRING = "STRING",
    NUMBER = "NUMBER",
    BIGINT = "BIGINT",
    BOOLEAN = "BOOLEAN",
    DATE_TIME = "DATE_TIME",
    TIME = "TIME",
    DATE = "DATE",

    /**
     * This is another entity which has been joined from another table using
     * `@JoinColumn` annotation.
     */
    JOINED_ENTITY = "JOINED_ENTITY"

}

export function isEntityFieldType (value: unknown) : value is EntityFieldType {
    return isEnum(EntityFieldType, value);
}

export function explainEntityFieldType (value : unknown) : string {
    return explainEnum("EntityFieldType", EntityFieldType, isEntityFieldType, value);
}

export function stringifyEntityFieldType (value : EntityFieldType) : string {
    return stringifyEnum(EntityFieldType, value);
}

export function parseEntityFieldType (value: any) : EntityFieldType | undefined {
    return parseEnum(EntityFieldType, value) as EntityFieldType | undefined;
}

export function isEntityFieldTypeOrUndefined (value: unknown): value is EntityFieldType | undefined {
    return isUndefined(EntityFieldType) || isEntityFieldType(value);
}

export function explainEntityFieldTypeOrUndefined (value: unknown): string {
    return isEntityFieldTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['EntityFieldType', 'undefined']));
}
