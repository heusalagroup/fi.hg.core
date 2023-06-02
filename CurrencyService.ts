// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Currency } from "./types/Currency";
import { CurrencyFetchRatesCallback } from "./types/CurrencyFetchRatesCallback";
import { LogService } from "./LogService";
import { CurrencyRates } from "./types/CurrencyRates";
import { CurrencyUtils } from "./CurrencyUtils";
import { Observer, ObserverCallback, ObserverDestructor } from "./Observer";
import { Disposable } from "./types/Disposable";

const LOG = LogService.createLogger('CurrencyService');

const DEFAULT_FETCH_INTERVAL_SECONDS = 24*60*60;

export enum CurrencyServiceEvent {
    INITIALIZED = "CurrencyService:initialized",
    RATES_UPDATED = "CurrencyService:ratesUpdated",
    STARTED = "CurrencyService:started",
    STOPPED = "CurrencyService:stopped",
}

export type CurrencyServiceDestructor = ObserverDestructor;

export class CurrencyService implements Disposable {

    public static Event = CurrencyServiceEvent;

    private readonly _observer             : Observer<CurrencyServiceEvent>;
    private readonly _fetchRatesCallback   : CurrencyFetchRatesCallback;
    private readonly _fetchIntervalMinutes : number;

    private _rates           : CurrencyRates | undefined;
    private _fetchIntervalId : any | undefined;
    private _initializing    : boolean = false;

    /**
     *
     * @param callback
     * @param fetchInterval
     */
    public constructor (
        callback: CurrencyFetchRatesCallback,
        fetchInterval : number = DEFAULT_FETCH_INTERVAL_SECONDS
    ) {
        this._observer = new Observer<CurrencyServiceEvent>("CurrencyService");
        this._fetchRatesCallback = callback;
        this._rates = undefined;
        this._fetchIntervalMinutes = fetchInterval;
    }

    public on (
        name: CurrencyServiceEvent,
        callback: ObserverCallback<CurrencyServiceEvent>
    ): CurrencyServiceDestructor {
        return this._observer.listenEvent(name, callback);
    }

    public async initialize () : Promise<void> {
        this._initializing = true;
        try {
            await this._updateRates();
            this.start();
        } finally {
            this._initializing = false;
        }
        if (this._observer.hasCallbacks(CurrencyServiceEvent.INITIALIZED)) {
            this._observer.triggerEvent(CurrencyServiceEvent.INITIALIZED)
        }
    }

    public destroy (): void {
        this.stop();
        this._observer.destroy();
    }

    public start () {
        if (this._fetchIntervalId === undefined) {
            this._startInterval();
        }
    }

    public stop () {
        if (this._fetchIntervalId !== undefined) {
            this._stopInterval();
        }
    }

    public isInitializing () : boolean {
        return this._initializing;
    }

    public isStarted () : boolean {
        return this._fetchIntervalId !== undefined;
    }

    public hasRates () : boolean {
        return this._rates !== undefined;
    }

    public getRates () : CurrencyRates | undefined {
        return this._rates;
    }

    /**
     * Set rates directly
     * @param rates
     */
    public setRates (rates : CurrencyRates) {
        if (rates !== this._rates) {
            this._rates = rates;
            if (this._observer.hasCallbacks(CurrencyServiceEvent.RATES_UPDATED)) {
                this._observer.triggerEvent(CurrencyServiceEvent.RATES_UPDATED)
            }
        }
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
    public convertCurrencyAmount (
        amount    : number,
        from      : Currency,
        to        : Currency,
        accuracy  : number
    ) : number {
        if (this._rates === undefined) {
            throw new TypeError(`CurrencyService does not have rates defined yet`);
        }
        return CurrencyUtils.convertCurrencyAmount(this._rates, amount, from, to, accuracy);
    }

    /**
     *
     * @private
     */
    private async _updateRates () {
        this._rates = await this._fetchRatesCallback();
        if (this._observer.hasCallbacks(CurrencyServiceEvent.RATES_UPDATED)) {
            this._observer.triggerEvent(CurrencyServiceEvent.RATES_UPDATED)
        }
    }

    private _stopInterval () {
        clearInterval(this._fetchIntervalId);
        this._fetchIntervalId = undefined;
        if (this._observer.hasCallbacks(CurrencyServiceEvent.STOPPED)) {
            this._observer.triggerEvent(CurrencyServiceEvent.STOPPED)
        }
    }

    private _startInterval () {
        if (this._fetchIntervalId !== undefined) {
            this._stopInterval();
        }
        this._fetchIntervalId = setInterval(
            () => {
                this.updateRates();
            },
            this._fetchIntervalMinutes * 1000
        );
        if (this._observer.hasCallbacks(CurrencyServiceEvent.STARTED)) {
            this._observer.triggerEvent(CurrencyServiceEvent.STARTED)
        }
    }

}
