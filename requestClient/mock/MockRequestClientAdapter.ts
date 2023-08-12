// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestClientAdapter } from "../RequestClientAdapter";
import { RequestMethod } from "../../request/types/RequestMethod";
import { JsonAny } from "../../Json";
import { ResponseEntity } from "../../request/types/ResponseEntity";

export class MockRequestClientAdapter implements RequestClientAdapter {

    public async jsonEntityRequest (
        // @ts-ignore
        method: RequestMethod,
        // @ts-ignore
        url: string,
        // @ts-ignore
        headers?: {[p: string]: string},
        // @ts-ignore
        data?: JsonAny
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok(undefined);
    }

    public async jsonRequest (
        // @ts-ignore
        method: RequestMethod,
        // @ts-ignore
        url: string,
        // @ts-ignore
        headers?: {[p: string]: string},
        // @ts-ignore
        data?: JsonAny
    ): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async textEntityRequest (
        // @ts-ignore
        method: RequestMethod,
        // @ts-ignore
        url: string,
        // @ts-ignore
        headers?: {[p: string]: string},
        // @ts-ignore
        data?: JsonAny
    ): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok(undefined);
    }

    public async textRequest (
        // @ts-ignore
        method: RequestMethod,
        // @ts-ignore
        url: string,
        // @ts-ignore
        headers?: {[p: string]: string},
        // @ts-ignore
        data?: string
    ): Promise<string | undefined> {
        return undefined;
    }

}
