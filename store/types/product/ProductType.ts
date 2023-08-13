// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";

export enum ProductType {
    PHOTO                = "PHOTO",
    PREMIUM_DOMAIN       = "PREMIUM_DOMAIN",
    VIRTUAL_SERVER       = "VIRTUAL_SERVER",
    VIRTUAL_SERVER_EXTRA = "VIRTUAL_SERVER_EXTRA",
    WEB_HOTEL_EXTRA      = "WEB_HOTEL_EXTRA",
    EMAIL_EXTRA          = "EMAIL_EXTRA",
    SHELL_EXTRA          = "SHELL_EXTRA",
    WEB_HOTEL            = "WEB_HOTEL",
    DOMAIN_TRANSFER      = "DOMAIN_TRANSFER",
    DOMAIN               = "DOMAIN",
    EMAIL                = "EMAIL",
    SHELL                = "SHELL",
    DATABASE             = "DATABASE",
    WP                   = "WP",
    NET                  = "NET",
    WEBRTC               = "WEBRTC",
    STOCK                = "STOCK"
}

export function isProductType (value: any): value is ProductType {
    switch (value) {
        case ProductType.PHOTO:
        case ProductType.PREMIUM_DOMAIN:
        case ProductType.VIRTUAL_SERVER:
        case ProductType.VIRTUAL_SERVER_EXTRA:
        case ProductType.WEB_HOTEL_EXTRA:
        case ProductType.EMAIL_EXTRA:
        case ProductType.SHELL_EXTRA:
        case ProductType.WEB_HOTEL:
        case ProductType.DOMAIN:
        case ProductType.DOMAIN_TRANSFER:
        case ProductType.EMAIL:
        case ProductType.SHELL:
        case ProductType.DATABASE:
        case ProductType.WP:
        case ProductType.NET:
        case ProductType.WEBRTC:
        case ProductType.STOCK:
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
        case ProductType.PHOTO : return 'PHOTO';
        case ProductType.PREMIUM_DOMAIN : return 'PREMIUM_DOMAIN';
        case ProductType.VIRTUAL_SERVER : return 'VIRTUAL_SERVER';
        case ProductType.VIRTUAL_SERVER_EXTRA : return 'VIRTUAL_SERVER_EXTRA';
        case ProductType.WEB_HOTEL_EXTRA : return 'WEB_HOTEL_EXTRA';
        case ProductType.EMAIL_EXTRA : return 'EMAIL_EXTRA';
        case ProductType.SHELL_EXTRA : return 'SHELL_EXTRA';
        case ProductType.WEB_HOTEL : return 'WEB_HOTEL';
        case ProductType.DOMAIN : return 'DOMAIN';
        case ProductType.DOMAIN_TRANSFER : return 'DOMAIN_TRANSFER';
        case ProductType.EMAIL : return 'EMAIL';
        case ProductType.SHELL : return 'SHELL';
        case ProductType.DATABASE : return 'DATABASE';
        case ProductType.WP : return 'WP';
        case ProductType.NET : return 'NET';
        case ProductType.WEBRTC : return 'WEBRTC';
        case ProductType.STOCK : return 'STOCK';
    }
    throw new TypeError(`Unsupported ProductType value: ${value}`);
}

export function parseProductType (value: any): ProductType | undefined {
    switch (value) {
        case 'PHOTO' : return ProductType.PHOTO;
        case 'PREMIUM_DOMAIN' : return ProductType.PREMIUM_DOMAIN;
        case 'VIRTUAL_SERVER' : return ProductType.VIRTUAL_SERVER;
        case 'VIRTUAL_SERVER_EXTRA' : return ProductType.VIRTUAL_SERVER_EXTRA;
        case 'WEB_HOTEL_EXTRA' : return ProductType.WEB_HOTEL_EXTRA;
        case 'EMAIL_EXTRA' : return ProductType.EMAIL_EXTRA;
        case 'SHELL_EXTRA' : return ProductType.SHELL_EXTRA;
        case 'WEB_HOTEL' : return ProductType.WEB_HOTEL;
        case 'DOMAIN' : return ProductType.DOMAIN;
        case 'DOMAIN_TRANSFER' : return ProductType.DOMAIN_TRANSFER;
        case 'EMAIL' : return ProductType.EMAIL;
        case 'SHELL' : return ProductType.SHELL;
        case 'DATABASE' : return ProductType.DATABASE;
        case 'WP' : return ProductType.WP;
        case 'NET' : return ProductType.NET;
        case 'WEBRTC' : return ProductType.WEBRTC;
        case 'STOCK' : return ProductType.STOCK;
        default    :
            return undefined;
    }
}

export function isProductTypeOrUndefined (value: unknown): value is ProductType | undefined {
    return isUndefined(value) || isProductType(value);
}

export function explainProductTypeOrUndefined (value: unknown): string {
    return isProductTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['ProductType', 'undefined']));
}
