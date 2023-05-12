// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Condition } from "./types/Condition";
import { ConditionTarget } from "./types/ConditionTarget";

export class EqualCondition<T = any> extends Condition {

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
        return `EqualCondition(${this.getConditionTarget()} === ${this._value})`;
    }

    public getValue () : T {
        return this._value;
    }

    public static create<T = any> (
        target: ConditionTarget,
        value: T
    ) : EqualCondition<T> {
        return new EqualCondition<T>(target, value);
    }

}

export function isEqualCondition (value: unknown): value is EqualCondition<any> {
    return value instanceof EqualCondition;
}
