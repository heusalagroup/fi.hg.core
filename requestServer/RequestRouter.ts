// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestController } from "../request/types/RequestController";
import { RequestMethod } from "../request/types/RequestMethod";
import { Headers } from "../request/types/Headers";
import { ResponseEntity } from "../request/types/ResponseEntity";
import { ParseRequestBodyCallback } from "./types/ParseRequestBodyCallback";

export interface RequestRouter {

    /**
     * Attach new controller to the router.
     *
     * @param controller
     */
    attachController (controller : RequestController) : void;

    /**
     * Handle a request with the router.
     *
     * @param methodString
     * @param urlString
     * @param parseRequestBody
     * @param requestHeaders
     */
    handleRequest (
        methodString      : RequestMethod,
        urlString         : string                   | undefined,
        parseRequestBody  : ParseRequestBodyCallback | undefined,
        requestHeaders    : Headers
    ) : Promise<ResponseEntity<any>>;

}
