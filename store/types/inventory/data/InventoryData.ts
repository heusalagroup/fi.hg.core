// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainReadonlyJsonObject,
    isReadonlyJsonObject,
    ReadonlyJsonObject
} from "../../../../Json";

export interface InventoryData extends ReadonlyJsonObject {
}

export function isInventoryData (value: any) : value is InventoryData {
    return isReadonlyJsonObject(value);
}

export function explainInventoryData (value: any) : string {
    return explainReadonlyJsonObject(value);
}
