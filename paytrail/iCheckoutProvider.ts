
import { iCheckoutParam } from "./iCheckoutParam";

export interface iCheckoutProvider {
    getName(): string;
    getURL(): string;
    getParams(): iCheckoutParam[];
    getIcon(): string;
}
