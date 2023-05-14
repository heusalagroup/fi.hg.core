// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum MySqlCharset {
    UTF8_GENERAL_CI = "UTF8_GENERAL_CI",
    LATIN1_SWEDISH_CI = "LATIN1_SWEDISH_CI"
}

export function isMySqlCharset (value: any) : value is MySqlCharset {
    switch (value) {
        case MySqlCharset.UTF8_GENERAL_CI:
        case MySqlCharset.LATIN1_SWEDISH_CI:
            return true;
        default:
            return false;
    }
}

export function explainMySqlCharset (value : any) : string {
    return explainEnum("MySqlCharset", MySqlCharset, isMySqlCharset, value);
}

export function stringifyMySqlCharset (value : MySqlCharset) : string {
    switch (value) {
        case MySqlCharset.UTF8_GENERAL_CI  : return 'UTF8_GENERAL_CI';
        case MySqlCharset.LATIN1_SWEDISH_CI  : return 'LATIN1_SWEDISH_CI';
    }
    throw new TypeError(`Unsupported MySqlCharset value: ${value}`)
}

export function parseMySqlCharset (value: any) : MySqlCharset | undefined {
    if (value === undefined) return undefined;
    switch(`${value}`.toUpperCase()) {
        case 'UTF8_GENERAL_CI' : return MySqlCharset.UTF8_GENERAL_CI;
        case 'LATIN1_SWEDISH_CI' : return MySqlCharset.LATIN1_SWEDISH_CI;
        default     : return undefined;
    }
}
