// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import * as QueryString from "querystring";
import { IncomingMessage } from "http";
import { JsonAny } from "../../Json";

/**
 * The type definitions for Node were inciting to use strict type list, even though NodeJS manual
 * tells just "string".
 */
type BufferEncodingString = "utf-8" | "ascii" | "utf8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex" | undefined;

export class NodeHttpUtils {

    /**
     * Get request body data as Buffer object.
     *
     * @param request
     * @return The request input data
     */
    public static async getRequestDataAsBuffer (
        request : IncomingMessage
    ) : Promise<Buffer> {
        return new Promise( (resolve, reject) => {

            const chunks : Array<Buffer> = [];

            request.on('data', (chunk : Buffer) => {
                try {
                    chunks.push(chunk);
                } catch(err) {
                    reject(err);
                }
            });

            request.on('end', () => {
                try {
                    resolve( Buffer.concat(chunks) );
                } catch(err) {
                    reject(err);
                }
            });

        });
    }

    /**
     * Get request body data as string.
     *
     * @param request
     * @param encoding
     * @return The request input data
     */
    public static async getRequestDataAsString (
        request  : IncomingMessage,
        encoding : BufferEncodingString = 'utf8'
    ) : Promise<string> {

        const buffer = await NodeHttpUtils.getRequestDataAsBuffer(request);

        return buffer.toString(encoding);

    }

    /**
     * Get request body data as "application/x-www-form-urlencoded".
     *
     * @param request
     * @return The request input data. If request data is an empty string, an `undefined` will be
     *     returned.
     */
    public static async getRequestDataAsFormUrlEncoded (
        request : IncomingMessage
    ) : Promise<JsonAny | undefined> {

        const dataString = await NodeHttpUtils.getRequestDataAsString(request);

        if (dataString === "") {
            return undefined;
        }

        return QueryString.parse(dataString);

    }

    /**
     * Get request body data as JSON.
     *
     * @param request
     * @return The request input data. If request data is an empty string, an `undefined` will be
     *     returned.
     */
    public static async getRequestDataAsJson (
        request : IncomingMessage
    ) : Promise<JsonAny | undefined> {

        const dataString = await NodeHttpUtils.getRequestDataAsString(request);

        if (dataString === "") {
            return undefined;
        }

        return JSON.parse(dataString);

    }

}
