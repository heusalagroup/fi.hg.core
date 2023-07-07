// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";

/**
 * @see https://docs.paytrail.com/#/?id=statuses
 */
export enum PaytrailStatus {

    /**
     * Payment has been created but nothing more. Never returned as a result,
     * but can be received from the GET /payments/{transactionId} endpoint
     */
    NEW = "new",

    /**
     * Payment was accepted by the provider and confirmed successfully
     */
    OK = "ok",

    /**
     * Payment was cancelled by the user or rejected by the provider
     */
    FAIL = "fail",

    /**
     * Payment was initially approved by the provider but further processing is
     * required, used in e.g. these cases:
     *
     * 1. anti-fraud check is ongoing
     * 2. invoice requires manual activation
     * 3. Refund has been initiated but waiting for approval (only used for
     *    merchants which require refund approvals)
     */
    PENDING = "pending",

    /**
     * A rare status related to a single payment method that is not generally
     * enabled. May take days to complete. If completed, will be reported as ok
     * via the callback or the redirect URL. This can be handled the same way as
     * pending.
     */
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
    return isUndefined(value) || isPaytrailStatus(value);
}

export function explainPaytrailStatusOrUndefined (value: unknown): string {
    return isPaytrailStatusOrUndefined(value) ? explainOk() : explainNot(explainOr(['PaytrailStatus', 'undefined']));
}
