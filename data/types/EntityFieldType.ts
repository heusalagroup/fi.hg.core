// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../types/Enum";

export enum EntityFieldType {
    UNKNOWN = "UNKNOWN",
    STRING = "STRING",
    NUMBER = "NUMBER",
    BIGINT = "BIGINT",
    BOOLEAN = "BOOLEAN",
    DATE_TIME = "DATE_TIME",

    /**
     * This is another entity which has been joined from another table using
     * `@JoinColumn` annotation.
     */
    JOINED_ENTITY = "JOINED_ENTITY"

}

export function isEntityFieldType (value: unknown) : value is EntityFieldType {
    switch (value) {
        case EntityFieldType.UNKNOWN:
        case EntityFieldType.STRING:
        case EntityFieldType.BIGINT:
        case EntityFieldType.NUMBER:
        case EntityFieldType.BOOLEAN:
        case EntityFieldType.DATE_TIME:
        case EntityFieldType.JOINED_ENTITY:
            return true;
        default:
            return false;
    }
}

export function explainEntityFieldType (value : unknown) : string {
    return explainEnum("EntityFieldType", EntityFieldType, isEntityFieldType, value);
}

export function stringifyEntityFieldType (value : EntityFieldType) : string {
    switch (value) {
        case EntityFieldType.UNKNOWN  : return 'UNKNOWN';
        case EntityFieldType.STRING  : return 'STRING';
        case EntityFieldType.BIGINT  : return 'BIGINT';
        case EntityFieldType.NUMBER  : return 'NUMBER';
        case EntityFieldType.BOOLEAN  : return 'BOOLEAN';
        case EntityFieldType.DATE_TIME  : return 'DATE_TIME';
        case EntityFieldType.JOINED_ENTITY  : return 'JOINED_ENTITY';
    }
    throw new TypeError(`Unsupported EntityFieldType value: ${value}`)
}

export function parseEntityFieldType (value: unknown) : EntityFieldType | undefined {
    if (value === undefined) return undefined;
    if (isEntityFieldType(value)) return value;
    switch(`${value}`.toUpperCase()) {
        case 'UNKNOWN' : return EntityFieldType.UNKNOWN;
        case 'STRING' : return EntityFieldType.STRING;
        case 'BIGINT' : return EntityFieldType.BIGINT;
        case 'NUMBER' : return EntityFieldType.NUMBER;
        case 'BOOLEAN' : return EntityFieldType.BOOLEAN;
        case 'DATE_TIME' : return EntityFieldType.DATE_TIME;
        case 'JOINED_ENTITY' : return EntityFieldType.JOINED_ENTITY;
        default : return undefined;
    }
}
