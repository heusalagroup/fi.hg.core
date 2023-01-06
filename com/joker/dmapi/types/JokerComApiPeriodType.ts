// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum JokerComApiPeriodType {
    YEARS = "YEARS",
    MONTHS = "MONTHS"
}

export function isJokerComApiPeriodType (value: any): value is JokerComApiPeriodType {
    switch (value) {
        case JokerComApiPeriodType.YEARS:
        case JokerComApiPeriodType.MONTHS:
            return true;
        default:
            return false;
    }
}

export function explainJokerComApiPeriodType (value: any): string {
    return explainEnum("JokerComApiPeriodType", JokerComApiPeriodType, isJokerComApiPeriodType, value);
}

export function stringifyJokerComApiPeriodType (value: JokerComApiPeriodType): string {
    switch (value) {
        case JokerComApiPeriodType.YEARS  : return 'YEARS';
        case JokerComApiPeriodType.MONTHS  : return 'MONTHS';
    }
    throw new TypeError(`Unsupported JokerComApiPeriodType value: ${value}`);
}

export function parseJokerComApiPeriodType (value: any): JokerComApiPeriodType | undefined {
    if ( value === undefined ) return undefined;
    switch (`${value}`.toUpperCase()) {
        case 'YEARS' : return JokerComApiPeriodType.YEARS;
        case 'MONTHS' : return JokerComApiPeriodType.MONTHS;
        default     : return undefined;
    }
}
