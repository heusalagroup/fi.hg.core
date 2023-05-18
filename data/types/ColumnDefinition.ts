// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";

export enum ColumnDefinition {
    JSON = "JSON",
    JSONB = "JSONB",

    BIGINT = "BIGINT",

    TIMESTAMP = "TIMESTAMP",
    TIMESTAMPTZ = "TIMESTAMPTZ",
    DATE = "DATE",
    DATETZ = "DATETZ",
    DATETIME = "DATETIME",
    DATETIMETZ = "DATETIMETZ",
    TIME = "TIME",
    TIMETZ = "TIMETZ",

}

const JSON_COLUMN_DEFINITIONS : readonly ColumnDefinition[] = [
    ColumnDefinition.JSON,
    ColumnDefinition.JSONB
];

const TIME_COLUMN_DEFINITIONS : readonly ColumnDefinition[] = [
    ColumnDefinition.TIMESTAMP,
    ColumnDefinition.TIMESTAMPTZ,
    ColumnDefinition.DATE,
    ColumnDefinition.DATETZ,
    ColumnDefinition.DATETIME,
    ColumnDefinition.DATETIMETZ,
    ColumnDefinition.TIME,
    ColumnDefinition.TIMETZ,
];

export function isJsonColumnDefinition (value: unknown) : value is ColumnDefinition.JSON | ColumnDefinition.JSONB {
    return isColumnDefinition(value) && JSON_COLUMN_DEFINITIONS.includes(value);
}

export function isTimeColumnDefinition (value: unknown) : value is (
    ColumnDefinition.TIMESTAMP
    | ColumnDefinition.TIMESTAMPTZ
    | ColumnDefinition.DATE
    | ColumnDefinition.DATETZ
    | ColumnDefinition.DATETIME
    | ColumnDefinition.DATETIMETZ
    | ColumnDefinition.TIME
    | ColumnDefinition.TIMETZ
) {
    return isColumnDefinition(value) && TIME_COLUMN_DEFINITIONS.includes(value);
}

export function isColumnDefinition (value: unknown) : value is ColumnDefinition {
    return isEnum(ColumnDefinition, value);
}

export function explainColumnDefinition (value : unknown) : string {
    return explainEnum("ColumnDefinition", ColumnDefinition, isColumnDefinition, value);
}

export function stringifyColumnDefinition (value : ColumnDefinition) : string {
    return stringifyEnum(ColumnDefinition, value);
}

export function parseColumnDefinition (value: any) : ColumnDefinition | undefined {
    return parseEnum(ColumnDefinition, value) as ColumnDefinition | undefined;
}

export function isColumnDefinitionOrUndefined (value: unknown): value is ColumnDefinition | undefined {
    return isUndefined(ColumnDefinition) || isColumnDefinition(value);
}

export function explainColumnDefinitionOrUndefined (value: unknown): string {
    return isColumnDefinitionOrUndefined(value) ? explainOk() : explainNot(explainOr(['ColumnDefinition', 'undefined']));
}
