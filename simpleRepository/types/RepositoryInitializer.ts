// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { StoredRepositoryItem } from "./StoredRepositoryItem";
import { Repository } from "./Repository";
import { RepositoryClient } from "./RepositoryClient";

export interface RepositoryInitializer<T extends StoredRepositoryItem> {
    initializeRepository ( client: RepositoryClient ) : Promise<Repository<T>>;
}
