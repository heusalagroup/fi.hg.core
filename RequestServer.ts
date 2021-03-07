// Copyright (c) 2020 Sendanor. All rights reserved.

import HttpServerService from "./requestServer/HttpServerService";
import {IncomingMessage, ServerResponse} from "http";
import RequestRouter from "./requestServer/RequestRouter";
import {isRequestStatus} from "./request/types/RequestStatus";
import {createRequestError, isRequestError} from "./request/types/RequestError";
import URL from "url";
import ServerService from "./requestServer/types/ServerService";
import {RequestHandler} from "./requestServer/types/RequestHandler";
import {parseRequestMethod} from "./request/types/RequestMethod";
import LogService from "./LogService";
import RequestType from "./request/types/RequestType";
import {isRequestController} from "./request/types/RequestController";
import Json from "./Json";

const LOG = LogService.createLogger('RequestServer');

/**
 * The type definitions for Node were inciting to use strict type list, even though NodeJS manual tells just "string".
 */
type BufferEncodingString = "utf-8" | "ascii" | "utf8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex" | undefined;

export const DEFAULT_REQUEST_SERVER_CONFIG_STRING = 'http://localhost:3000';

export class RequestServer {

    private readonly _server: ServerService<IncomingMessage, ServerResponse>;
    private readonly _router: RequestRouter;
    private readonly _handleRequestCallback: RequestHandler<any, any>;

    public constructor(
        config: string = DEFAULT_REQUEST_SERVER_CONFIG_STRING
    ) {

        this._server = RequestServer.createServerService(config);
        this._router = new RequestRouter();

        this._handleRequestCallback = this._handleRequest.bind(this);

        this._server.setHandler(this._handleRequestCallback);

    }

    /**
     * Attach an instance which was previously annotated with our Request annotation implementation.
     *
     * @param controller Class instance which has internal Request annotations
     */
    public attachController (
        controller : any
    ) {

        if (isRequestController(controller)) {

            this._router.attachController(controller);

        } else {
            throw new TypeError(`The provided controller was not supported type`);
        }

    }

    start() {

        this._server.start();

    }

    stop() {

        this._server.stop();

    }

    private async _handleRequest(
        req: IncomingMessage,
        res: ServerResponse
    ): Promise<void> {

        try {

            const responseData = await this._router.handleRequest(
                parseRequestMethod(req.method),
                req.url,
                async () : Promise<Json | undefined> => RequestServer._getRequestDataAsJson(req)
            );

            this._handleResponse(responseData, res);

        } catch (err) {

            LOG.error('Error: ', err);

            this._handleErrorResponse(err, res);

        }

    }

    private _handleResponse(
        body: any,
        res: ServerResponse
    ): void {

        // FIXME: This number detection should be something that's activated using annotations
        if (isRequestStatus(body)) {

            body = createRequestError(body);

            res.statusCode = body.status;
            res.statusMessage = body.message;

            // FIXME: This error detection without an exception should be something that's activated using annotations
        } else if (isRequestError(body)) {

            res.statusCode = body.status;
            res.statusMessage = body.message;

        }

        res.end(JSON.stringify(body, null, 2));

    }

    private _handleErrorResponse(
        error: any,
        res: ServerResponse
    ): void {

        let statusCode = 500;
        let statusMessage = "Internal Error";

        if (isRequestStatus(error)) {
            error = createRequestError(error);
            statusCode = error.status;
            statusMessage = error.message;
        }

        if (isRequestError(error)) {
            statusCode = error.status;
            statusMessage = error.message;
        }

        res.statusCode = statusCode;
        res.statusMessage = statusMessage;
        res.end(JSON.stringify({
            type: RequestType.ERROR,
            status: statusCode,
            message: statusMessage
        }, null, 2));

    }

    static createServerService(
        config: string
    ): ServerService<IncomingMessage, ServerResponse> {

        const url = new URL.URL(config);

        if (url.protocol === 'http:') {

            const port = url.port ? parseInt(url.port, 10) : 80;

            return new HttpServerService(port, url.hostname);

        } else {

            throw new TypeError(`RequestServer: Protocol "${url.protocol}" not yet supported`);

        }

    }

    /**
     * Get request body data as Buffer object.
     *
     * @param request
     * @return The request input data
     */
    private static async _getRequestDataAsBuffer (
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
    private static async _getRequestDataAsString (
        request  : IncomingMessage,
        encoding : BufferEncodingString = 'utf8'
    ) : Promise<string> {

        const buffer = await this._getRequestDataAsBuffer(request);

        return buffer.toString(encoding);

    }

    /**
     * Get request body data as JSON.
     *
     * @param request
     * @return The request input data. If request data is an empty string, an `undefined` will be returned.
     */
    private static async _getRequestDataAsJson (
        request : IncomingMessage
    ) : Promise<Json | undefined> {

        const dataString = await this._getRequestDataAsString(request);

        if (dataString === "") {
            return undefined;
        }

        return JSON.parse(dataString);

    }

}

export default RequestServer;
