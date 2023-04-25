// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { toUpper } from "../../functions/toUpper";

export enum RepositoryType {

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

export function isRepositoryType (value: any): value is RepositoryType {
    switch (value) {
        case RepositoryType.MEMORY:
        case RepositoryType.MATRIX:
        case RepositoryType.REPOSITORY_ADAPTER:
            return true;
        default:
            return false;
    }
}

export function stringifyRepositoryType (value: RepositoryType): string {
    switch (value) {
        case RepositoryType.MEMORY : return 'MEMORY';
        case RepositoryType.MATRIX : return 'MATRIX';
        case RepositoryType.REPOSITORY_ADAPTER : return 'REPOSITORY_ADAPTER';
    }
    throw new TypeError(`Unsupported RepositoryType value: ${value}`);
}

export function parseRepositoryType (value: any): RepositoryType | undefined {
    switch (toUpper(`${value}`)) {
        case 'MEMORY' : return RepositoryType.MEMORY;
        case 'MATRIX' : return RepositoryType.MATRIX;
        case 'REPOSITORY_ADAPTER' : return RepositoryType.REPOSITORY_ADAPTER;
        default : return undefined;
    }
}
