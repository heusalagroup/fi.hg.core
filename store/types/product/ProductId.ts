// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainString, isString } from "../../../types/String";

export type ProductId = string;

export function isProductId (value: any) : value is ProductId {
    return isString(value);
}

export function explainProductId (value: any) : string {
    return explainString(value);
}
