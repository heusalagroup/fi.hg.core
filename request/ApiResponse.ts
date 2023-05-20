// Copyright (c) 2022-2023 Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestControllerUtils } from "./utils/RequestControllerUtils";
import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";
import { RequestStatus } from "./types/RequestStatus";
import { OpenAPIV3 } from "../types/openapi";
import { getOpenApiDocumentFromRequestControllerMappingObject } from "./types/RequestControllerMappingObject";

const LOG = LogService.createLogger( 'ResponseStatus' );

export function ApiResponse (
    status       : RequestStatus,
    description  : string,
    content     ?: { [media: string]: OpenAPIV3.MediaTypeObject }
) {
    return (
        target: any | Function,
        propertyKey ?: string,
        descriptor  ?: PropertyDescriptor
    ) => {
        const requestController = RequestControllerUtils.findController( target );
        if ( requestController !== undefined ) {
            if ( propertyKey === undefined ) {
            } else {

                RequestControllerUtils.attachControllerOperation( requestController, propertyKey, {
                    "responses": {
                        [`${status}`]: {
                            description,
                            ...( content !== undefined ? { content } : {})
                        }
                    }
                } );

                return;
            }
        }
        LOG.debug( "mapping: for other: config=", status, 'target=', target, 'propertyKey=', propertyKey, 'descriptor=', descriptor );
    };
}

ApiResponse.setLogLevel = (level: LogLevel) : void => {
    LOG.setLogLevel(level);
    RequestControllerUtils.setLogLevel(LogLevel.NONE);
    getOpenApiDocumentFromRequestControllerMappingObject.setLogLevel(LogLevel.NONE);
};
