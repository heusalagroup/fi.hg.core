// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Currency } from "./types/Currency";
import { CurrencyFetchRatesCallback } from "./types/CurrencyFetchRatesCallback";
import { LogService } from "./LogService";
import { CurrencyRates } from "./types/CurrencyRates";
import { CurrencyUtils } from "./CurrencyUtils";

const LOG = LogService.createLogger('CurrencyService');

const DEFAULT_FETCH_INTERVAL_SECONDS = 24*60*60;

export class CurrencyService {

    private readonly _fetchRatesCallback : CurrencyFetchRatesCallback;
    private readonly _fetchIntervalMinutes : number;
    private _rates : CurrencyRates | undefined;
    private _fetchIntervalId : any | undefined;

    /**
     *
     * @param callback
     * @param fetchInterval
     */
    public constructor (
        callback: CurrencyFetchRatesCallback,
        fetchInterval : number = DEFAULT_FETCH_INTERVAL_SECONDS
    ) {
        this._fetchRatesCallback = callback;
        this._rates = undefined;
        this._fetchIntervalMinutes = fetchInterval;
    }

    public async initialize () : Promise<void> {
        await this._updateRates();
        this._startInterval();
    }

    public getRates () : CurrencyRates | undefined {
        return this._rates;
    }

    /**
     * Set rates directly
     * @param rates
     */
    public setRates (rates : CurrencyRates) {
        this._rates = rates;
    }

    /**
     * Update rates using fetch callback
     */
    public updateRates () {
        this._updateRates().catch((err) => {
            LOG.error(`Could not update rates: `, err);
        });
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
        accuracy  : number
    ) : Promise<number> {
        return CurrencyUtils.convertCurrencyAmount(this._rates, amount, from, to, accuracy);
    }

    /**
     *
     * @private
     */
    private async _updateRates () {
        this._rates = await this._fetchRatesCallback();
    }

    private _stopInterval () {
        if (this._fetchIntervalId !== undefined) {
            clearInterval(this._fetchIntervalId);
            this._fetchIntervalId = undefined;
        }
    }

    private _startInterval () {
        this._stopInterval();
        this._fetchIntervalId = setInterval(
            () => {
                this.updateRates();
            },
            this._fetchIntervalMinutes * 1000
        );
    }

}
