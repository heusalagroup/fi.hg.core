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
 * @param isItemA
 * @param isItemB
 * @__PURE__
 * @nosideeffects
 */
export function isPairArrayOf<T1 = any, T2 = T1> (
    value: unknown,
    isItemA: TestCallback,
    isItemB: TestCallback = isItemA,
): value is [T1, T2] | readonly [T1, T2] {
    if ( !_isArray(value) ) return false;
    const len : number = value?.length ?? 0;
    if ( len !== 2 ) {
        return false;
    }
    const [a, b] = value;
    return isItemA(a, 0, value) && isItemB(b, 1, value);
}

/**
 *
 * @param value
 * @param isItemA
 * @param isItemB
 * @param itemTypeNameA
 * @param itemTypeNameB
 * @__PURE__
 * @nosideeffects
 */
export function explainPairArrayOf<T1 = any, T2 = T1> (
    value: unknown,
    itemTypeNameA: string,
    isItemA: TestCallback,
    itemTypeNameB: string = itemTypeNameA,
    isItemB: TestCallback = isItemA,
): string {
    return isPairArrayOf<T1, T2>( value, isItemA, isItemB ) ? explainOk() : explainNot( `[${itemTypeNameA}, ${itemTypeNameB}]` );
}

/**
 *
 * @param value
 * @param isItemA
 * @param isItemB
 * @param isItemC
 * @__PURE__
 * @nosideeffects
 */
export function isTripletArrayOf<T1, T2, T3> (
    value: unknown,
    isItemA: TestCallback,
    isItemB: TestCallback,
    isItemC: TestCallback,
): value is [T1, T2, T3] | readonly [T1, T2, T3] {
    if ( !_isArray(value) ) return false;
    const len : number = value?.length ?? 0;
    if ( len !== 3 ) {
        return false;
    }
    const [a, b, c] = value;
    return (
        isItemA(a, 0, value)
        && isItemB(b, 1, value)
        && isItemC(c, 2, value)
    );
}

/**
 *
 * @param value
 * @param isItemA
 * @param isItemB
 * @param isItemC
 * @param itemTypeNameA
 * @param itemTypeNameB
 * @param itemTypeNameC
 * @__PURE__
 * @nosideeffects
 */
export function explainTripletArrayOf<T1, T2, T3> (
    value: unknown,
    itemTypeNameA: string,
    isItemA: TestCallback,
    itemTypeNameB: string,
    isItemB: TestCallback,
    itemTypeNameC: string,
    isItemC: TestCallback,
): string {
    return isTripletArrayOf<T1, T2, T3>(
        value,
        isItemA,
        isItemB,
        isItemC,
    ) ? explainOk() : explainNot(
        `[${itemTypeNameA}, ${itemTypeNameB}, ${itemTypeNameC}]`
    );
}

/**
 *
 * @param value
 * @param isItemA
 * @param isItemB
 * @param isItemC
 * @param isItemD
 * @__PURE__
 * @nosideeffects
 */
export function isTetradArrayOf<T1, T2, T3, T4> (
    value: unknown,
    isItemA: TestCallback,
    isItemB: TestCallback,
    isItemC: TestCallback,
    isItemD: TestCallback,
): value is [T1, T2, T3, T4] | readonly [T1, T2, T3, T4] {
    if ( !_isArray(value) ) return false;
    const len : number = value?.length ?? 0;
    if ( len !== 4 ) {
        return false;
    }
    const [a, b, c, d] = value;
    return (
        isItemA(a, 0, value)
        && isItemB(b, 1, value)
        && isItemC(c, 2, value)
        && isItemD(d, 3, value)
    );
}

/**
 *
 * @param value
 * @param isItemA
 * @param isItemB
 * @param isItemC
 * @param isItemD
 * @param itemTypeNameA
 * @param itemTypeNameB
 * @param itemTypeNameC
 * @param itemTypeNameD
 * @__PURE__
 * @nosideeffects
 */
export function explainTetradArrayOf<T1, T2, T3, T4> (
    value: unknown,
    itemTypeNameA: string,
    isItemA: TestCallback,
    itemTypeNameB: string,
    isItemB: TestCallback,
    itemTypeNameC: string,
    isItemC: TestCallback,
    itemTypeNameD: string,
    isItemD: TestCallback,
): string {
    return isTetradArrayOf<T1, T2, T3, T4>(
        value,
        isItemA,
        isItemB,
        isItemC,
        isItemD,
    ) ? explainOk() : explainNot(
        `[${itemTypeNameA}, ${itemTypeNameB}, ${itemTypeNameC}, ${itemTypeNameD}]`
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
