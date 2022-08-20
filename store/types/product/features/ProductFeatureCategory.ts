// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export enum ProductFeatureCategory {
    DISK    = "DISK",
    MEMORY  = "MEMORY",
    CPU     = "CPU",
    NETWORK = "NETWORK",
}

export function isProductFeatureCategory (value: any): value is ProductFeatureCategory {
    switch (value) {
        case ProductFeatureCategory.DISK: return true;
        case ProductFeatureCategory.MEMORY: return true;
        case ProductFeatureCategory.CPU: return true;
        case ProductFeatureCategory.NETWORK: return true;
        default: return false;
    }
}

export function stringifyProductFeatureCategory (value: ProductFeatureCategory): string {
    switch (value) {
        case ProductFeatureCategory.DISK : return 'DISK';
        case ProductFeatureCategory.MEMORY : return 'MEMORY';
        case ProductFeatureCategory.CPU : return 'CPU';
        case ProductFeatureCategory.NETWORK : return 'NETWORK';
    }
    throw new TypeError(`Unsupported ProductFeatureCategory value: ${value}`);
}

export function parseProductFeatureCategory (value: any): ProductFeatureCategory | undefined {

    switch (value) {
        case 'DISK' : return ProductFeatureCategory.DISK;
        case 'MEMORY' : return ProductFeatureCategory.MEMORY;
        case 'CPU' : return ProductFeatureCategory.CPU;
        case 'NETWORK' : return ProductFeatureCategory.NETWORK;
        default    : return undefined;
    }

}
