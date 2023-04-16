// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explain, explainProperty } from "../../types/explain";
import { isNumberArray } from "../../types/NumberArray";
import { explainNumber, explainNumberOrUndefined, isNumber, isNumberOrUndefined } from "../../types/Number";
import { explainArrayOf, isArray, isArrayOf } from "../../types/Array";
import { map } from "../../functions/map";
import { filter } from "../../functions/filter";
import { explainNumberPair, isNumberPair, NumberPair } from "../../types/NumberPair";
import { explainString, isString } from "../../types/String";
import { some } from "../../functions/some";
import { isMethod, Method } from "../../types/Method";
import { ErrorCode, isErrorCode } from "../../types/ErrorCode";

/**
 * HTTP Retry policy configuration
 */
export interface HttpRetryPolicy {

    /**
     * An array of exception codes which enable this retry policy.
     */
    readonly onCode : readonly string[];

    /**
     * An array of HTTP methods which enable this retry policy.
     */
    readonly onMethod : readonly string[];

    /**
     * An array of response HTTP status codes which enable this retry policy.
     */
    readonly onStatus : readonly NumberPair[];

    /**
     * The maximum retry attempts.
     *
     * Defaults to `10`.
     */
    readonly maxAttempts : number;

    /**
     * The base delay until another retry attempt is made, in milliseconds.
     *
     * Defaults to `1000`.
     */
    readonly baseDelay : number;

    /**
     * The increase in the retry delay for each attempt, in milliseconds.
     *
     * Defaults to `1000`.
     */
    readonly increasingDelayStep : number;

    /**
     * The maximum delay between retry attempts, in milliseconds.
     *
     * If not provided, there is no maximum delay.
     */
    readonly maxDelay ?: number | undefined;

}

export type RetryForStatusCode = number;
export type RetryForStatusRange = readonly [number, number];
export type RetryForMethod = string;
export type RetryForCode = ErrorCode;
export type RetryForAny = readonly ( RetryForStatusCode | RetryForMethod | RetryForCode | RetryForStatusRange )[] | RetryForStatusCode | RetryForMethod | RetryForCode;

function normalizeStatusRange (value : unknown) : NumberPair | undefined {
    if (isNumber(value)) return [value, value];
    if (!isNumberArray(value)) return undefined;
    if (value.length === 1) return [value[0], value[0]];
    if (value.length !== 0) return [value[0], value[1]];
    return undefined;
}

function filterRetryForStatusRange (value : RetryForAny) : readonly NumberPair[] {
    return filter(map(normalizeAsArray(value), normalizeStatusRange), isNumberPair);
}

function normalizeAsMethod (value: unknown) : Method | undefined {
    return isMethod(value) ? value : undefined;
}
function normalizeAsErrorCode (value: unknown) : ErrorCode | undefined {
    return isErrorCode(value) ? value : undefined;
}

function normalizeAsArray (value: any) : readonly any[] {
    return isArray(value) ? value : [value];
}

function filterRetryForMethod (value : RetryForAny) : readonly Method[] {
    return filter(map(normalizeAsArray(value), normalizeAsMethod), isMethod);
}

function filterRetryForCode (value : RetryForAny) : readonly ErrorCode[] {
    return filter(map(normalizeAsArray(value), normalizeAsErrorCode), isErrorCode);
}

/**
 *
 * @param retryFor This may be HTTP method, HTTP status code, Exception, or a status range like [number, number]
 *
 * @param maxAttempts
 * @param baseDelay
 * @param increasingDelayStep
 * @param maxDelay
 */
export function createHttpRetryPolicy (
    retryFor            ?: RetryForAny,
    maxAttempts         ?: number,
    baseDelay           ?: number,
    increasingDelayStep ?: number,
    maxDelay            ?: number | undefined
) : HttpRetryPolicy {
    retryFor = retryFor ?? [];
    const onStatus = filterRetryForStatusRange(retryFor);
    const onMethod = filterRetryForMethod(retryFor);
    const onCode   = filterRetryForCode(retryFor);
    return {
        onCode              : onCode,
        onMethod            : onMethod,
        onStatus            : onStatus,
        maxAttempts         : maxAttempts         ?? 10,
        baseDelay           : baseDelay           ?? 1000,
        increasingDelayStep : increasingDelayStep ?? 1000,
        maxDelay            : maxDelay            ?? undefined
    };
}

export function isHttpRetryPolicy (value: unknown) : value is HttpRetryPolicy {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'onCode',
            'onMethod',
            'onStatus',
            'maxAttempts',
            'baseDelay',
            'increasingDelayStep',
            'maxDelay'
        ])
        && isArrayOf<string>(value?.onCode, isString)
        && isArrayOf<string>(value?.onMethod, isString)
        && isArrayOf<NumberPair>(value?.onStatus, isNumberPair)
        && isNumber(value?.maxAttempts)
        && isNumber(value?.baseDelay)
        && isNumber(value?.increasingDelayStep)
        && isNumberOrUndefined(value?.maxDelay)
    );
}

export function explainHttpRetryPolicy (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'onCode',
                'onMethod',
                'onStatus',
                'maxAttempts',
                'baseDelay',
                'increasingDelayStep',
                'maxDelay'
            ])
            , explainProperty("onCode", explainArrayOf<string>("string", explainString, value?.onCode, isString))
            , explainProperty("onMethod", explainArrayOf<string>("string", explainString, value?.onMethod, isString))
            , explainProperty("onStatus", explainArrayOf<NumberPair>("NumberPair", explainNumberPair, value?.onStatus, isNumberPair))
            , explainProperty("maxAttempts", explainNumber(value?.maxAttempts))
            , explainProperty("baseDelay", explainNumber(value?.baseDelay))
            , explainProperty("increasingDelayStep", explainNumber(value?.increasingDelayStep))
            , explainProperty("maxDelay", explainNumberOrUndefined(value?.maxDelay))
        ]
    );
}

export function stringifyHttpRetryPolicy (value : HttpRetryPolicy) : string {
    return `HttpRetryPolicy(${value})`;
}

export function parseHttpRetryPolicy (value: unknown) : HttpRetryPolicy | undefined {
    if (isHttpRetryPolicy(value)) return value;
    return undefined;
}

export function getNextRetryDelay (delay: number, value : HttpRetryPolicy) : number {
    delay = delay + value?.increasingDelayStep;
    if ( value?.maxDelay !== undefined && delay > value.maxDelay ) {
        delay = value.maxDelay;
    }
    return delay;
}

export function shouldRetry (value : HttpRetryPolicy, attempt: number, method: string, status: number, code?: any | undefined) : boolean {
    if (attempt >= value.maxAttempts) return false;
    return (
        some(value.onMethod, (item: string) => item === method)
        && (some(value.onStatus, (item: NumberPair) : boolean => {
            const [minValue, maxValue] = item;
            return status >= minValue && status <= maxValue;
        })
        || ( code !== undefined && some(value.onCode, (item: string) => item === code) ))
    );
}

export function getDefaultRetryFor () : RetryForAny {
    return [
        Method.GET,
        ErrorCode.ETIMEDOUT,
        ErrorCode.ENOTFOUND,
        ErrorCode.ECONNRESET,
        ErrorCode.ECONNABORTED,
        ErrorCode.EHOSTUNREACH,
        ErrorCode.ESOCKETTIMEDOUT,
        ErrorCode.EAI_AGAIN,
        ErrorCode.EPIPE,
        ErrorCode.ECONNREFUSED,
        ErrorCode.EADDRINUSE,
        ErrorCode.ENETUNREACH,
        ErrorCode.ENETRESET,
        ErrorCode.EPROTO,
        ErrorCode.EHOSTDOWN,
        [500, 599],
        429 // Too many requests
    ];
}

export function createDefaultHttpRetryPolicy () : HttpRetryPolicy {
    return createHttpRetryPolicy(
        getDefaultRetryFor(),
        10,
        1000,
        2500
    );
}
