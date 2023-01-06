// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum NetworkZone {
    FI_TAMPERE_1 = "FI_TAMPERE_1",
    FI_TURKU_1 = "FI_TURKU_1",
    FI_OULU_1 = "FI_OULU_1",
}

export function isNetworkZone (value: any): value is NetworkZone {
    switch (value) {
        case NetworkZone.FI_TAMPERE_1:
        case NetworkZone.FI_TURKU_1:
        case NetworkZone.FI_OULU_1:
            return true;
        default:
            return false;
    }
}

export function explainNetworkZone (value: any): string {
    return explainEnum("NetworkZone", NetworkZone, isNetworkZone, value);
}

export function stringifyNetworkZone (value: NetworkZone): string {
    switch (value) {
        case NetworkZone.FI_TAMPERE_1  : return 'FI_TAMPERE_1';
        case NetworkZone.FI_TURKU_1  : return 'FI_TURKU_1';
        case NetworkZone.FI_OULU_1  : return 'FI_OULU_1';
    }
    throw new TypeError(`Unsupported NetworkZone value: ${value}`);
}

export function parseNetworkZone (value: any): NetworkZone | undefined {
    if ( value === undefined ) return undefined;
    switch (`${value}`.toUpperCase()) {
        case 'FI_TAMPERE_1' : return NetworkZone.FI_TAMPERE_1;
        case 'FI_TURKU_1' : return NetworkZone.FI_TURKU_1;
        case 'FI_OULU_1' : return NetworkZone.FI_OULU_1;
        default     : return undefined;
    }
}
