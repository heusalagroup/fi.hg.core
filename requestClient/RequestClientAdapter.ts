// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestMethod } from "../request/types/RequestMethod";
import { JsonAny } from "../Json";
import { ResponseEntity } from "../request/types/ResponseEntity";

export interface RequestClientAdapter {

    jsonEntityRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<ResponseEntity<JsonAny|undefined>>;

    textEntityRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<ResponseEntity<string|undefined>>;

    jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny|undefined>;

    textRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<string|undefined>;

}
