// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { default as _isArray } from "lodash/isArray";
import { explain, explainNot, explainOk } from "./explain";
import { ExplainCallback } from "./ExplainCallback";
import { TestCallback } from "./TestCallback";
import { map } from "../functions/map";
import { every } from "../functions/every";

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isArray (value: unknown): value is any[] | readonly any[] {
    return _isArray(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isArrayOrUndefined (value: unknown): value is (any[] | readonly any[] | undefined) {

    if ( value === undefined ) return true;

    return isArray(value);

}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainArrayOrUndefined (value: unknown): string {
    return isArrayOrUndefined(value) ? explainOk() : 'not array or undefined';
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainArray (value: unknown): string {
    return isArray(value) ? explainOk() : 'not array';
}

/**
 *
 * @param value
 * @param isItem
 * @param minLength
 * @param maxLength
 * @__PURE__
 * @nosideeffects
 */
export function isArrayOf<T = any> (
    value: any,
    isItem: TestCallback | undefined = undefined,
    minLength: number | undefined = undefined,
    maxLength: number | undefined = undefined
): value is T[] | readonly T[] {

    if ( !_isArray(value) ) return false;

    const len = value?.length ?? 0;

    if ( minLength !== undefined && len < minLength ) {
        return false;
    }

    if ( maxLength !== undefined && len > maxLength ) {
        return false;
    }

    if ( isItem !== undefined ) {
        return every(value, isItem);
    }

    return true;

}

/**
 *
 * @param value
 * @param isItem
 * @param minLength
 * @param maxLength
 * @param itemTypeName
 * @param itemExplain
 * @__PURE__
 * @nosideeffects
 */
export function explainArrayOf<T = any> (
    itemTypeName: string,
    itemExplain: ExplainCallback,
    value: any,
    isItem: TestCallback | undefined = undefined,
    minLength: number | undefined = undefined,
    maxLength: number | undefined = undefined
): string {
    if ( isArrayOf<T>(value, isItem, minLength, maxLength) ) return explainOk();
    if ( !isArray(value) ) return explainNot(itemTypeName);
    if ( value?.length < 1 ) return explainNot(itemTypeName);
    return `${explainNot(itemTypeName)}: ${
        explain(
            map(
                value,
                (item: any): string => itemExplain(item)
            )
        )
    }`;
}

/**
 *
 * @param value
 * @param isItem
 * @param minLength
 * @param maxLength
 * @__PURE__
 * @nosideeffects
 */
export function isReadonlyArrayOf<T = any> (
    value: any,
    isItem: TestCallback | undefined = undefined,
    minLength: number | undefined = undefined,
    maxLength: number | undefined = undefined
): value is readonly T[] {
    return isArrayOf(value, isItem, minLength, maxLength);
}

/**
 *
 * @param value
 * @param isItem
 * @param minLength
 * @param maxLength
 * @__PURE__
 * @nosideeffects
 */
export function isArrayOfOrUndefined<T = any> (
    value: any,
    isItem: TestCallback | undefined = undefined,
    minLength: number | undefined = undefined,
    maxLength: number | undefined = undefined
): value is T[] | readonly T[] | undefined {
    if ( value === undefined ) return true;
    return isArrayOf(value, isItem, minLength, maxLength);
}

/**
 *
 * @param value
 * @param isItem
 * @param minLength
 * @param maxLength
 * @param itemTypeName
 * @param itemExplain
 * @__PURE__
 * @nosideeffects
 */
export function explainArrayOfOrUndefined<T = any> (
    itemTypeName: string,
    itemExplain: ExplainCallback,
    value: any,
    isItem: TestCallback | undefined = undefined,
    minLength: number | undefined = undefined,
    maxLength: number | undefined = undefined
): string {
    if ( isArrayOfOrUndefined<T>(value, isItem, minLength, maxLength) ) return explainOk();
    if ( !isArray(value) ) return explainNot(itemTypeName);
    if ( value?.length < 1 ) return explainNot(itemTypeName);
    return `${explainNot(itemTypeName)}: ${
        explain(
            map(
                value,
                (item: any): string => {
                    return itemExplain(item);
                }
            )
        )
    }`;
}

/**
 *
 * @param value
 * @param isItem
 * @param minLength
 * @param maxLength
 * @__PURE__
 * @nosideeffects
 */
export function isReadonlyArrayOfOrUndefined<T = any> (
    value: any,
    isItem: TestCallback | undefined = undefined,
    minLength: number | undefined = undefined,
    maxLength: number | undefined = undefined
): value is readonly T[] | undefined {
    if ( value === undefined ) return true;
    return isReadonlyArrayOf(value, isItem, minLength, maxLength);
}

/**
 *
 * @param value
 * @param isItem
 * @param minLength
 * @param maxLength
 * @param itemTypeName
 * @param itemExplain
 * @__PURE__
 * @nosideeffects
 */
export function explainReadonlyArrayOfOrUndefined<T = any> (
    itemTypeName: string,
    itemExplain: ExplainCallback,
    value: any,
    isItem: TestCallback | undefined = undefined,
    minLength: number | undefined = undefined,
    maxLength: number | undefined = undefined
): string {
    return explainArrayOfOrUndefined<T>(
        itemTypeName,
        itemExplain,
        value,
        isItem,
        minLength,
        maxLength
    );
}

/**
 *
 * @param value
 * @param isItem
 * @param minLength
 * @param maxLength
 * @__PURE__
 * @nosideeffects
 */
export function isArrayOrUndefinedOf<T = any> (
    value: any,
    isItem: TestCallback | undefined = undefined,
    minLength: number | undefined = undefined,
    maxLength: number | undefined = undefined
): value is (T[] | readonly T[] | undefined) {
    if ( value === undefined ) return true;
    return isArrayOf<T>(value, isItem, minLength, maxLength);
}

/**
 *
 * @param itemTypeName
 * @param itemExplain
 * @param value
 * @param isItem
 * @param minLength
 * @param maxLength
 * @__PURE__
 * @nosideeffects
 */
export function explainArrayOrUndefinedOf<T = any> (
    itemTypeName: string,
    itemExplain: ExplainCallback,
    value: any,
    isItem: TestCallback | undefined = undefined,
    minLength: number | undefined = undefined,
    maxLength: number | undefined = undefined
): string {
    if ( value === undefined ) return explainOk();
    return explainArrayOf<T>(itemTypeName, itemExplain, value, isItem, minLength, maxLength);
}
