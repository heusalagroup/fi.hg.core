// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { iCheckoutProvider } from "./iCheckoutProvider";
import { iCheckoutTransaction } from "./iCheckoutTransaction";

export class CheckoutTransaction implements iCheckoutTransaction {
    private readonly _transactionId: string;
    private readonly _href: string;
    private readonly _terms: string;
    private readonly _reference: string;
    private readonly _providers: iCheckoutProvider[];
    private readonly _raw: any[];

    public constructor(
        transaction_id: string,
        href: string,
        terms: string,
        reference: string,
        providers: iCheckoutProvider[],
        raw: any[]
    ) {
        this._transactionId = transaction_id;
        this._providers = providers;
        this._href = href;
        this._terms = terms;
        this._reference = reference;
        this._raw = raw;
    }

    getTransactionId(): string {
        return this._transactionId;
    }

    getProviders(): iCheckoutProvider[] {
        return this._providers;
    }

    getHref(): string {
        return this._href;
    }

    getTerms(): string {
        return this._terms;
    }

    getReference(): string {
        return this._reference;
    }

    getRaw(): any[] {
        return this._raw;
    }
}
