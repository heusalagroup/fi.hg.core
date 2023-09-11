// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../../../types/Enum";

export enum ProductFeatureCategory {
    SUPPORT = "SUPPORT",
    UPGRADE = "UPGRADE",
    DISK    = "DISK",
    DISK_2  = "DISK_2",
    DISK_3  = "DISK_3",
    MEMORY  = "MEMORY",
    CPU     = "CPU",
    NETWORK = "NETWORK",
    VPS     = "VPS"
}

export function isProductFeatureCategory (value: any): value is ProductFeatureCategory {
    return isEnum(ProductFeatureCategory, value);
}

export function explainProductFeatureCategory (value : any) : string {
    return explainEnum("ProductFeatureCategory", ProductFeatureCategory, isProductFeatureCategory, value);
}

export function stringifyProductFeatureCategory (value: ProductFeatureCategory): string {
    return stringifyEnum(ProductFeatureCategory, value);
}

export function parseProductFeatureCategory (value: any): ProductFeatureCategory | undefined {
    return parseEnum(ProductFeatureCategory, value) as ProductFeatureCategory | undefined;
}
