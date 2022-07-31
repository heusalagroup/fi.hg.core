// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { StoredRepositoryItem } from "./StoredRepositoryItem";
import { Repository } from "./Repository";

export interface RepositoryFactory<T extends StoredRepositoryItem> {
    (rooms: readonly string[]): Repository<T>;
}
