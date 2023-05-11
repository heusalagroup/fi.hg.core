// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { toUpper } from "../../functions/toUpper";

export enum SimpleRepositoryType {

    /**
     * Memory only repository.
     *
     * @see `MemoryRepository`
     */
    MEMORY = "MEMORY",

    /**
     * Matrix state event repository.
     *
     * @See [MatrixCrudRepository](https://github.com/heusalagroup/fi.hg.matrix/blob/main/MatrixCrudRepository.ts)
     */
    MATRIX = "MATRIX",

    /**
     * PostgreSQL and MySQL supports through SimpleRepositoryAdapter
     *
     * @See [SimpleRepositoryAdapter](https://github.com/heusalagroup/fi.hg.repository/blob/main/adapters/simple/SimpleRepositoryAdapter.ts)
     */
    REPOSITORY_ADAPTER = "REPOSITORY_ADAPTER",

}

export function isRepositoryType (value: any): value is SimpleRepositoryType {
    switch (value) {
        case SimpleRepositoryType.MEMORY:
        case SimpleRepositoryType.MATRIX:
        case SimpleRepositoryType.REPOSITORY_ADAPTER:
            return true;
        default:
            return false;
    }
}

export function stringifyRepositoryType (value: SimpleRepositoryType): string {
    switch (value) {
        case SimpleRepositoryType.MEMORY : return 'MEMORY';
        case SimpleRepositoryType.MATRIX : return 'MATRIX';
        case SimpleRepositoryType.REPOSITORY_ADAPTER : return 'REPOSITORY_ADAPTER';
    }
    throw new TypeError(`Unsupported RepositoryType value: ${value}`);
}

export function parseRepositoryType (value: any): SimpleRepositoryType | undefined {
    switch (toUpper(`${value}`)) {
        case 'MEMORY' : return SimpleRepositoryType.MEMORY;
        case 'MATRIX' : return SimpleRepositoryType.MATRIX;
        case 'REPOSITORY_ADAPTER' : return SimpleRepositoryType.REPOSITORY_ADAPTER;
        default : return undefined;
    }
}
