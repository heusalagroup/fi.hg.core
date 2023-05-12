// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ConditionTarget } from "./ConditionTarget";
import { Where } from "../../Where";

export class WhereConditionTarget implements ConditionTarget {

    private readonly _where : Where;

    protected constructor (
        where : Where
    ) {
        this._where = where;
    }

    public valueOf () {
        return this.toString();
    }

    public toString () {
        return `WhereConditionTarget(${this._where})`;
    }

    public getWhere () : Where {
        return this._where;
    }

    public static create (
        where: Where
    ) : WhereConditionTarget {
        return new WhereConditionTarget(where);
    }

}

export function isWhereConditionTarget (value: unknown): value is WhereConditionTarget {
    return value instanceof WhereConditionTarget;
}
