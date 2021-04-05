// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import "reflect-metadata";

export interface EntityField {

    /**
     * The property name on the class
     */
    propertyName : string;

    /**
     * The field name in the database table
     */
    columnName   : string;

}

export interface EntityMetadata {

    /**
     * The SQL table name
     */
    tableName      : string;

    /**
     * The property name of the primary key
     */
    idPropertyName : string;

    /**
     * Metadata for fields
     */
    fields         : EntityField[];

}

export interface KeyValuePairs {
    [key: string]: any;
}

export default EntityMetadata;
