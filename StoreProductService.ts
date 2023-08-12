// Copyright (c) 2022-2023. Sendanor <info@sendanor.fi>. All rights reserved.
// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Product } from "./store/types/product/Product";
import { ProductType } from "./store/types/product/ProductType";
import { filter } from "./functions/filter";
import { map } from "./functions/map";
import { StoreIndexDTO } from "./store/types/api/StoreIndexDTO";
import { LogService } from "./LogService";
import { Observer, ObserverCallback, ObserverDestructor } from "./Observer";
import { LogLevel } from "./types/LogLevel";
import { StoreClientService } from "./StoreClientService";

const DEFAULT_STORE_API_URL = '/api';
const SERVICE_NAME = "StoreProductService";

export enum StoreProductServiceEvent {
    UPDATED = "StoreProductService:updated"
}

export type StoreProductServiceDestructor = ObserverDestructor;

const LOG = LogService.createLogger(SERVICE_NAME);

const MY_PRODUCT_LIST_FETCH_RETRY_TIMEOUT_ON_ERROR = 3000;

/**
 * @FIXME: Remove static, convert as a normal class, so that can be used on the
 *         server side also. Maybe create a StaticStoreProductService for
 *         frontend use.
 */
export class StoreProductService {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    private static _updateTimeout : any = undefined;
    private static _apiUrl      : string = DEFAULT_STORE_API_URL;
    private static _initialized : boolean = false;
    private static _loading     : boolean = false;
    private static _allProducts : readonly Product[] = [];

    // @ts-ignore @todo Should write unit test for this
    private static setApiUrl (value: string) {
        this._apiUrl = value;
    }

    private static _observer: Observer<StoreProductServiceEvent> = new Observer<StoreProductServiceEvent>(SERVICE_NAME);

    public static Event = StoreProductServiceEvent;

    public static on (
        name: StoreProductServiceEvent,
        callback: ObserverCallback<StoreProductServiceEvent>
    ): StoreProductServiceDestructor {
        return this._observer.listenEvent(name, callback);
    }

    public static destroy (): void {
        this._observer.destroy();
    }

    public static isInitialized () : boolean {
        return this._initialized;
    }

    public static isLoading () : boolean {
        return this._loading;
    }

    public static hasErrors () : boolean {
        return this._updateTimeout !== undefined;
    }

    public static refreshProducts () {
        this._updateProducts().catch(err => {
            LOG.error(`Could not load products: `, err);
        });
    }

    public static getAllProducts () : Product[] {
        if ( !this._initialized && !this._loading ) {
            this.refreshProducts();
        }
        return map(this._allProducts, (item) => item);
    }

    public static getProductsByType (type: ProductType) : Product[] {
        return filter(
            this.getAllProducts(),
            (item : Product) : boolean => item?.type === type
        );
    }

    private static async _updateProducts () : Promise<void> {
        this._loading = true;
        try {
            const response: StoreIndexDTO = await StoreClientService.getStoreIndex(this._apiUrl);
            this._allProducts = response?.products?.items ?? [];
            this._initialized = true;
            this._observer.triggerEvent(StoreProductServiceEvent.UPDATED);
        } catch (err) {
            LOG.error(`Error: `, err);
            this._triggerUpdateLaterAfterError();
        } finally {
            this._loading = false;
        }
    }

    /**
     * Schedules an update later when errors happen
     *
     * @private
     */
    private static _triggerUpdateLaterAfterError () {
        if (this._updateTimeout) {
            clearTimeout(this._updateTimeout);
            this._updateTimeout = undefined;
        }
        this._updateTimeout = setTimeout(
            () => this._onUpdateErrorTimeout(),
            MY_PRODUCT_LIST_FETCH_RETRY_TIMEOUT_ON_ERROR
        );
    }

    /**
     * Called after an error happens to try again
     *
     * @private
     */
    private static _onUpdateErrorTimeout () {
        this._updateTimeout = undefined;
        if (!this.isLoading()) {
            this.refreshProducts();
        } else {
            LOG.debug(`We were already loading again`);
        }
    }

}
