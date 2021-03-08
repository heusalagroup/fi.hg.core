// Copyright (c) 2020-2021 Sendanor. All rights reserved.

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
import NodeHttpUtils from "./requestClient/NodeHttpUtils";

const LOG = LogService.createLogger('RequestServer');

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
                async () : Promise<Json | undefined> => NodeHttpUtils.getRequestDataAsJson(req)
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


}

export default RequestServer;
