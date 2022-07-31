// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { StoredRepositoryItem } from "./StoredRepositoryItem";

export interface RepositoryService<T extends StoredRepositoryItem> {
    initialize () : Promise<void>;
}
