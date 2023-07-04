// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { iCheckoutParam } from "./iCheckoutParam";

export class CheckoutParam implements iCheckoutParam {

    private readonly _name: string;
    private readonly _value: string;

    public constructor(key: string, value: string) {
        this._name = key;
        this._value = value;
    }

    public getName(): string {
        return this._name;
    }

    public getValue(): string {
        return this._value;
    }

}
