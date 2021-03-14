// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import "reflect-metadata";

export interface EntityField {
    propertyName: string;
    columnName: string;
}

export default interface EntityMetadata {
    tableName: string;
    idPropertyName: string;
    fields: EntityField[];
}

export interface KeyValuePairs {
    [key: string]: any;
}
