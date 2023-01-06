// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum BackupType {
    UNAVAILABLE = "UNAVAILABLE",
    AVAILABLE = "AVAILABLE",
    INCLUDED_RESTORE_FREE = "INCLUDED_RESTORE_FREE",
    INCLUDED_WITH_RESTORE_FEE = "INCLUDED_WITH_RESTORE_FEE",
}

export function isBackupType (value: any) : value is BackupType {
    switch (value) {
        case BackupType.UNAVAILABLE:
        case BackupType.AVAILABLE:
        case BackupType.INCLUDED_RESTORE_FREE:
        case BackupType.INCLUDED_WITH_RESTORE_FEE:
            return true;
        default:
            return false;
    }
}

export function explainBackupType (value : any) : string {
    return explainEnum("BackupType", BackupType, isBackupType, value);
}

export function stringifyBackupType (value : BackupType) : string {
    switch (value) {
        case BackupType.UNAVAILABLE  : return 'UNAVAILABLE';
        case BackupType.AVAILABLE  : return 'AVAILABLE';
        case BackupType.INCLUDED_RESTORE_FREE  : return 'INCLUDED_RESTORE_FREE';
        case BackupType.INCLUDED_WITH_RESTORE_FEE  : return 'INCLUDED_WITH_RESTORE_FEE';
    }
    throw new TypeError(`Unsupported BackupType value: ${value}`)
}

export function parseBackupType (value: any) : BackupType | undefined {
    if (value === undefined) return undefined;
    switch(`${value}`.toUpperCase()) {
        case 'UNAVAILABLE' : return BackupType.UNAVAILABLE;
        case 'AVAILABLE' : return BackupType.AVAILABLE;
        case 'INCLUDED_RESTORE_FREE' : return BackupType.INCLUDED_RESTORE_FREE;
        case 'INCLUDED_WITH_RESTORE_FEE' : return BackupType.INCLUDED_WITH_RESTORE_FEE;
        default     : return undefined;
    }
}
