// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMethod } from "./request/types/RequestMethod";
import { JsonAny } from "./Json";
import { RequestClientAdapter } from "./requestClient/RequestClientAdapter";
import { ResponseEntity } from "./request/types/ResponseEntity";

/**
 * Implements higher level extended portable functionality for request clients,
 * e.g. functionality shared between different request client adapters.
 *
 * Before using static methods of this library the implementation must be defined
 * and selected using `RequestClientImpl.useClient()`.
 *
 * - See `HgNode.initialize()` which calls `useClient()` for Node.js projects
 * - See `HgFrontend.initialize()` which calls `useClient()` for frontend projects
 *
 * You may also use it as a standard class:
 *
 * `const client = new RequestClient( clientImplementation );
 *
 */
export interface RequestClient {

    /**
     * Returns the internal request adapter
     */
    getClient () : RequestClientAdapter;


    textEntityRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<ResponseEntity<string| undefined>>;

    getTextEntity (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<string| undefined>>;

    postTextEntity (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<string| undefined>>;

    patchTextEntity (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<string| undefined>>;

    putTextEntity (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<string| undefined>>;

    deleteTextEntity (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<ResponseEntity<string| undefined>>;


    textRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<string| undefined>;

    getText (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined>;

    postText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined>;

    patchText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined>;

    putText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined>;

    deleteText (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<string| undefined>;


    jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined>;

    getJson (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined>;

    postJson (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined>;

    patchJson (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined>;

    putJson (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined>;

    deleteJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined>;



    jsonEntityRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<ResponseEntity<JsonAny| undefined>>;

    getJsonEntity (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<JsonAny|undefined>>;

    postJsonEntity (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<JsonAny| undefined>>;

    patchJsonEntity (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<JsonAny| undefined>>;

    putJsonEntity (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<JsonAny| undefined>>;

    deleteJsonEntity (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<ResponseEntity<JsonAny| undefined>>;

}
