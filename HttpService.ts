// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { JsonAny,  ReadonlyJsonAny } from "./Json";
import { RequestClient } from "./RequestClient";
import { Observer,  ObserverCallback, ObserverDestructor } from "./Observer";
import { LogService } from "./LogService";

const LOG = LogService.createLogger('HttpService');

export enum Method {
    GET = "GET",
    POST = "POST"
}

export enum HttpServiceEvent {
    REQUEST_STARTED = "HttpService:requestStarted",
    REQUEST_STOPPED = "HttpService:requestStopped"
}

export type HttpServiceDestructor = ObserverDestructor;

export class HttpService {

    private static _requestLimit : number = 100;
    private static _baseApiUrl : string | undefined;
    private static _requestCount : number = 0;

    private static _observer: Observer<HttpServiceEvent> = new Observer<HttpServiceEvent>("HttpService");

    public static Event = HttpServiceEvent;

    public static setRequestLimit (value : number ) {
        this._requestLimit = value;
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

    public static async getJson (
        url : string,
        headers ?: {[key: string]: string}
    ) : Promise<ReadonlyJsonAny | undefined> {

        if (this._requestCount >= this._requestLimit) {
            throw new TypeError(`getJson: Too many request: ${this._requestCount}`);
        }

        try {

            if (this._baseApiUrl && url.startsWith('/api')) {
                url = `${this._baseApiUrl}${url.substring('/api'.length)}`;
            }

            this._requestCount += 1;
            this._observer.triggerEvent(HttpServiceEvent.REQUEST_STARTED, url, Method.GET);
            LOG.debug(`Started GET request to "${url} "(${this._requestCount} requests)`);

            const response : JsonAny | undefined = await RequestClient.getJson(url, headers);

            return response as ReadonlyJsonAny | undefined;

        } finally {
            this._requestCount -= 1;
            this._observer.triggerEvent(HttpServiceEvent.REQUEST_STOPPED, url, Method.GET);
            LOG.debug(`Stopped GET request to "${url}" (${this._requestCount} requests)`);
        }
    }

    public static async postJson (
        url      : string,
        data    ?: ReadonlyJsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<ReadonlyJsonAny | undefined> {

        if (this._requestCount >= this._requestLimit) {
            throw new TypeError(`postJson: Too many request: ${this._requestCount}`);
        }

        try {

            if (this._baseApiUrl && url.startsWith('/api')) {
                url = `${this._baseApiUrl}${url.substring('/api'.length)}`;
            }

            this._requestCount += 1;
            this._observer.triggerEvent(HttpServiceEvent.REQUEST_STARTED, url, Method.POST);
            LOG.debug(`Started POST request to "${url}" (${this._requestCount} requests)`);

            const response : JsonAny | undefined = await RequestClient.postJson(url, data as JsonAny, headers);

            return response as ReadonlyJsonAny | undefined;

        } finally {
            this._requestCount -= 1;
            this._observer.triggerEvent(HttpServiceEvent.REQUEST_STOPPED, url, Method.POST);
            LOG.debug(`Stopped POST request to "${url}" (${this._requestCount} requests)`);
        }
    }


    public static async getText (
        url : string,
        headers ?: {[key: string]: string}
    ) : Promise<string | undefined> {

        if (this._requestCount >= this._requestLimit) {
            throw new TypeError(`getText: Too many request: ${this._requestCount}`);
        }

        try {

            if (this._baseApiUrl && url.startsWith('/api')) {
                url = `${this._baseApiUrl}${url.substring('/api'.length)}`;
            }

            this._requestCount += 1;
            this._observer.triggerEvent(HttpServiceEvent.REQUEST_STARTED, url, Method.GET);
            LOG.debug(`Started GET request to "${url} "(${this._requestCount} requests)`);

            const response : string | undefined = await RequestClient.getText(url, headers);

            return response as string | undefined;

        } finally {
            this._requestCount -= 1;
            this._observer.triggerEvent(HttpServiceEvent.REQUEST_STOPPED, url, Method.GET);
            LOG.debug(`Stopped GET request to "${url}" (${this._requestCount} requests)`);
        }
    }

    public static async postText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<string | undefined> {

        if (this._requestCount >= this._requestLimit) {
            throw new TypeError(`postText: Too many request: ${this._requestCount}`);
        }

        try {

            if (this._baseApiUrl && url.startsWith('/api')) {
                url = `${this._baseApiUrl}${url.substring('/api'.length)}`;
            }

            this._requestCount += 1;
            this._observer.triggerEvent(HttpServiceEvent.REQUEST_STARTED, url, Method.POST);
            LOG.debug(`Started POST request to "${url}" (${this._requestCount} requests)`);

            const response : string | undefined = await RequestClient.postText(url, data, headers);

            return response as string | undefined;

        } finally {
            this._requestCount -= 1;
            this._observer.triggerEvent(HttpServiceEvent.REQUEST_STOPPED, url, Method.POST);
            LOG.debug(`Stopped POST request to "${url}" (${this._requestCount} requests)`);
        }
    }

}
