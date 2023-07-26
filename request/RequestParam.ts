// Copyright (c) 2022-2023 Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor <info@sendanor.fi>. All rights reserved.

import { getOpenApiTypeStringFromRequestParamValueType, isRequestParamValueTypeOrUndefined, RequestParamValueType } from "./types/RequestParamValueType";
import { ParameterDecoratorFunction } from "../decorators/types/ParameterDecoratorFunction";
import { RequestController } from "./types/RequestController";
import { isString } from "../types/String";
import { isNumber } from "../types/Number";
import { RequestControllerUtils } from "./utils/RequestControllerUtils";
import { LogService } from "../LogService";
import { LogLevel } from "../types/LogLevel";

const LOG = LogService.createLogger( 'RequestParam' );

export function RequestParam () : ParameterDecoratorFunction;

export function RequestParam (
    queryParam  : string,
    paramType  ?: RequestParamValueType
) : ParameterDecoratorFunction;

export function RequestParam (
    target       : any | Function,
    propertyKey ?: string,
    paramIndex  ?: number
) : void;

// RequestHeader overloads & implementation

export function RequestParam (
    arg1 ?: any | Function | string,
    arg2 ?: string | RequestParamValueType | undefined,
    arg3 ?: number
): ParameterDecoratorFunction | void {

    function _getRequestController (
        target: any,
        propertyKey: any,
        paramIndex: any
    ): RequestController | undefined {
        if ( isString( propertyKey ) && isNumber( paramIndex ) ) {
            return RequestControllerUtils.findController( target );
        } else {
            return undefined;
        }
    }

    function _param (
        target: any,
        propertyKey: any,
        paramIndex: any,
        queryParam: string | undefined,
        paramType: RequestParamValueType
    ) {
        const requestController = _getRequestController( target, propertyKey, paramIndex );
        if ( requestController !== undefined ) {

            RequestControllerUtils.setControllerMethodQueryParam( requestController, propertyKey, paramIndex, queryParam, paramType );

            RequestControllerUtils.attachControllerOperation( requestController, propertyKey, {
                parameters: [ {
                    "name": queryParam,
                    "in": "query",
                    schema: {
                        type: getOpenApiTypeStringFromRequestParamValueType( paramType )
                    }
                } ]
            } );

        } else {
            LOG.warn(
                '_param: Unrecognized configuration: ',
                "; target=", target,
                "; propertyKey=", propertyKey,
                "; paramIndex=", paramIndex
            );
        }
    }

    if ( arg1 === undefined && arg2 === undefined && arg3 === undefined ) {
        const queryParam : string | undefined = undefined;
        const paramType = RequestParamValueType.REGULAR_OBJECT;
        return (
            target: any | Function,
            propertyKey ?: string,
            paramIndex  ?: number
        ) => {
            _param( target, propertyKey, paramIndex, queryParam, paramType );
        };
    }

    if ( isString( arg1 ) && (arg3 === undefined) && isRequestParamValueTypeOrUndefined( arg2 ) ) {
        const queryParam = arg1;
        const paramType: RequestParamValueType = arg2 ?? RequestParamValueType.STRING;
        return (
            target: any | Function,
            propertyKey ?: string,
            paramIndex  ?: number
        ) => {
            _param( target, propertyKey, paramIndex, queryParam, paramType );
        };
    } else {
        const target = arg1;
        const propertyKey = arg2;
        const paramIndex = arg3;
        const paramType = RequestParamValueType.STRING;
        // FIXME: We cannot get the name of the query parameter yet, so this will break later!
        const queryParam = `${paramIndex}`;
        _param( target, propertyKey, paramIndex, queryParam, paramType );
    }

}

RequestParam.setLogLevel = (level: LogLevel) : void => {
    LOG.setLogLevel(level);
};
