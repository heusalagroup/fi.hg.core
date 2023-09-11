// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../../../types/Enum";

export enum ProductFeatureId {
    WP        = "WP",
    VPS_TYPE        = "VPS_TYPE",
    VPS_OS          = "VPS_OS",

    SUPPORT_1H_M        = "SUPPORT_1H_M",
    BACKUP_RESTORE_1H_M = "BACKUP_RESTORE_1H_M",
    UPGRADE_1VPS_M        = "UPGRADE_1VPS_M",

    DISK_TYPE       = "DISK_TYPE",
    DISK_SIZE       = "DISK_SIZE",
    DISK_RAID       = "DISK_RAID",
    DISK_BACKUP     = "DISK_BACKUP",
    DISK_USAGE     = "DISK_USAGE",

    DISK_2_TYPE       = "DISK_2_TYPE",
    DISK_2_SIZE       = "DISK_2_SIZE",
    DISK_2_RAID       = "DISK_2_RAID",
    DISK_2_BACKUP     = "DISK_2_BACKUP",
    DISK_2_USAGE     = "DISK_2_USAGE",

    DISK_3_TYPE       = "DISK_3_TYPE",
    DISK_3_SIZE       = "DISK_3_SIZE",
    DISK_3_RAID       = "DISK_3_RAID",
    DISK_3_BACKUP     = "DISK_3_BACKUP",
    DISK_3_USAGE     = "DISK_3_USAGE",

    MEMORY_SIZE     = "MEMORY_SIZE",
    NETWORK_TYPE    = "NETWORK_TYPE",
    NETWORK_IP4     = "NETWORK_IP4",
    NETWORK_IP6     = "NETWORK_IP6",
    NETWORK_NET6     = "NETWORK_NET6",
    NETWORK_TRAFFIC = "NETWORK_TRAFFIC",
    NETWORK_ZONE    = "NETWORK_ZONE",
    CPU_SHARE       = "CPU_SHARE",
    CPU_AMOUNT      = "CPU_AMOUNT"
}

export function isProductFeatureId (value: any): value is ProductFeatureId {
    return isEnum(ProductFeatureId, value);
}

export function explainProductFeatureId (value : any) : string {
    return explainEnum("ProductFeatureId", ProductFeatureId, isProductFeatureId, value);
}

export function stringifyProductFeatureId (value: ProductFeatureId): string {
    return stringifyEnum(ProductFeatureId, value);
}

export function parseProductFeatureId (value: any): ProductFeatureId | undefined {
    return parseEnum(ProductFeatureId, value) as ProductFeatureId | undefined;
}
