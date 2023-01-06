// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum JokerComApiUserAccess {
    FULL     = '@full',
    READONLY = '@read-only'
}

export function isJokerComApiUserAccess (value: any) : value is JokerComApiUserAccess {
    switch (value) {
        case JokerComApiUserAccess.FULL:
        case JokerComApiUserAccess.READONLY:
            return true;
        default:
            return false;
    }
}

export function explainJokerComApiUserAccess (value : any) : string {
    return explainEnum("JokerComApiAccessLevel", JokerComApiUserAccess, isJokerComApiUserAccess, value);
}

export function stringifyJokerComApiUserAccess (value : JokerComApiUserAccess) : string {
    switch (value) {
        case JokerComApiUserAccess.FULL      : return '@full';
        case JokerComApiUserAccess.READONLY  : return '@read-only';
    }
    throw new TypeError(`Unsupported JokerComApiAccessLevel value: ${value}`)
}

export function parseJokerComApiUserAccess (value: any) : JokerComApiUserAccess | undefined {
    if (value === undefined) return undefined;
    switch(`${value}`.toLowerCase()) {

        case '@full':
        case 'full'     : return JokerComApiUserAccess.FULL;

        case '@readonly':
        case '@read-only':
        case 'read-only':
        case 'readonly' : return JokerComApiUserAccess.READONLY;

        default         : return undefined;
    }
}
