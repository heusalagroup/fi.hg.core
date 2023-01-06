// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum DiskUsageType {
    ANY  = "ANY",
    OS   = "OS",
    SWAP = "SWAP",
    DATA = "DATA"
}

export function isDiskUsageType (value: any) : value is DiskUsageType {
    switch (value) {
        case DiskUsageType.ANY:
        case DiskUsageType.OS:
        case DiskUsageType.SWAP:
        case DiskUsageType.DATA:
            return true;
        default:
            return false;
    }
}

export function explainDiskUsageType (value : any) : string {
    return explainEnum("DiskUsageType", DiskUsageType, isDiskUsageType, value);
}

export function stringifyDiskUsageType (value : DiskUsageType) : string {
    switch (value) {
        case DiskUsageType.ANY   : return 'ANY';
        case DiskUsageType.OS    : return 'OS';
        case DiskUsageType.SWAP  : return 'SWAP';
        case DiskUsageType.DATA  : return 'DATA';
    }
    throw new TypeError(`Unsupported DiskUsageType value: ${value}`)
}

export function parseDiskUsageType (value: any) : DiskUsageType | undefined {
    if (value === undefined) return undefined;
    switch(`${value}`.toUpperCase()) {
        case 'ANY'  : return DiskUsageType.ANY;
        case 'OS'   : return DiskUsageType.OS;
        case 'SWAP' : return DiskUsageType.SWAP;
        case 'DATA' : return DiskUsageType.DATA;
        default     : return undefined;
    }
}
