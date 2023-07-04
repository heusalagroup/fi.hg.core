// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";

/**
 * @see https://docs.paytrail.com/#/?id=statuses
 */
export enum PaytrailStatus {
    NEW = "new",
    OK = "ok",
    FAIL = "fail",
    PENDING = "pending",
    DELAYED = "delayed",
}

export function isPaytrailStatus (value: unknown) : value is PaytrailStatus {
    return isEnum(PaytrailStatus, value);
}

export function explainPaytrailStatus (value : unknown) : string {
    return explainEnum("PaytrailStatus", PaytrailStatus, isPaytrailStatus, value);
}

export function stringifyPaytrailStatus (value : PaytrailStatus) : string {
    return stringifyEnum(PaytrailStatus, value);
}

export function parsePaytrailStatus (value: any) : PaytrailStatus | undefined {
    return parseEnum(PaytrailStatus, value) as PaytrailStatus | undefined;
}

export function isPaytrailStatusOrUndefined (value: unknown): value is PaytrailStatus | undefined {
    return isUndefined(PaytrailStatus) || isPaytrailStatus(value);
}

export function explainPaytrailStatusOrUndefined (value: unknown): string {
    return isPaytrailStatusOrUndefined(value) ? explainOk() : explainNot(explainOr(['PaytrailStatus', 'undefined']));
}
