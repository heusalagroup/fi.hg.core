// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export enum ProductFeatureId {
    DISK_TYPE       = "DISK_TYPE",
    DISK_SIZE       = "DISK_SIZE",
    DISK_RAID       = "DISK_RAID",
    DISK_BACKUP     = "DISK_BACKUP",
    MEMORY_SIZE     = "MEMORY_SIZE",
    NETWORK_TYPE    = "NETWORK_TYPE",
    NETWORK_TRAFFIC = "NETWORK_TRAFFIC",
    CPU_SHARE       = "CPU_SHARE",
    CPU_AMOUNT      = "CPU_AMOUNT",
    NETWORK_ZONE    = "NETWORK_ZONE"
}

export function isProductFeatureId (value: any): value is ProductFeatureId {
    switch (value) {
        case ProductFeatureId.DISK_TYPE: return true;
        case ProductFeatureId.DISK_SIZE: return true;
        case ProductFeatureId.DISK_RAID: return true;
        case ProductFeatureId.DISK_BACKUP: return true;
        case ProductFeatureId.MEMORY_SIZE: return true;
        case ProductFeatureId.NETWORK_TYPE: return true;
        case ProductFeatureId.NETWORK_TRAFFIC: return true;
        case ProductFeatureId.CPU_SHARE: return true;
        case ProductFeatureId.CPU_AMOUNT: return true;
        case ProductFeatureId.NETWORK_ZONE: return true;
        default: return false;
    }
}

export function stringifyProductFeatureId (value: ProductFeatureId): string {
    switch (value) {
        case ProductFeatureId.DISK_TYPE : return 'DISK_TYPE';
        case ProductFeatureId.DISK_SIZE : return 'DISK_SIZE';
        case ProductFeatureId.DISK_RAID : return 'DISK_RAID';
        case ProductFeatureId.DISK_BACKUP : return 'DISK_BACKUP';
        case ProductFeatureId.MEMORY_SIZE : return 'MEMORY_SIZE';
        case ProductFeatureId.NETWORK_TYPE : return 'NETWORK_TYPE';
        case ProductFeatureId.NETWORK_TRAFFIC : return 'NETWORK_TRAFFIC';
        case ProductFeatureId.CPU_SHARE : return 'CPU_SHARE';
        case ProductFeatureId.CPU_AMOUNT : return 'CPU_AMOUNT';
        case ProductFeatureId.NETWORK_ZONE : return 'NETWORK_ZONE';
    }
    throw new TypeError(`Unsupported ProductFeatureId value: ${value}`);
}

export function parseProductFeatureId (value: any): ProductFeatureId | undefined {

    switch (value) {
        case 'DISK_TYPE' : return ProductFeatureId.DISK_TYPE;
        case 'DISK_SIZE' : return ProductFeatureId.DISK_SIZE;
        case 'DISK_RAID' : return ProductFeatureId.DISK_RAID;
        case 'DISK_BACKUP' : return ProductFeatureId.DISK_BACKUP;
        case 'MEMORY_SIZE' : return ProductFeatureId.MEMORY_SIZE;
        case 'NETWORK_TYPE' : return ProductFeatureId.NETWORK_TYPE;
        case 'NETWORK_TRAFFIC' : return ProductFeatureId.NETWORK_TRAFFIC;
        case 'CPU_SHARE' : return ProductFeatureId.CPU_SHARE;
        case 'CPU_AMOUNT' : return ProductFeatureId.CPU_AMOUNT;
        case 'NETWORK_ZONE' : return ProductFeatureId.NETWORK_ZONE;
        default    : return undefined;
    }

}
