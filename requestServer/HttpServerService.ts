// Copyright (c) 2020 Sendanor. All rights reserved.

import HTTP, {IncomingMessage, RequestListener, ServerResponse} from "http";
import LogService from "../LogService";
import ServerService from "./types/ServerService";
import {RequestHandler} from "./types/RequestHandler";

const LOG = LogService.createLogger('HttpService');

const DEFAULT_HOSTNAME : string | undefined = undefined;
const DEFAULT_PORT = 3000;

export class HttpServerService implements ServerService<IncomingMessage, ServerResponse> {

    private readonly _requestHandler : RequestListener;
    private readonly _hostname       : string | undefined;
    private readonly _port           : number;
    private readonly _closeCallback  : () => void;
    private readonly _listenCallback : () => void;

    private _server            : HTTP.Server;
    private _handler           : RequestHandler<IncomingMessage, ServerResponse> | undefined;

    /**
     *
     * @param port
     * @param hostname
     * @param handler
     * @fixme Convert to use a configuration string instead of port + hostname, so that also sockets, etc can be supported.
     */
    public constructor (
        port     : number                         = DEFAULT_PORT,
        hostname : string             | undefined = DEFAULT_HOSTNAME,
        handler  : RequestHandler<IncomingMessage, ServerResponse> | undefined = undefined
    ) {

        LOG.debug('new: ', hostname, port, handler);

        this._requestHandler = this._onRequest.bind(this);
        this._listenCallback = this._onListen.bind(this);
        this._closeCallback  = this._onClose.bind(this);

        this._hostname = hostname;
        this._port     = port;
        this._handler  = handler;
        this._server   = HTTP.createServer(this._requestHandler);

    }

    public start () {

        LOG.debug(`Starting server at ${this._getConnectionString()}`);

        if (this._hostname === undefined) {

            this._server.listen(this._port, this._listenCallback);

        } else {

            this._server.listen(this._port, this._hostname, this._listenCallback);

        }

    }

    public stop () {

        LOG.debug(`Closing server at ${this._getConnectionString()}`)

        this._server.close(this._closeCallback);

    }

    public setHandler (newHandler : RequestHandler<IncomingMessage, ServerResponse> | undefined) {

        LOG.debug(this._hostname, this._port, ': Changing handler as: ', newHandler, ' was ', this._handler);

        this._handler = newHandler;

    }

    private _getConnectionString () : string {

        if (this._hostname === undefined) {

            return `http://${this._port}`;

        } else {

            return`http://${this._hostname}:${this._port}`;

        }

    }

    private _onRequest (req: IncomingMessage, res: ServerResponse) {

        if (this._handler !== undefined) {
            try {

                this._handler(req, res);

                // FIXME: Handle possible async promise

            } catch (e) {
                LOG.error('Response handler has an error: ', e);
            }
        } else {
            LOG.error('We did not have a handler for the request.');
            res.end('Error');
        }

    }

    private _onListen () {

        LOG.info(`Server started at ${this._getConnectionString()}`);

    }

    private _onClose () {

        LOG.debug(`Closed server at ${this._getConnectionString()}`);

    }

}

export default HttpServerService;
