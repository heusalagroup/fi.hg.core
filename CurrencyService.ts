// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Currency } from "./types/Currency";
import { CurrencyExchangeService } from "./CurrencyExchangeService";

export interface CurrencyExchangeCallback {
    (
        amount    : number,
        from      : Currency,
        to        : Currency,
        accuracy ?: number
    ) : Promise<number>;
}

export class CurrencyService implements CurrencyExchangeService {

    private readonly _exchangeCallback : CurrencyExchangeCallback;

    /**
     *
     * @param callback
     */
    public constructor (
        callback: CurrencyExchangeCallback
    ) {
        this._exchangeCallback = callback;
    }

    /**
     *
     * @param amount
     * @param from
     * @param to
     * @param accuracy
     */
    public async convertCurrencyAmount (
        amount    : number,
        from      : Currency,
        to        : Currency,
        accuracy ?: number
    ) : Promise<number> {
        return this._exchangeCallback(amount, from, to, accuracy);
    }

}
