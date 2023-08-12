// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestClient } from "../../RequestClient";
import { JsonAny } from "../../Json";
import { ResponseEntity } from "../../request/types/ResponseEntity";
import { RequestClientAdapter } from "../RequestClientAdapter";
import { RequestMethod } from "../../request/types/RequestMethod";
import { MockRequestClientAdapter } from "./MockRequestClientAdapter";

export class MockRequestClient implements RequestClient {

    public async deleteJson (
        // @ts-ignore
        url: string, headers?: {[p: string]: string}, data?: JsonAny): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async deleteJsonEntity (
        // @ts-ignore
        url: string, headers?: {[p: string]: string}, data?: JsonAny): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok();
    }

    public async deleteText (
        // @ts-ignore
        url: string, headers?: {[p: string]: string}, data?: string): Promise<string | undefined> {
        return undefined;
    }

    public async deleteTextEntity (
        // @ts-ignore
        url: string, headers?: {[p: string]: string}, data?: string): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok();
    }

    public getClient (): RequestClientAdapter {
        return new MockRequestClientAdapter();
    }

    public async getJson (
        // @ts-ignore
        url: string, headers?: {[p: string]: string}): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async getJsonEntity (
        // @ts-ignore
        url: string, headers?: {[p: string]: string}): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok();
    }

    public async getText (
        // @ts-ignore
        url: string, headers?: {[p: string]: string}): Promise<string | undefined> {
        return undefined;
    }

    public async getTextEntity (
        // @ts-ignore
        url: string, headers?: {[p: string]: string}): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok();
    }

    public async jsonEntityRequest (
        // @ts-ignore
        method: RequestMethod, url: string, headers?: {[p: string]: string}, data?: JsonAny): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok();
    }

    public async jsonRequest (
        // @ts-ignore
        method: RequestMethod, url: string, headers?: {[p: string]: string}, data?: JsonAny): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async patchJson (
        // @ts-ignore
        url: string, data?: JsonAny, headers?: {[p: string]: string}): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async patchJsonEntity (
        // @ts-ignore
        url: string, data?: JsonAny, headers?: {[p: string]: string}): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok();
    }

    public async patchText (
        // @ts-ignore
        url: string, data?: string, headers?: {[p: string]: string}): Promise<string | undefined> {
        return undefined;
    }

    public async patchTextEntity (
        // @ts-ignore
        url: string, data?: string, headers?: {[p: string]: string}): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok();
    }

    public async postJson (
        // @ts-ignore
        url: string, data?: JsonAny, headers?: {[p: string]: string}): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async postJsonEntity (
        // @ts-ignore
        url: string, data?: JsonAny, headers?: {[p: string]: string}): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok();
    }

    public async postText (
        // @ts-ignore
        url: string, data?: string, headers?: {[p: string]: string}): Promise<string | undefined> {
        return undefined;
    }

    public async postTextEntity (
        // @ts-ignore
        url: string, data?: string, headers?: {[p: string]: string}): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok();
    }

    public async putJson (
        // @ts-ignore
        url: string, data?: JsonAny, headers?: {[p: string]: string}): Promise<JsonAny | undefined> {
        return undefined;
    }

    public async putJsonEntity (
        // @ts-ignore
        url: string, data?: JsonAny, headers?: {[p: string]: string}): Promise<ResponseEntity<JsonAny | undefined>> {
        return ResponseEntity.ok();
    }

    public async putText (
        // @ts-ignore
        url: string, data?: string, headers?: {[p: string]: string}): Promise<string | undefined> {
        return undefined;
    }

    public async putTextEntity (
        // @ts-ignore
        url: string, data?: string, headers?: {[p: string]: string}): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok();
    }

    public async textEntityRequest (
        // @ts-ignore
        method: RequestMethod, url: string, headers?: {[p: string]: string}, data?: string): Promise<ResponseEntity<string | undefined>> {
        return ResponseEntity.ok();
    }

    public async textRequest (
        // @ts-ignore
        method: RequestMethod, url: string, headers?: {[p: string]: string}, data?: string): Promise<string | undefined> {
        return undefined;
    }

}
