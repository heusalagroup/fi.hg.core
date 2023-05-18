// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export interface TablePrefixable {

    /**
     * Set an optional prefix for each table name.
     *
     * This allows you to use same database for multiple purposes.
     *
     * @param prefix
     */
    setTablePrefix (prefix: string) : void;

    /**
     * Get the optional table prefix.
     *
     * Will return empty string if not defined.
     */
    getTablePrefix () : string;

    /**
     * Returns complete table name including the prefix.
     *
     * @param tableName The table name without prefix
     * @returns The table name with prefix added
     */
    getTableNameWithPrefix (tableName : string) : string;

    /**
     * Set the main table which this query is intended for.
     *
     * @param tableName The table name without prefix
     */
    setTableName (tableName: string) : void;

    /**
     * Get the main table name without prefix.
     *
     * @returns The table name without prefix
     */
    getTableName () : string;

    /**
     * Get the main table name with prefix included.
     *
     * @returns The full table name as it's used inside the relational database
     */
    getCompleteTableName () : string;

}
