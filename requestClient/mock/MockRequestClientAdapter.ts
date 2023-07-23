// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestClientAdapter } from "../RequestClientAdapter";
import { RequestMethod } from "../../request/types/RequestMethod";
import { JsonAny } from "../../Json";
import { ResponseEntity } from "../../request/types/ResponseEntity";

export class MockRequestClientAdapter implements RequestClientAdapter {

    public async jsonEntityRequest (
        method: RequestMethod,
        url: string,
        headers?: {[p: string]: string},
        data?: JsonAny
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok(undefined);
    }

    public async jsonRequest (
        method: RequestMethod,
        url: string,
        headers?: {[p: string]: string},
        data?: JsonAny
    ): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async textEntityRequest (
        method: RequestMethod,
        url: string,
        headers?: {[p: string]: string},
        data?: JsonAny
    ): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok(undefined);
    }

    public async textRequest (
        method: RequestMethod,
        url: string,
        headers?: {[p: string]: string},
        data?: string
    ): Promise<string | undefined> {
        return undefined;
    }

}
