// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SortDirection } from "./SortDirection";
import { get } from "../../functions/get";

/**
 * @see https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Sort.Order.html
 */
export class SortOrder {

    private readonly _direction : SortDirection;
    private readonly _property : string;

    public constructor (
        direction : SortDirection,
        property  : string
    ) {
        this._direction = direction;
        this._property = property;
    }

    public getProperty () : string {
        return this._property;
    }

    public getDirection () : SortDirection {
        return this._direction;
    }

    public static createSortFunction<T extends any> (
        sortOrder: readonly SortOrder[]
    ): (a: T, b: T) => number {
        return (a: T, b: T) => {
            for (const order of sortOrder) {

                const property = order.getProperty();
                const direction = order.getDirection();

                const aValue = a && get(a, property);
                const bValue = b && get(b, property);

                if (aValue === bValue) continue;

                if (aValue === undefined) return direction === SortDirection.ASC ? -1 : 1;
                if (bValue === undefined) return direction === SortDirection.ASC ? 1 : -1;

                if (aValue < bValue) return direction === SortDirection.ASC ? -1 : 1;
                else return direction === SortDirection.ASC ? 1 : -1;

            }
            return 0;
        };
    }

}

export function isSortOrder (value : unknown) : value is SortOrder {
    return !!value && value instanceof SortOrder;
}
