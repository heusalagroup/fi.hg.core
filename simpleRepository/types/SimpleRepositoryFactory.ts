// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SimpleStoredRepositoryItem } from "./SimpleStoredRepositoryItem";
import { SimpleRepository } from "./SimpleRepository";

export interface SimpleRepositoryFactory<T extends SimpleStoredRepositoryItem> {
    (rooms: readonly string[]): SimpleRepository<T>;
}
