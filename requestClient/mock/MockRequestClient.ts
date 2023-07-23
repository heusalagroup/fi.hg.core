// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestClient } from "../../RequestClient";
import { JsonAny } from "../../Json";
import { ResponseEntity } from "../../request/types/ResponseEntity";
import { RequestClientAdapter } from "../RequestClientAdapter";
import { RequestMethod } from "../../request/types/RequestMethod";
import { MockRequestClientAdapter } from "./MockRequestClientAdapter";

export class MockRequestClient implements RequestClient {

    public async deleteJson (url: string, headers?: {[p: string]: string}, data?: JsonAny): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async deleteJsonEntity (url: string, headers?: {[p: string]: string}, data?: JsonAny): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok();
    }

    public async deleteText (url: string, headers?: {[p: string]: string}, data?: string): Promise<string | undefined> {
        return undefined;
    }

    public async deleteTextEntity (url: string, headers?: {[p: string]: string}, data?: string): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok();
    }

    public getClient (): RequestClientAdapter {
        return new MockRequestClientAdapter();
    }

    public async getJson (url: string, headers?: {[p: string]: string}): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async getJsonEntity (url: string, headers?: {[p: string]: string}): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok();
    }

    public async getText (url: string, headers?: {[p: string]: string}): Promise<string | undefined> {
        return undefined;
    }

    public async getTextEntity (url: string, headers?: {[p: string]: string}): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok();
    }

    public async jsonEntityRequest (method: RequestMethod, url: string, headers?: {[p: string]: string}, data?: JsonAny): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok();
    }

    public async jsonRequest (method: RequestMethod, url: string, headers?: {[p: string]: string}, data?: JsonAny): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async patchJson (url: string, data?: JsonAny, headers?: {[p: string]: string}): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async patchJsonEntity (url: string, data?: JsonAny, headers?: {[p: string]: string}): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok();
    }

    public async patchText (url: string, data?: string, headers?: {[p: string]: string}): Promise<string | undefined> {
        return undefined;
    }

    public async patchTextEntity (url: string, data?: string, headers?: {[p: string]: string}): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok();
    }

    public async postJson (url: string, data?: JsonAny, headers?: {[p: string]: string}): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async postJsonEntity (url: string, data?: JsonAny, headers?: {[p: string]: string}): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok();
    }

    public async postText (url: string, data?: string, headers?: {[p: string]: string}): Promise<string | undefined> {
        return undefined;
    }

    public async postTextEntity (url: string, data?: string, headers?: {[p: string]: string}): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok();
    }

    public async putJson (url: string, data?: JsonAny, headers?: {[p: string]: string}): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async putJsonEntity (url: string, data?: JsonAny, headers?: {[p: string]: string}): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok();
    }

    public async putText (url: string, data?: string, headers?: {[p: string]: string}): Promise<string | undefined> {
        return undefined;
    }

    public async putTextEntity (url: string, data?: string, headers?: {[p: string]: string}): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok();
    }

    public async textEntityRequest (method: RequestMethod, url: string, headers?: {[p: string]: string}, data?: string): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok();
    }

    public async textRequest (method: RequestMethod, url: string, headers?: {[p: string]: string}, data?: string): Promise<string | undefined> {
        return undefined;
    }

}
