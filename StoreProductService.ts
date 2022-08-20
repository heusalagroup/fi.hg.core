// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Product } from "./store/types/product/Product";
import { ProductType } from "./store/types/product/ProductType";
import { filter, map } from "./modules/lodash";
import { ReadonlyJsonAny } from "./Json";
import { isStoreIndexDTO } from "./store/types/api/StoreIndexDTO";
import { LogService } from "./LogService";
import { Observer, ObserverCallback, ObserverDestructor } from "./Observer";
import { HttpService } from "./HttpService";

const DEFAULT_STORE_API_URL = '/api';
const SERVICE_NAME = "StoreProductService";

export enum StoreProductServiceEvent {
    UPDATED = "StoreProductService:updated"
}

export type StoreProductServiceDestructor = ObserverDestructor;

const LOG = LogService.createLogger(SERVICE_NAME);

/**
 * @FIXME: Remove static, convert as a normal class, so that can be used on the
 *         server side also. Maybe create a StaticStoreProductService for
 *         frontend use.
 */
export class StoreProductService {

    private static _apiUrl      : string = DEFAULT_STORE_API_URL;
    private static _initialized : boolean = false;
    private static _loading     : boolean = false;
    private static _allProducts : readonly Product[] = [];

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
            const response : ReadonlyJsonAny | undefined = await HttpService.getJson(`${this._apiUrl}`);
            if ( isStoreIndexDTO(response) ) {
                this._allProducts = response?.products?.items ?? [];
                this._initialized = true;
                this._observer.triggerEvent(StoreProductServiceEvent.UPDATED);
            } else {
                LOG.error(`The response was not SendanorIndexDTO: `, response);
            }
        } finally {
            this._loading = false;
        }
    }

}
