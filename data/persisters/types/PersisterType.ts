// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../../types/Enum";
import { isUndefined } from "../../../types/undefined";
import { explainNot, explainOk, explainOr } from "../../../types/explain";

export enum PersisterType {
    MEMORY = "MEMORY",
    POSTGRESQL = "POSTGRESQL",
    MYSQL = "MYSQL",
    MOCK = "MOCK",
    OTHER = "OTHER",
}

export function isPersisterType (value: unknown) : value is PersisterType {
    return isEnum(PersisterType, value);
}

export function explainPersisterType (value : unknown) : string {
    return explainEnum("PersisterType", PersisterType, isPersisterType, value);
}

export function stringifyPersisterType (value : PersisterType) : string {
    return stringifyEnum(PersisterType, value);
}

export function parsePersisterType (value: any) : PersisterType | undefined {
    return parseEnum(PersisterType, value) as PersisterType | undefined;
}

export function isPersisterTypeOrUndefined (value: unknown): value is PersisterType | undefined {
    return isUndefined(PersisterType) || isPersisterType(value);
}

export function explainPersisterTypeOrUndefined (value: unknown): string {
    return isPersisterTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['PersisterType', 'undefined']));
}
