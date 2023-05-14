// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Condition } from "./types/Condition";
import { WhereConditionTarget } from "./types/WhereConditionTarget";
import { Where } from "../Where";

export class AndCondition extends Condition {

    private readonly _where : Where;

    protected constructor (
        where: Where
    ) {
        super( WhereConditionTarget.create(where) );
        this._where = where;
    }

    public valueOf () {
        return this.toString();
    }

    public toString () {
        return `AndCondition(${this._where.getConditions().map(item => item.toString()).join(' and ')})`;
    }

    public getWhere () : Where {
        return this._where;
    }

    public static create (
        value: Where
    ) : AndCondition {
        return new AndCondition(value);
    }

}

export function isAndCondition (value: unknown): value is AndCondition {
    return value instanceof AndCondition;
}
