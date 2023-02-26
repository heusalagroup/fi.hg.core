// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../types/Enum";

export enum WpPageStatus {
    PUBLISH = "publish",
    FUTURE = "future",
    DRAFT = "draft",
    PENDING = "pending",
    PRIVATE = "private"
}

export function isWpPageStatus (value: unknown) : value is WpPageStatus {
    switch (value) {
        case WpPageStatus.PUBLISH:
        case WpPageStatus.FUTURE:
        case WpPageStatus.DRAFT:
        case WpPageStatus.PENDING:
        case WpPageStatus.PRIVATE:
            return true;
        default:
            return false;
    }
}

export function explainWpPageStatus (value : unknown) : string {
    return explainEnum("WpPageStatus", WpPageStatus, isWpPageStatus, value);
}

export function stringifyWpPageStatus (value : WpPageStatus) : string {
    switch (value) {
        case WpPageStatus.PUBLISH  : return 'PUBLISH';
        case WpPageStatus.FUTURE  : return 'FUTURE';
        case WpPageStatus.DRAFT  : return 'DRAFT';
        case WpPageStatus.PENDING  : return 'PENDING';
        case WpPageStatus.PRIVATE  : return 'PRIVATE';
    }
    throw new TypeError(`Unsupported WordpressPageStatus value: ${value}`)
}

export function parseWpPageStatus (value: unknown) : WpPageStatus | undefined {
    if (value === undefined) return undefined;
    switch(`${value}`.toUpperCase()) {
        case 'PUBLISH' : return WpPageStatus.PUBLISH;
        case 'FUTURE' : return WpPageStatus.FUTURE;
        case 'DRAFT' : return WpPageStatus.DRAFT;
        case 'PENDING' : return WpPageStatus.PENDING;
        case 'PRIVATE' : return WpPageStatus.PRIVATE;
        default     : return undefined;
    }
}
