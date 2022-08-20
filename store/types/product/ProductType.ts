// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../modules/lodash";

export enum ProductType {
    VIRTUAL_SERVER   = "VIRTUAL_SERVER",
    WEB_HOTEL        = "WEB_HOTEL",
    DOMAIN           = "DOMAIN",
    EMAIL            = "EMAIL",
    SHELL            = "SHELL",
    DATABASE         = "DATABASE",
}

export function isProductType (value: any): value is ProductType {
    switch (value) {
        case ProductType.VIRTUAL_SERVER: return true;
        case ProductType.WEB_HOTEL: return true;
        case ProductType.EMAIL: return true;
        case ProductType.SHELL: return true;
        default: return false;
    }
}

export function explainProductType (value : any) : string {
    return explainEnum("ProductType", ProductType, isProductType, value);
}

export function stringifyProductType (value: ProductType): string {
    switch (value) {
        case ProductType.VIRTUAL_SERVER : return 'VIRTUAL_SERVER';
        case ProductType.WEB_HOTEL : return 'WEB_HOTEL';
        case ProductType.DOMAIN : return 'DOMAIN';
        case ProductType.EMAIL : return 'EMAIL';
        case ProductType.SHELL : return 'SHELL';
        case ProductType.DATABASE : return 'DATABASE';
    }
    throw new TypeError(`Unsupported ProductType value: ${value}`);
}

export function parseProductType (value: any): ProductType | undefined {
    switch (value) {
        case 'VIRTUAL_SERVER' : return ProductType.VIRTUAL_SERVER;
        case 'WEB_HOTEL' : return ProductType.WEB_HOTEL;
        case 'DOMAIN' : return ProductType.DOMAIN;
        case 'EMAIL' : return ProductType.EMAIL;
        case 'SHELL' : return ProductType.SHELL;
        case 'DATABASE' : return ProductType.DATABASE;
        default    :
            return undefined;
    }
}
