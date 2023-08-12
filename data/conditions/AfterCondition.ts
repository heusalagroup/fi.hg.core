// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Condition } from "./types/Condition";
import { ConditionTarget } from "./types/ConditionTarget";

export class AfterCondition<T = any> extends Condition {

    private readonly _value : T;

    protected constructor (
        target: ConditionTarget,
        value: T
    ) {
        super(target);
        this._value = value;
    }

    public valueOf () {
        return this.toString();
    }

    public toString () {
        return `AfterCondition(${this.getConditionTarget()} is after ${this._value})`;
    }

    public getValue () : T {
        return this._value;
    }

    public static create<T = any> (
        target: ConditionTarget,
        value: T
    ) : AfterCondition<T> {
        return new AfterCondition<T>(target, value);
    }

}

export function isAfterCondition (value: unknown): value is AfterCondition<any> {
    return value instanceof AfterCondition;
}
