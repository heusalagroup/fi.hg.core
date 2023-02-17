// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

/**
 * This is a helper function to make sure a static type check is performed.
 *
 * It may be required in some cases where TypeScript or the IDE fails to check
 * the type of the argument and/or results in complex type error.
 *
 * NOTE! IT DOES NOT PERFORM RUNTIME CHECKS.
 *
 * @template T
 * @param value The value to return
 * @returns {T} The value which was provided as the argument untouched
 * @__PURE__
 * @nosideeffects
 */
export function staticCheck<T> (value: T) : T {
    return value;
}

/**
 * This is a helper function to make sure a static type check is performed.
 *
 * It may be required in some cases where TypeScript or the IDE fails to check
 * the type of the argument and/or results in complex type error.
 *
 * NOTE! IT DOES NOT PERFORM RUNTIME CHECKS.
 *
 * You can use it like this:
 *
 * ```typescript
 * interface Foo {
 *     name ?: string;
 *     age ?: number;
 * }
 *
 * function createFoo (
 *     name ?: string,
 *     age ?: number
 * ) : Foo {
 *     return {
 *         ...( name !== undefined ? staticCheckPartial<Foo>({name}) : {})
 *         ...( age !== undefined ? staticCheckPartial<Foo>({age}) : {})
 *     }
 * }
 *
 * ```
 *
 * For example, this would end up as a static compile time error because there
 * is no bar property:
 *
 *  ```typescript
 *    ...( age !== undefined ? staticCheckPartial<Foo>({bar: age}) : {})
 *  ```
 *
 * @template T
 * @param value The value to return
 * @returns {Partial<T>} The value which was provided as the argument untouched
 * @__PURE__
 * @nosideeffects
 */
export function staticCheckPartial<T> (value: Partial<T>) : Partial<T> {
    return value;
}
