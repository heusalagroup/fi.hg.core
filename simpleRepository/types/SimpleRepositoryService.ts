// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SimpleStoredRepositoryItem } from "./SimpleStoredRepositoryItem";

export interface SimpleRepositoryService<T extends SimpleStoredRepositoryItem> {
    initialize () : Promise<void>;
}
