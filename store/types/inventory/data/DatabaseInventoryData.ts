// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { hasNoOtherKeys, isRegularObject, isString } from "../../../../modules/lodash";
import { InventoryData } from "./InventoryData";

export interface DatabaseInventoryData extends InventoryData {

    readonly hostname : string;
    readonly username : string;

    /**
     * Database name
     */
    readonly name : string;

}

export function createDatabaseInventoryData (
    hostname : string,
    username : string,
    name : string
): DatabaseInventoryData {
    return {
        hostname,
        username,
        name
    };
}

export function isDatabaseInventoryData (value: any): value is DatabaseInventoryData {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'hostname',
            'username',
            'name'
        ])
        && isString(value?.hostname)
        && isString(value?.username)
        && isString(value?.name)
    );
}

export function stringifyDatabaseInventoryData (value: DatabaseInventoryData): string {
    return `DatabaseInventoryData(${value})`;
}

export function parseDatabaseInventoryData (value: any): DatabaseInventoryData | undefined {
    if ( isDatabaseInventoryData(value) ) return value;
    return undefined;
}
