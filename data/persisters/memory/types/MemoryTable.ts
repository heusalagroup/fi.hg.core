// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { MemoryItem } from "./MemoryItem";

export interface MemoryTable {

    items: MemoryItem[];

}

export function createMemoryTable (
    items ?: MemoryItem[]
): MemoryTable {
    return {
        items: items ?? []
    };
}
