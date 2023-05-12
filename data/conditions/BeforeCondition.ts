// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Condition } from "./types/Condition";
import { ConditionTarget } from "./types/ConditionTarget";

export class BeforeCondition<T = any> extends Condition {

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
        return `BeforeCondition(${this.getConditionTarget()} is before ${this._value})`;
    }

    public getValue () : T {
        return this._value;
    }

    public static create<T = any> (
        target: ConditionTarget,
        value: T
    ) : BeforeCondition<T> {
        return new BeforeCondition<T>(target, value);
    }

}

export function isBeforeCondition (value: unknown): value is BeforeCondition<any> {
    return value instanceof BeforeCondition;
}
