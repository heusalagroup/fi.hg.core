// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export enum StoreCategoryType {

    HOSTING         = "HOSTING",
    DOMAINS         = "DOMAINS",
    USED_COMPUTERS  = "USED_COMPUTERS",
    NETWORK         = "NETWORK",
    OTHER           = "OTHER",

    /**
     * Use DOMAINS
     * @deprecated
     */
    SHORT_DOMAINS   = "SHORT_DOMAINS",

    /**
     * Use HOSTING
     * @deprecated
     */
    EMAIL              = "EMAIL",

    /**
     * Use HOSTING
     * @deprecated
     */
    SHELL              = "SHELL",

    /**
     * Use HOSTING
     * @deprecated
     */
    VPS                = "VPS",

    /**
     * Use HOSTING
     * @deprecated
     */
    VIRTUALSERVERS                = "VIRTUALSERVERS",

    /**
     * Use HOSTING
     * @deprecated
     */
    WEBHOTEL           = "WEBHOTEL"

}

export function isStoreCategoryType (value : any) : value is StoreCategoryType {
    switch (value) {
        case StoreCategoryType.VIRTUALSERVERS:
        case StoreCategoryType.EMAIL:
        case StoreCategoryType.SHELL:
        case StoreCategoryType.WEBHOTEL:
        case StoreCategoryType.VPS:
        case StoreCategoryType.SHORT_DOMAINS:
        case StoreCategoryType.HOSTING:
        case StoreCategoryType.DOMAINS:
        case StoreCategoryType.USED_COMPUTERS:
        case StoreCategoryType.NETWORK:
        case StoreCategoryType.OTHER:
            return true;

        default:
            return false;
    }
}

export function parseStoreCategoryType (value : any) : StoreCategoryType {
    switch (`${value}`.toUpperCase()) {
        case "EMAIL"           : return StoreCategoryType.HOSTING;
        case "SHELL"           : return StoreCategoryType.HOSTING;
        case "WEBHOTEL"        : return StoreCategoryType.HOSTING;
        case "WEB_HOTEL"       : return StoreCategoryType.HOSTING;
        case "WEBSERVER"       : return StoreCategoryType.HOSTING;
        case "WEB_SERVER"      : return StoreCategoryType.HOSTING;
        case "VPS"             : return StoreCategoryType.HOSTING;
        case "VIRTUALSERVERS"  : return StoreCategoryType.HOSTING;
        case "VIRTUAL_SERVERS" : return StoreCategoryType.HOSTING;
        case "HOSTING"         : return StoreCategoryType.HOSTING;
        case "SHORTDOMAINS"    : return StoreCategoryType.DOMAINS;
        case "SHORT_DOMAINS"   : return StoreCategoryType.DOMAINS;
        case "DOMAINS"         : return StoreCategoryType.DOMAINS;
        case "COMPUTERS"       : return StoreCategoryType.USED_COMPUTERS;
        case "USED_COMPUTERS"  : return StoreCategoryType.USED_COMPUTERS;
        case "USEDCOMPUTERS"   : return StoreCategoryType.USED_COMPUTERS;
        case "NETWORK"         : return StoreCategoryType.NETWORK;
        case "OTHER"           : return StoreCategoryType.OTHER;
        default                : return StoreCategoryType.OTHER;
    }
}

