// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export interface RequestQueryParameters {
    readonly [key: string]: string;
}

export interface WritableRequestQueryParameters {
    [key: string]: string;
}
