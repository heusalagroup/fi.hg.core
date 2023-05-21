// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { cloneMemoryItem, MemoryItem } from "./MemoryItem";
import { map } from "../../../../functions/map";

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

export function cloneMemoryTable (
    table: MemoryTable
) : MemoryTable {
    const { items } = table;
    return {
        items: map(items, item => cloneMemoryItem(item))
    };
}
