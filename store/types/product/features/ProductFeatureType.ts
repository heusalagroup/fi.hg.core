// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export enum ProductFeatureType {
    OTHER            = "OTHER",
    SHELL            = "SHELL",
    SHELL_SERVER     = "SHELL_SERVER",
    EMAIL            = "EMAIL",
    EMAIL_SERVER     = "EMAIL_SERVER",
    WEB_SERVER       = "WEB_SERVER",
    PHYSICAL_PRODUCT = "PHYSICAL_PRODUCT",
    VIRTUAL_SERVER   = "VIRTUAL_SERVER",
    SERVER           = "SERVER",
    CABLE            = "CABLE",
    DOMAIN           = "DOMAIN"
}

export function isProductFeatureType (value: any): value is ProductFeatureType {
    switch (value) {
        case ProductFeatureType.OTHER:
        case ProductFeatureType.SHELL:
        case ProductFeatureType.SHELL_SERVER:
        case ProductFeatureType.EMAIL:
        case ProductFeatureType.EMAIL_SERVER:
        case ProductFeatureType.WEB_SERVER:
        case ProductFeatureType.PHYSICAL_PRODUCT:
        case ProductFeatureType.VIRTUAL_SERVER:
        case ProductFeatureType.SERVER:
        case ProductFeatureType.CABLE:
        case ProductFeatureType.DOMAIN:
            return true;

        default:
            return false;

    }
}

export function stringifyProductFeatureType (value: ProductFeatureType): string {
    switch (value) {
        case ProductFeatureType.OTHER             : return 'OTHER';
        case ProductFeatureType.SHELL             : return 'SHELL';
        case ProductFeatureType.EMAIL             : return 'EMAIL';
        case ProductFeatureType.SHELL_SERVER      : return 'SHELL_SERVER';
        case ProductFeatureType.EMAIL_SERVER      : return 'EMAIL_SERVER';
        case ProductFeatureType.WEB_SERVER        : return 'WEB_SERVER';
        case ProductFeatureType.PHYSICAL_PRODUCT  : return 'PHYSICAL_PRODUCT';
        case ProductFeatureType.VIRTUAL_SERVER    : return 'VIRTUAL_SERVER';
        case ProductFeatureType.SERVER            : return 'SERVER';
        case ProductFeatureType.CABLE             : return 'CABLE';
        case ProductFeatureType.DOMAIN            : return 'DOMAIN';
    }
    throw new TypeError(`Unsupported ProductFeatureType value: ${value}`);
}

export function parseProductFeatureType (value: any): ProductFeatureType | undefined {

    switch (`${value}`.toUpperCase()) {

        case 'OTHER'             : return ProductFeatureType.OTHER;
        case 'SHELL'             : return ProductFeatureType.SHELL;
        case 'EMAIL'             : return ProductFeatureType.EMAIL;

        case 'WEBSERVER'         :
        case 'WEB_SERVER'        :
            return ProductFeatureType.WEB_SERVER;

        case 'PHYSICAL'         :
        case 'PHYSICALPRODUCT'  :
        case 'PHYSICAL_PRODUCT' :
            return ProductFeatureType.PHYSICAL_PRODUCT;

        case 'VPS'            :
        case 'VIRTUALSERVER'  :
        case 'VIRTUAL_SERVER' :
            return ProductFeatureType.VIRTUAL_SERVER;

        case 'SERVER'            : return ProductFeatureType.SERVER;
        case 'CABLE'             : return ProductFeatureType.CABLE;
        case 'DOMAIN'            : return ProductFeatureType.DOMAIN;

        default    :
            return undefined;

    }

}

