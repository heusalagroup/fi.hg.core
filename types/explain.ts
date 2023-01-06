// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { filter } from "../functions/filter";
import { isString } from "./String";
import { every } from "../functions/every";

/**
 * Returned from explain functions when the value is OK.
 */
export const EXPLAIN_OK = 'OK';

export function explainNot (value: string): string {
    return `not ${value}`;
}

export function explainOr (value: string[]): string {
    return value.join(' or ');
}

export function explainOk (): string {
    return EXPLAIN_OK;
}

export function isExplainOk (value: unknown): boolean {
    return value === EXPLAIN_OK;
}

export function explain (
    values: readonly string[] | string
): string {
    if ( isString(values) ) return values;
    if ( every(values, (item: string): boolean => isExplainOk(item)) ) {
        return explainOk();
    }
    return filter(values, (item: string): boolean => !isExplainOk(item) && !!item).join(', ');
}

export function explainProperty (
    name: string,
    values: readonly string[] | string
): string {
    const e = explain(values);
    return isExplainOk(e) ? explainOk() : `property "${name}" ${e}`;
}
