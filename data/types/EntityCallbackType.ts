// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { isUndefined } from "../../types/undefined";
import { explainNot, explainOk, explainOr } from "../../types/explain";

export enum EntityCallbackType {
    PRE_PERSIST = "PRE_PERSIST",
    POST_PERSIST = "POST_PERSIST",
    PRE_REMOVE = "PRE_REMOVE",
    POST_REMOVE = "POST_REMOVE",
    PRE_UPDATE = "PRE_UPDATE",
    POST_UPDATE = "POST_UPDATE",
    POST_LOAD = "POST_LOAD",
}

export function isEntityCallbackType (value: unknown) : value is EntityCallbackType {
    return isEnum(EntityCallbackType, value);
}

export function explainEntityCallbackType (value : unknown) : string {
    return explainEnum("EntityCallbackType", EntityCallbackType, isEntityCallbackType, value);
}

export function stringifyEntityCallbackType (value : EntityCallbackType) : string {
    return stringifyEnum(EntityCallbackType, value);
}

export function parseEntityCallbackType (value: any) : EntityCallbackType | undefined {
    return parseEnum(EntityCallbackType, value) as EntityCallbackType | undefined;
}

export function isEntityCallbackTypeOrUndefined (value: unknown): value is EntityCallbackType | undefined {
    return isUndefined(EntityCallbackType) || isEntityCallbackType(value);
}

export function explainEntityCallbackTypeOrUndefined (value: unknown): string {
    return isEntityCallbackTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['EntityCallbackType', 'undefined']));
}
