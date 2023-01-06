// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum NetworkIpType {

    /**
     * Public address included in the price
     */
    PUBLIC_INCLUDED = "PUBLIC_INCLUDED",

    /**
     * Public address available with extra fee.
     * Otherwise same as PRIVATE_NAT.
     */
    PUBLIC_AVAILABLE = "PUBLIC_AVAILABLE",

    /**
     * Private address included (behind PRIVATE_NAT)
     */
    PRIVATE_NAT = "PRIVATE_NAT"

}

export function isNetworkIpType (value: any): value is NetworkIpType {
    switch (value) {
        case NetworkIpType.PUBLIC_INCLUDED:
        case NetworkIpType.PUBLIC_AVAILABLE:
        case NetworkIpType.PRIVATE_NAT:
            return true;
        default:
            return false;
    }
}

export function explainNetworkIpType (value: any): string {
    return explainEnum("NetworkIpType", NetworkIpType, isNetworkIpType, value);
}

export function stringifyNetworkIpType (value: NetworkIpType): string {
    switch (value) {
        case NetworkIpType.PUBLIC_INCLUDED  : return 'PUBLIC_INCLUDED';
        case NetworkIpType.PUBLIC_AVAILABLE  : return 'PUBLIC_AVAILABLE';
        case NetworkIpType.PRIVATE_NAT  : return 'PRIVATE_NAT';
    }
    throw new TypeError(`Unsupported NetworkIpType value: ${value}`);
}

export function parseNetworkIpType (value: any): NetworkIpType | undefined {
    if ( value === undefined ) return undefined;
    switch (`${value}`.toUpperCase()) {
        case 'PUBLIC_INCLUDED' : return NetworkIpType.PUBLIC_INCLUDED;
        case 'PUBLIC_AVAILABLE' : return NetworkIpType.PUBLIC_AVAILABLE;
        case 'PRIVATE_NAT' : return NetworkIpType.PRIVATE_NAT;
        default     : return undefined;
    }
}
