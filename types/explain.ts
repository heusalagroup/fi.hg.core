// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

// We're using directly lodash here to overcome circular dependencies
import { default as _isString } from "lodash/isString";
import { default as _every } from "lodash/every";
import { default as _filter } from "lodash/filter";
import { prefixLines } from "./String";

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
    if ( _isString(values) ) return values;
    if ( _every(values, (item: string): boolean => isExplainOk(item)) ) {
        return explainOk();
    }
    return _filter(values, (item: string): boolean => !isExplainOk(item) && !!item).join(', ');
}

export function explainProperty (
    name: string,
    values: readonly string[] | string
): string {
    const e = explain(values);
    return isExplainOk(e) ? explainOk() : '\n' + prefixLines(`property "${name}" ${e}`, '  ');
}
