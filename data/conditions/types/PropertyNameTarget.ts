// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ConditionTarget } from "./ConditionTarget";

export class PropertyNameTarget implements ConditionTarget {

    private readonly _name : string;

    protected constructor (
        name : string
    ) {
        this._name = name;
    }

    public valueOf () {
        return this.toString();
    }

    public toString () {
        return `PropertyNameTarget(${this._name})`;
    }

    public getPropertyName () : string {
        return this._name;
    }

    public static create (
        name: string
    ) : PropertyNameTarget {
        return new PropertyNameTarget(name);
    }

}

export function isPropertyNameTarget (value: unknown): value is PropertyNameTarget {
    return value instanceof PropertyNameTarget;
}
