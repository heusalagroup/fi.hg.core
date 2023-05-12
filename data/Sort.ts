// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isSortDirection, SortDirection } from "./types/SortDirection";
import { isSortOrder, SortOrder } from "./types/SortOrder";
import { isArrayOf } from "../types/Array";
import { isStringArray } from "../types/StringArray";
import { map } from "../functions/map";

/**
 * @see https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Sort.html
 */
export class Sort {

    private readonly _orders : readonly SortOrder[] | undefined;
    private readonly _sort : (a: any, b: any) => number;

    public static DEFAULT_DIRECTION : SortDirection = SortDirection.ASC;

    protected constructor (
        orders : readonly SortOrder[],
    ) {
        this._orders = orders;
        this._sort = SortOrder.createSortFunction(this._orders);
    }

    public getSortOrders () : SortOrder[] {
        return map(this._orders, (o) => o);
    }

    public getSortFunction (): (a: any, b: any) => number {
        return this._sort;
    }

    public static Direction = SortDirection;

    // Signatures

    public static by (
        orders: readonly SortOrder[]
    ) : Sort;

    public static by (
        property1: string,
        ...properties: readonly string[]
    ) : Sort;

    public static by (
        direction: SortDirection,
        ...properties: readonly string[]
    ) : Sort;

    public static by (
        order1: SortOrder,
        ...orders: readonly SortOrder[]
    ) : Sort;

    /**
     *
     * @param arg1
     * @param arg2
     */
    public static by(
        arg1    : string | SortDirection | SortOrder | readonly SortOrder[],
        ...arg2 : readonly string[] | readonly SortOrder[]
    ): Sort {

        // Sort.by(SortOrder[])
        if ( arg2.length === 0 && isArrayOf<SortOrder>(arg1, isSortOrder) ) {
            return new Sort( map(arg1, (item : SortOrder) : SortOrder => item) );
        }

        // Sort.by(SortDirection, string[])
        if (isSortDirection(arg1)) {
            if (isStringArray(arg2)) {
                return new Sort( map(arg2, (item : string) : SortOrder => new SortOrder(arg1, item)) );
            }
            throw new TypeError(`Invalid function signature: ${arg1} ${arg2.join(' ')}`);
        }

        const args = [arg1, ...arg2];

        // Sort.by(...SortOrder[])
        if (isArrayOf<SortOrder>(args, isSortOrder)) {
            return new Sort( args );
        }

        // Sort.by(...string[])
        if (isStringArray(args)) {
            return new Sort( map(args, (item : string) : SortOrder => new SortOrder(Sort.DEFAULT_DIRECTION, item)) );
        }

        throw new TypeError(`Invalid function signature: ${arg1} ${arg2.join(' ')}`);

    }

    public static createSortFunction<T extends any> ( sort: Sort ): (a: T, b: T) => number {
        return SortOrder.createSortFunction(sort.getSortOrders());
    }

}

export function isSort (value: unknown): value is Sort {
    return value instanceof Sort;
}
