// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../modules/lodash";

export enum ProductType {
    VIRTUAL_SERVER       = "VIRTUAL_SERVER",
    VIRTUAL_SERVER_EXTRA = "VIRTUAL_SERVER_EXTRA",
    WEB_HOTEL            = "WEB_HOTEL",
    DOMAIN_TRANSFER      = "DOMAIN_TRANSFER",
    DOMAIN               = "DOMAIN",
    EMAIL                = "EMAIL",
    SHELL                = "SHELL",
    DATABASE             = "DATABASE",
    WP                   = "WP",
}

export function isProductType (value: any): value is ProductType {
    switch (value) {
        case ProductType.VIRTUAL_SERVER:
        case ProductType.VIRTUAL_SERVER_EXTRA:
        case ProductType.WEB_HOTEL:
        case ProductType.DOMAIN:
        case ProductType.DOMAIN_TRANSFER:
        case ProductType.EMAIL:
        case ProductType.SHELL:
        case ProductType.DATABASE:
        case ProductType.WP:
            return true;
        default:
            return false;
    }
}

export function explainProductType (value : any) : string {
    return explainEnum("ProductType", ProductType, isProductType, value);
}

export function stringifyProductType (value: ProductType): string {
    switch (value) {
        case ProductType.VIRTUAL_SERVER : return 'VIRTUAL_SERVER';
        case ProductType.VIRTUAL_SERVER_EXTRA : return 'VIRTUAL_SERVER_EXTRA';
        case ProductType.WEB_HOTEL : return 'WEB_HOTEL';
        case ProductType.DOMAIN : return 'DOMAIN';
        case ProductType.DOMAIN_TRANSFER : return 'DOMAIN_TRANSFER';
        case ProductType.EMAIL : return 'EMAIL';
        case ProductType.SHELL : return 'SHELL';
        case ProductType.DATABASE : return 'DATABASE';
        case ProductType.WP : return 'WP';
    }
    throw new TypeError(`Unsupported ProductType value: ${value}`);
}

export function parseProductType (value: any): ProductType | undefined {
    switch (value) {
        case 'VIRTUAL_SERVER' : return ProductType.VIRTUAL_SERVER;
        case 'VIRTUAL_SERVER_EXTRA' : return ProductType.VIRTUAL_SERVER_EXTRA;
        case 'WEB_HOTEL' : return ProductType.WEB_HOTEL;
        case 'DOMAIN' : return ProductType.DOMAIN;
        case 'DOMAIN_TRANSFER' : return ProductType.DOMAIN_TRANSFER;
        case 'EMAIL' : return ProductType.EMAIL;
        case 'SHELL' : return ProductType.SHELL;
        case 'DATABASE' : return ProductType.DATABASE;
        case 'WP' : return ProductType.WP;
        default    :
            return undefined;
    }
}
