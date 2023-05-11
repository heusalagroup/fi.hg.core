// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";

export enum SortDirection {
    ASC = 1,
    DESC = 2
}

export function isSortDirection (value: unknown) : value is SortDirection {
    return isEnum(SortDirection, value);
}

export function explainSortDirection (value : unknown) : string {
    return explainEnum("SortDirection", SortDirection, isSortDirection, value);
}

export function stringifySortDirection (value : SortDirection) : string {
    return stringifyEnum(SortDirection, value);
}

export function parseSortDirection (value: any) : SortDirection | undefined {
    return parseEnum(SortDirection, value) as SortDirection | undefined;
}
