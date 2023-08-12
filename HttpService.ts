// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { JsonAny,  ReadonlyJsonAny } from "./Json";
import { RequestClientImpl } from "./RequestClientImpl";
import { Observer,  ObserverCallback, ObserverDestructor } from "./Observer";
import { LogService } from "./LogService";
import { LogLevel } from "./types/LogLevel";
import { ResponseEntity } from "./request/types/ResponseEntity";
import { isRequestError } from "./request/types/RequestError";
import { getNextRetryDelay, HttpRetryPolicy, shouldRetry } from "./request/types/HttpRetryPolicy";
import { Method } from "./types/Method";

export { Method };

const LOG = LogService.createLogger('HttpService');

export enum HttpServiceEvent {
    REQUEST_STARTED = "HttpService:requestStarted",
    REQUEST_STOPPED = "HttpService:requestStopped"
}

export type HttpServiceDestructor = ObserverDestructor;

export class HttpService {

    private static _defaultRetryDelay : number = 1000;
    private static _requestLimit : number = 100;
    private static _baseApiUrl : string | undefined;
    private static _requestCount : number = 0;

    private static _observer: Observer<HttpServiceEvent> = new Observer<HttpServiceEvent>("HttpService");

    public static Event = HttpServiceEvent;

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
        RequestClientImpl.setLogLevel(level);
    }

    public static setRequestLimit (value : number ) {
        this._requestLimit = value;
    }

    /**
     * How long we should wait after a recoverable error happens until trying
     * the request again. This is the base delay.
     *
     * This is active only if the retry policy has been defined but it does not
     * include a base delay.
     *
     * @param value The time to wait in milliseconds
     */
    public static setDefaultRetryLimit (value : number ) {
        this._defaultRetryDelay = value;
    }

    /**
     * Defines an optional base API URL which will be used if URL does not have a full URL (e.g. starts with "/api").
     *
     * This is required for browser compatible NodeJS SSR use case.
     *
     * @param url
     */
    public static setBaseUrl (url : string | undefined) {
        this._baseApiUrl = url;
    }

    public static on (
        name: HttpServiceEvent,
        callback: ObserverCallback<HttpServiceEvent>
    ): HttpServiceDestructor {
        return this._observer.listenEvent(name, callback);
    }

    public static destroy (): void {

        this._observer.destroy();

        // FIXME: Cancel requests

    }

    public static hasOpenRequests () : boolean {
        return this._requestCount >= 1;
    }

    public static getRequestCount () : number {
        return this._requestCount;
    }

    public static async waitUntilNoOpenRequests () : Promise<void> {

        if (!this.hasOpenRequests()) {
            LOG.debug(`No open requests to wait`);
            return;
        }

        LOG.debug(`waitUntilNoOpenRequests: Let's wait until no requests`);
        return await new Promise((resolve, reject) => {
            try {
                let destructor : any | undefined = this.on(HttpServiceEvent.REQUEST_STOPPED, () => {
                    try {
                        if (!this.hasOpenRequests()) {
                            LOG.debug(`waitUntilNoOpenRequests: No requests anymore. We're ready!`);
                            destructor();
                            destructor = undefined;
                            resolve();
                        } else {
                            LOG.debug(`waitUntilNoOpenRequests: We still have ${this.getRequestCount()} requests`);
                        }
                    } catch (err) {
                        LOG.debug(`waitUntilNoOpenRequests: Canceling waiting: error: `, err);
                        reject(err);
                    }
                });
            } catch (err) {
                LOG.debug(`waitUntilNoOpenRequests: Canceling waiting: error: `, err);
                reject(err);
            }
        });

    }

    private static _prepareUrl (url : string) : string {
        if (this._baseApiUrl && url.startsWith('/api')) {
            return `${this._baseApiUrl}${url.substring('/api'.length)}`;
        }
        return url;
    }

    private static async _request<T> (
        context      : string,
        method       : Method,
        url          : string,
        callback     : () => T,
        retryPolicy ?: HttpRetryPolicy,
        attempt     ?: number,
        retryDelay  ?: number
    ) : Promise<T | undefined> {
        attempt = attempt ?? 0;
        retryDelay = retryDelay ?? retryPolicy?.baseDelay ?? this._defaultRetryDelay;
        if (attempt === 0 && this._requestCount >= this._requestLimit) {
            throw new TypeError(`${context}: Too many requests: ${this._requestCount}`);
        }
        try {
            if (attempt === 0) {
                this._requestCount += 1;
                if ( this._observer.hasCallbacks(HttpServiceEvent.REQUEST_STARTED) ) {
                    this._observer.triggerEvent(HttpServiceEvent.REQUEST_STARTED, url, method);
                }
                LOG.debug(`Started ${method} request to "${url} "(${this._requestCount} requests)`);
            } else {
                LOG.debug(`Started attempt ${attempt} for ${method} request to "${url} "(${this._requestCount} requests)`);
            }
            return await callback();
        } catch (e) {
            const code : any = (e as any)?.code;
            const status = isRequestError(e) ? e.status : 0;
            if (retryPolicy) {
                if (shouldRetry(retryPolicy, attempt, method, status, code)) {
                    LOG.warn(`Error in ${method} "${url}": ${e} ${code} ${status}`);
                    LOG.debug(`Waiting next attempt for ${method} request to "${url} "(${this._requestCount} requests)`);
                    await this._waitForRetry(retryDelay);
                    retryDelay = getNextRetryDelay(retryDelay, retryPolicy);
                    return await this._request(context, method, url, callback, retryPolicy, attempt + 1, retryDelay);
                } else {
                    throw e;
                }
            } else {
                throw e;
            }
        } finally {
            if (attempt === 0) {
                this._requestCount -= 1;
                if (this._observer.hasCallbacks(HttpServiceEvent.REQUEST_STOPPED)) {
                    this._observer.triggerEvent(HttpServiceEvent.REQUEST_STOPPED, url, method);
                }
                LOG.debug(`Stopped ${method} request to "${url}" (${this._requestCount} requests)`);
            }
        }
    }

    private static async _waitForRetry (time: number) : Promise<void> {
        LOG.debug(`Waiting for retry time: `, time);
        return new Promise( (resolve, reject) => {
            try {
                setTimeout(
                    () => {
                        resolve();
                    },
                    time
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    public static async getJson (
        url : string,
        headers ?: {[key: string]: string},
        retryPolicy ?: HttpRetryPolicy
    ) : Promise<ReadonlyJsonAny | undefined> {
        url = this._prepareUrl(url);
        return this._request(
            'getJson',
            Method.GET,
            url,
            async () => {
                const response : JsonAny | undefined = await RequestClientImpl.getJson(url, headers);
                return response as ReadonlyJsonAny | undefined;
            },
            retryPolicy
        );
    }

    public static async postJson (
        url      : string,
        data    ?: ReadonlyJsonAny,
        headers ?: {[key: string]: string},
        retryPolicy ?: HttpRetryPolicy
    ) : Promise<ReadonlyJsonAny | undefined> {
        url = this._prepareUrl(url);
        return this._request(
            'postJson',
            Method.POST,
            url,
            async () => {
                const response : JsonAny | undefined = await RequestClientImpl.postJson(url, data as JsonAny, headers);
                return response as ReadonlyJsonAny | undefined;
            },
            retryPolicy
        );
    }

    public static async deleteJson (
        url      : string,
        headers ?: {[key: string]: string},
        retryPolicy ?: HttpRetryPolicy
    ) : Promise<ReadonlyJsonAny | undefined> {
        url = this._prepareUrl(url);
        return this._request(
            'deleteJson',
            Method.DELETE,
            url,
            async () => {
                const response : JsonAny | undefined = await RequestClientImpl.deleteJson(url, headers);
                return response as ReadonlyJsonAny | undefined;
            },
            retryPolicy
        );
    }


    public static async getText (
        url : string,
        headers ?: {[key: string]: string},
        retryPolicy ?: HttpRetryPolicy
    ) : Promise<string | undefined> {
        url = this._prepareUrl(url);
        return this._request(
            'getText',
            Method.GET,
            url,
            async () => {
                const response : string | undefined = await RequestClientImpl.getText(url, headers);
                return response as string | undefined;
            },
            retryPolicy
        );
    }

    public static async postText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string},
        retryPolicy ?: HttpRetryPolicy
    ) : Promise<string | undefined> {
        url = this._prepareUrl(url);
        return this._request(
            'postText',
            Method.POST,
            url,
            async () => {
                const response : string | undefined = await RequestClientImpl.postText(url, data, headers);
                return response as string | undefined;
            },
            retryPolicy
        );
    }

    public static async deleteText (
        url      : string,
        headers ?: {[key: string]: string},
        retryPolicy ?: HttpRetryPolicy
    ) : Promise<string | undefined> {
        url = this._prepareUrl(url);
        return this._request(
            'deleteText',
            Method.DELETE,
            url,
            async () => {
                const response : string | undefined = await RequestClientImpl.deleteText(url, headers);
                return response as string | undefined;
            },
            retryPolicy
        );
    }

    public static async getJsonEntity (
        url : string,
        headers ?: {[key: string]: string},
        retryPolicy ?: HttpRetryPolicy
    ) : Promise<ResponseEntity<JsonAny|undefined> | undefined> {
        url = this._prepareUrl(url);
        return this._request(
            'getJsonEntity',
            Method.GET,
            url,
            async () => {
                return await RequestClientImpl.getJsonEntity(url, headers);
            },
            retryPolicy
        );
    }

    public static async postJsonEntity (
        url      : string,
        data    ?: ReadonlyJsonAny,
        headers ?: {[key: string]: string},
        retryPolicy ?: HttpRetryPolicy
    ) : Promise<ResponseEntity<JsonAny|undefined> | undefined> {
        url = this._prepareUrl(url);
        return this._request(
            'postJsonEntity',
            Method.POST,
            url,
            async () => {
                return await RequestClientImpl.postJsonEntity(url, data as JsonAny, headers);
            },
            retryPolicy
        );
    }

    public static async deleteJsonEntity (
        url      : string,
        headers ?: {[key: string]: string},
        retryPolicy ?: HttpRetryPolicy
    ) : Promise<ResponseEntity<JsonAny|undefined> | undefined> {
        url = this._prepareUrl(url);
        return this._request(
            'deleteJsonEntity',
            Method.DELETE,
            url,
            async () => {
                return await RequestClientImpl.deleteJsonEntity(url, headers);
            },
            retryPolicy
        );
    }


    public static async getTextEntity (
        url : string,
        headers ?: {[key: string]: string},
        retryPolicy ?: HttpRetryPolicy
    ) : Promise<ResponseEntity<string|undefined> | undefined> {
        url = this._prepareUrl(url);
        return this._request(
            'getTextEntity',
            Method.GET,
            url,
            async () => {
                return await RequestClientImpl.getTextEntity(url, headers);
            },
            retryPolicy
        );
    }

    public static async postTextEntity (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string},
        retryPolicy ?: HttpRetryPolicy
    ) : Promise<ResponseEntity<string|undefined> | undefined> {
        url = this._prepareUrl(url);
        return this._request(
            'postTextEntity',
            Method.POST,
            url,
            async () => {
                return await RequestClientImpl.postTextEntity(url, data, headers);
            },
            retryPolicy
        );
    }

    public static async deleteTextEntity (
        url      : string,
        headers ?: {[key: string]: string},
        retryPolicy ?: HttpRetryPolicy
    ) : Promise<ResponseEntity<string|undefined> | undefined> {
        url = this._prepareUrl(url);
        return this._request(
            'deleteTextEntity',
            Method.DELETE,
            url,
            async () => {
                return await RequestClientImpl.deleteTextEntity(url, headers);
            },
            retryPolicy
        );
    }

}
