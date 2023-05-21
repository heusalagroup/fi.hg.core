// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { cloneMemoryTable, MemoryTable } from "./MemoryTable";
import { keys } from "../../../../functions/keys";
import { reduce } from "../../../../functions/reduce";

export interface MemoryDatabase {

    [tableName: string] : MemoryTable

}

export function createMemoryDatabase (): MemoryDatabase {
    return {};
}

export function cloneMemoryDatabase (
    database: MemoryDatabase
) : MemoryDatabase {
    const tables = keys(database);
    return reduce(
        tables,
        (db: MemoryDatabase, tableName: string) : MemoryDatabase => {
            db[tableName] = cloneMemoryTable(database[tableName]);
            return db;
        },
        createMemoryDatabase()
    );
}
