// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../modules/lodash";

export enum ProductFeatureId {
    WP        = "WP",
    VPS_TYPE        = "VPS_TYPE",
    VPS_OS          = "VPS_OS",
    DISK_TYPE       = "DISK_TYPE",
    DISK_SIZE       = "DISK_SIZE",
    DISK_RAID       = "DISK_RAID",
    DISK_BACKUP     = "DISK_BACKUP",
    DISK_2_TYPE       = "DISK_2_TYPE",
    DISK_2_SIZE       = "DISK_2_SIZE",
    DISK_2_RAID       = "DISK_2_RAID",
    DISK_2_BACKUP     = "DISK_2_BACKUP",
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
    switch (value) {
        case ProductFeatureId.WP:
        case ProductFeatureId.VPS_TYPE:
        case ProductFeatureId.VPS_OS:
        case ProductFeatureId.DISK_TYPE:
        case ProductFeatureId.DISK_SIZE:
        case ProductFeatureId.DISK_RAID:
        case ProductFeatureId.DISK_BACKUP:
        case ProductFeatureId.DISK_2_TYPE:
        case ProductFeatureId.DISK_2_SIZE:
        case ProductFeatureId.DISK_2_RAID:
        case ProductFeatureId.DISK_2_BACKUP:
        case ProductFeatureId.MEMORY_SIZE:
        case ProductFeatureId.NETWORK_TYPE:
        case ProductFeatureId.NETWORK_IP4:
        case ProductFeatureId.NETWORK_IP6:
        case ProductFeatureId.NETWORK_NET6:
        case ProductFeatureId.NETWORK_TRAFFIC:
        case ProductFeatureId.CPU_SHARE:
        case ProductFeatureId.CPU_AMOUNT:
        case ProductFeatureId.NETWORK_ZONE:
            return true;
        default:
            return false;
    }
}

export function explainProductFeatureId (value : any) : string {
    return explainEnum("ProductFeatureId", ProductFeatureId, isProductFeatureId, value);
}

export function stringifyProductFeatureId (value: ProductFeatureId): string {
    switch (value) {
        case ProductFeatureId.WP : return 'WP';
        case ProductFeatureId.VPS_TYPE : return 'VPS_TYPE';
        case ProductFeatureId.VPS_OS : return 'VPS_OS';
        case ProductFeatureId.DISK_TYPE : return 'DISK_TYPE';
        case ProductFeatureId.DISK_SIZE : return 'DISK_SIZE';
        case ProductFeatureId.DISK_RAID : return 'DISK_RAID';
        case ProductFeatureId.DISK_BACKUP : return 'DISK_BACKUP';
        case ProductFeatureId.DISK_2_TYPE : return 'DISK_2_TYPE';
        case ProductFeatureId.DISK_2_SIZE : return 'DISK_2_SIZE';
        case ProductFeatureId.DISK_2_RAID : return 'DISK_2_RAID';
        case ProductFeatureId.DISK_2_BACKUP : return 'DISK_2_BACKUP';
        case ProductFeatureId.MEMORY_SIZE : return 'MEMORY_SIZE';
        case ProductFeatureId.NETWORK_TYPE : return 'NETWORK_TYPE';
        case ProductFeatureId.NETWORK_IP4 : return 'NETWORK_IP4';
        case ProductFeatureId.NETWORK_IP6 : return 'NETWORK_IP6';
        case ProductFeatureId.NETWORK_NET6 : return 'NETWORK_NET6';
        case ProductFeatureId.NETWORK_TRAFFIC : return 'NETWORK_TRAFFIC';
        case ProductFeatureId.CPU_SHARE : return 'CPU_SHARE';
        case ProductFeatureId.CPU_AMOUNT : return 'CPU_AMOUNT';
        case ProductFeatureId.NETWORK_ZONE : return 'NETWORK_ZONE';
    }
    throw new TypeError(`Unsupported ProductFeatureId value: ${value}`);
}

export function parseProductFeatureId (value: any): ProductFeatureId | undefined {
    switch (value) {
        case 'WP' : return ProductFeatureId.WP;
        case 'VPS_TYPE' : return ProductFeatureId.VPS_TYPE;
        case 'VPS_OS' : return ProductFeatureId.VPS_OS;
        case 'DISK_TYPE' : return ProductFeatureId.DISK_TYPE;
        case 'DISK_SIZE' : return ProductFeatureId.DISK_SIZE;
        case 'DISK_RAID' : return ProductFeatureId.DISK_RAID;
        case 'DISK_BACKUP' : return ProductFeatureId.DISK_BACKUP;
        case 'DISK_2_TYPE' : return ProductFeatureId.DISK_2_TYPE;
        case 'DISK_2_SIZE' : return ProductFeatureId.DISK_2_SIZE;
        case 'DISK_2_RAID' : return ProductFeatureId.DISK_2_RAID;
        case 'DISK_2_BACKUP' : return ProductFeatureId.DISK_2_BACKUP;
        case 'MEMORY_SIZE' : return ProductFeatureId.MEMORY_SIZE;
        case 'NETWORK_TYPE' : return ProductFeatureId.NETWORK_TYPE;
        case 'NETWORK_IP4' : return ProductFeatureId.NETWORK_IP4;
        case 'NETWORK_IP6' : return ProductFeatureId.NETWORK_IP6;
        case 'NETWORK_NET6' : return ProductFeatureId.NETWORK_NET6;
        case 'NETWORK_TRAFFIC' : return ProductFeatureId.NETWORK_TRAFFIC;
        case 'CPU_SHARE' : return ProductFeatureId.CPU_SHARE;
        case 'CPU_AMOUNT' : return ProductFeatureId.CPU_AMOUNT;
        case 'NETWORK_ZONE' : return ProductFeatureId.NETWORK_ZONE;
        default    : return undefined;
    }
}
