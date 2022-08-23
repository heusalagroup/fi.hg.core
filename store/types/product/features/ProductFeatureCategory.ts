// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export enum ProductFeatureCategory {
    SUPPORT = "SUPPORT",
    DISK    = "DISK",
    DISK_2  = "DISK_2",
    MEMORY  = "MEMORY",
    CPU     = "CPU",
    NETWORK = "NETWORK",
    VPS     = "VPS"
}

export function isProductFeatureCategory (value: any): value is ProductFeatureCategory {
    switch (value) {
        case ProductFeatureCategory.DISK: return true;
        case ProductFeatureCategory.DISK_2: return true;
        case ProductFeatureCategory.MEMORY: return true;
        case ProductFeatureCategory.CPU: return true;
        case ProductFeatureCategory.NETWORK: return true;
        case ProductFeatureCategory.VPS: return true;
        case ProductFeatureCategory.SUPPORT: return true;
        default: return false;
    }
}

export function stringifyProductFeatureCategory (value: ProductFeatureCategory): string {
    switch (value) {
        case ProductFeatureCategory.DISK : return 'DISK';
        case ProductFeatureCategory.DISK_2 : return 'DISK_2';
        case ProductFeatureCategory.MEMORY : return 'MEMORY';
        case ProductFeatureCategory.CPU : return 'CPU';
        case ProductFeatureCategory.NETWORK : return 'NETWORK';
        case ProductFeatureCategory.VPS : return 'VPS';
        case ProductFeatureCategory.SUPPORT : return 'SUPPORT';
    }
    throw new TypeError(`Unsupported ProductFeatureCategory value: ${value}`);
}

export function parseProductFeatureCategory (value: any): ProductFeatureCategory | undefined {
    switch (value) {
        case 'DISK' : return ProductFeatureCategory.DISK;
        case 'DISK_2' : return ProductFeatureCategory.DISK_2;
        case 'MEMORY' : return ProductFeatureCategory.MEMORY;
        case 'CPU' : return ProductFeatureCategory.CPU;
        case 'NETWORK' : return ProductFeatureCategory.NETWORK;
        case 'VPS' : return ProductFeatureCategory.VPS;
        case 'SUPPORT' : return ProductFeatureCategory.SUPPORT;
        default    : return undefined;
    }
}
