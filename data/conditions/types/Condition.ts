// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ConditionTarget } from "./ConditionTarget";

export class Condition {

    private readonly _target : ConditionTarget;

    protected constructor (
        target: ConditionTarget
    ) {
        this._target = target;
    }

    public valueOf () : string {
        return this.toString();
    }

    public toString () : string {
        return `Condition(${this._target})`;
    }

    public getConditionTarget () : ConditionTarget {
        return this._target
    }

}

export function isCondition (value: unknown): value is Condition {
    return value instanceof Condition;
}
