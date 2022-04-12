// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { RepositoryEntry } from "./RepositoryEntry";

/**
 * @deprecated Use Repository<T> directly -- or refactor this interface to have multiple interfaces
 *             for every type of access.
 */
export interface PublicRepository<T> {

    findById (id: string): Promise<RepositoryEntry<T> | undefined>;

}
