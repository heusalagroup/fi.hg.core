// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import HttpServerService from "./requestServer/HttpServerService";
import {IncomingMessage, ServerResponse} from "http";
import RequestRouter from "./requestServer/RequestRouter";
import RequestStatus, {isRequestStatus, stringifyRequestStatus} from "./request/types/RequestStatus";
import RequestError, {createRequestError, isRequestError} from "./request/types/RequestError";
import URL from "url";
import ServerService from "./requestServer/types/ServerService";
import {RequestHandler} from "./requestServer/types/RequestHandler";
import {parseRequestMethod} from "./request/types/RequestMethod";
import LogService from "./LogService";
import {isRequestController} from "./request/types/RequestController";
import Json from "./Json";
import NodeHttpUtils from "./requestClient/NodeHttpUtils";
import ResponseEntity from "./request/ResponseEntity";
import {isString} from "./modules/lodash";

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
    ) : Promise<void> {

        try {

            const responseData : ResponseEntity<any> = await this._router.handleRequest(
                parseRequestMethod(req.method),
                req.url,
                async () : Promise<Json | undefined> => NodeHttpUtils.getRequestDataAsJson(req)
            );

            this._handleResponse(responseData, res);

        } catch (err) {

            LOG.debug('Error: ', err);

            this._handleErrorResponse(err, res);

        }

    }

    private _handleResponse(
        responseEntity : ResponseEntity<any>,
        res            : ServerResponse
    ): void {

        const statusCode : RequestStatus | number = responseEntity.getStatusCode();

        res.statusCode    = statusCode;
        res.statusMessage = stringifyRequestStatus(statusCode);

        if (responseEntity.hasBody()) {
            const body = responseEntity.getBody();
            if (isString(body)) {
                res.end(body);
            } else {
                res.end(JSON.stringify(body, null, 2));
            }
        } else {
            res.end();
        }

    }

    private _handleErrorResponse(
        error: any,
        res: ServerResponse
    ): void {

        let responseEntity : ResponseEntity<RequestError> | undefined;

        if (isRequestStatus(error)) {

            responseEntity = new ResponseEntity(error);

        } else if (isRequestError(error)) {

            responseEntity = new ResponseEntity(error, error.getStatusCode());

        } else {

            LOG.error('Exception: ', error);

            // FIXME: We should have an public API for testing production mode
            if ( process?.env?.NODE_ENV === 'production' ) {

                responseEntity = ResponseEntity.internalServerError();

            } else {

                responseEntity = new ResponseEntity<RequestError>(
                    createRequestError(RequestStatus.InternalServerError, `Internal Server Error: ${error}`),
                    RequestStatus.InternalServerError
                );

            }

        }

        this._handleResponse(responseEntity, res);

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
