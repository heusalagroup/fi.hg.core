// Copyright (c) 2020 Sendanor. All rights reserved.

import {RequestHandler} from "./RequestHandler";

export interface ServerService<IncomingMessage, ServerResponse> {

    start () : void;

    stop () : void;

    setHandler (newHandler : RequestHandler<IncomingMessage, ServerResponse> | undefined) : void;

}

export default ServerService;
