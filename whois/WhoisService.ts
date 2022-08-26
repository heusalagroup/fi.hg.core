// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export interface WhoisLookupOptions {
    readonly server?: string | WhoisServerOptions | null;
    readonly follow?: number;
    readonly timeout?: number;
    readonly punycode?: boolean;
    readonly encoding?: BufferEncoding;
    readonly bind?: string | null;
}

export interface WhoisLookupResult {
    readonly server : string;
    readonly data : string;
}

export interface WhoisServerOptions {
    readonly host?: string;
    readonly port?: number;
    readonly query?: string;
    readonly punycode?: boolean;
}

export interface WhoisServerList {
    readonly [key: string]: string | WhoisServerOptions | null;
}

export interface WhoisService {

    whoisLookup (
        address: string,
        options?: WhoisLookupOptions
    ) : Promise<readonly WhoisLookupResult[]>;

}
