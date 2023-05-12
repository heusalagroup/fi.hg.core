// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Condition } from "./conditions/types/Condition";
import { BetweenCondition } from "./conditions/BetweenCondition";
import { PropertyNameTarget } from "./conditions/types/PropertyNameTarget";
import { EqualCondition } from "./conditions/EqualCondition";
import { map } from "../functions/map";
import { OrCondition } from "./conditions/OrCondition";
import { AndCondition } from "./conditions/AndCondition";
import { BeforeCondition } from "./conditions/BeforeCondition";
import { AfterCondition } from "./conditions/AfterCondition";

export class Where {

    private readonly _list : readonly Condition[];

    protected constructor (
        list : readonly Condition[]
    ) {
        this._list = list;
    }

    public valueOf () : string {
        return this.toString();
    }

    public toString () : string {
        return `Where(${map(this._list, item => item.toString()).join(', ')})`;
    }

    public getConditions () : readonly Condition[] {
        return this._list;
    }

    public and (
        item: Where
    ): Where {
        return new Where(
            [
                ...this.getConditions(),
                ...item.getConditions()
            ]
        );
    }

    public or (
        item: Where
    ): Where {
        const myConditions = this.getConditions();
        if (myConditions?.length <= 0) throw new TypeError('At least one conditions must exist on left side where');
        const itemConditions = item.getConditions();
        if (itemConditions?.length <= 0) throw new TypeError('At least one conditions must exist on right side where');
        return new Where(
            [
                OrCondition.create(
                    new Where(
                        [
                            myConditions.length === 1 ? myConditions[0] : AndCondition.create(this),
                            itemConditions?.length === 1 ? itemConditions[0] : AndCondition.create(item)
                        ]
                    )
                )
            ]
        );
    }

    public static propertyBetween<T> (
        property: string,
        start: T,
        end: T
    ) : Where {
        return new Where(
            [
                BetweenCondition.create(PropertyNameTarget.create(property), start, end)
             ]
        );
    }

    public static propertyAfter<T> (
        property: string,
        value: T
    ) : Where {
        return new Where(
            [
                AfterCondition.create(PropertyNameTarget.create(property), value)
             ]
        );
    }

    public static propertyBefore<T> (
        property: string,
        value: T
    ) : Where {
        return new Where(
            [
                BeforeCondition.create(PropertyNameTarget.create(property), value)
             ]
        );
    }

    public static propertyEquals<T> (
        property: string,
        value: T
    ) : Where {
        return new Where(
            [
                EqualCondition.create(PropertyNameTarget.create(property), value)
             ]
        );
    }

    /**
     * Matches if one of the values matches.
     *
     * @param propertyName
     * @param values
     */
    public static propertyListEquals<T> (
        propertyName : string,
        values       : readonly T[]
    ) : Where {
        if (!values.length) throw new TypeError(`Value list must contain some values for property "${propertyName}"`);
        const propertyNameTarget = PropertyNameTarget.create(propertyName);
        return new Where(
            [
                OrCondition.create(
                    new Where(
                        map(
                            values,
                            (value: T) : Condition => EqualCondition.create(propertyNameTarget, value)
                        )
                    )
                )
            ]
        );
    }

    public static and (
        a: Where,
        b: Where,
    ) : Where {
        return a.and(b);
    }

    public static or (
        a: Where,
        b: Where,
    ) : Where {
        return a.or(b);
    }

    public static fromConditionList (
        list : readonly Condition[]
    ) : Where {
        return new Where(list);
    }

}

export function isWhere (value: unknown): value is Where {
    return value instanceof Where;
}
