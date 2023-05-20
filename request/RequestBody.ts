// Copyright (c) 2022-2023 Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestController } from "./types/RequestController";
import { RequestControllerUtils } from "./utils/RequestControllerUtils";
import { isString } from "../types/String";
import { isNumber } from "../types/Number";
import { getOpenApiTypeStringFromRequestParamValueType, RequestParamValueType } from "./types/RequestParamValueType";
import { LogService } from "../LogService";
import { LogLevel } from "../types/LogLevel";

const LOG = LogService.createLogger( 'RequestBody' );

export function RequestBody (
    target: any | Function,
    propertyKey ?: string,
    paramIndex  ?: number
): void {
    const requestController: RequestController | undefined = RequestControllerUtils.findController( target );
    if ( requestController !== undefined && isString( propertyKey ) && isNumber( paramIndex ) ) {

        RequestControllerUtils.setControllerMethodBodyParam( requestController, propertyKey, paramIndex, RequestParamValueType.JSON );

        RequestControllerUtils.attachControllerOperation( requestController, propertyKey, {
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: getOpenApiTypeStringFromRequestParamValueType( RequestParamValueType.JSON )
                        }
                    }
                }
            }
        } );

    } else {
        LOG.warn( 'body: Unrecognized configuration: ',
            "; target=", target,
            "; propertyKey=", propertyKey,
            "; paramIndex=", paramIndex
        );
    }
}

RequestBody.setLogLevel = (level: LogLevel) : void => {
    LOG.setLogLevel(level);
};
