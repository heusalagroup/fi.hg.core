import { iCheckoutParam } from "./iCheckoutParam";
import { iCheckoutProvider } from "./iCheckoutProvider";

export class CheckoutProvider implements iCheckoutProvider {
    private _name: string;
    private _icon: string;
    private _url: string;

    private _params: iCheckoutParam[];

    constructor(url: string, name: string, icon: string, params: iCheckoutParam[]) {
        if (!url) throw new Error('URL not provided: ' + url);
        if (!name) throw new Error('Name not provided: ' + name);
        if (!icon) throw new Error('Icon not provided: ' + icon);
        if (!Array.isArray(params)) throw new Error('Params is not array: ' + JSON.stringify(params));

        this._url = url;
        this._name = name;
        this._icon = icon;
        this._params = params;
    }

    getName(): string {
        return this._name;
    }

    getURL(): string {
        return this._url;
    }

    getParams(): iCheckoutParam[] {
        return this._params;
    }

    getIcon(): string {
        return this._icon;
    }
}
