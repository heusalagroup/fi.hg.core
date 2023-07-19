// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { isUndefined } from "../../types/undefined";
import { explainNot, explainOk, explainOr } from "../../types/explain";

export enum OpPaymentStatus {

    PROCESSING = "PROCESSING",

    /**
     * PROCESSED if the creditor has received the money instantly.
     */
    PROCESSED = "PROCESSED",

}

export function isOpPaymentStatus (value: unknown) : value is OpPaymentStatus {
    return isEnum(OpPaymentStatus, value);
}

export function explainOpPaymentStatus (value : unknown) : string {
    return explainEnum("OpPaymentStatus", OpPaymentStatus, isOpPaymentStatus, value);
}

export function stringifyOpPaymentStatus (value : OpPaymentStatus) : string {
    return stringifyEnum(OpPaymentStatus, value);
}

export function parseOpPaymentStatus (value: any) : OpPaymentStatus | undefined {
    return parseEnum(OpPaymentStatus, value) as OpPaymentStatus | undefined;
}

export function isOpPaymentStatusOrUndefined (value: unknown): value is OpPaymentStatus | undefined {
    return isUndefined(value) || isOpPaymentStatus(value);
}

export function explainOpPaymentStatusOrUndefined (value: unknown): string {
    return isOpPaymentStatusOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpPaymentStatus', 'undefined']));
}
