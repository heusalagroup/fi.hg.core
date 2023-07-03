import { iCheckoutParam } from "./iCheckoutParam";

export class CheckoutParam implements iCheckoutParam {

    private _name: string;
    private _value: string;

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
