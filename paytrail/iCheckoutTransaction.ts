import { iCheckoutProvider } from "./iCheckoutProvider";

export interface iCheckoutTransaction {
    getTransactionId(): string;
    getHref(): string;
    getTerms(): string;
    getReference(): string;
    getProviders(): iCheckoutProvider[];
    getRaw(): any;  // replace "any" with the appropriate type.
}
