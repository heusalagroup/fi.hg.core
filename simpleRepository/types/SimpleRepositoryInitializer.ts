// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SimpleStoredRepositoryItem } from "./SimpleStoredRepositoryItem";
import { SimpleRepository } from "./SimpleRepository";
import { SimpleRepositoryClient } from "./SimpleRepositoryClient";

export interface SimpleRepositoryInitializer<T extends SimpleStoredRepositoryItem> {
    initializeRepository ( client: SimpleRepositoryClient ) : Promise<SimpleRepository<T>>;
}
