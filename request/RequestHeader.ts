// Copyright (c) 2022-2023 Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor <info@sendanor.fi>. All rights reserved.

import { isRequestHeaderListOptions, RequestHeaderListOptions } from "./types/RequestHeaderListOptions";
import { isRequestHeaderOptionsOrUndefined, RequestHeaderOptions } from "./types/RequestHeaderOptions";
import { ParameterDecoratorFunction } from "../decorators/types/ParameterDecoratorFunction";
import { DefaultHeaderMapValuesType } from "./types/DefaultHeaderMapValuesType";
import { RequestController } from "./types/RequestController";
import { RequestControllerUtils } from "./utils/RequestControllerUtils";
import { isString } from "../types/String";
import { isNumber } from "../types/Number";
import { isBoolean } from "../types/Boolean";
import { isObject } from "../types/Object";
import { RequestParamValueType } from "./types/RequestParamValueType";
import { LogService } from "../LogService";
import { LogLevel } from "../types/LogLevel";

const LOG = LogService.createLogger( 'RequestHeader' );

export function RequestHeader (
    opts ?: RequestHeaderListOptions
) : ParameterDecoratorFunction;

export function RequestHeader (
    headerName  : string,
    opts       ?: RequestHeaderOptions
) : ParameterDecoratorFunction;

export function RequestHeader (
    target       : any | Function,
    propertyKey  : string,
    paramIndex   : number
) : void;

export function RequestHeader (
    arg1 ?: string | RequestHeaderListOptions | Function | any,
    arg2 ?: string | RequestHeaderOptions | boolean | undefined,
    arg3 ?: number
): ParameterDecoratorFunction | void {

    /**
     * Private helper
     *
     * @param target
     * @param propertyKey
     * @param paramIndex
     * @param defaultValues
     * @private
     */
    function _setMethodHeaderMap (
        target: any,
        propertyKey: string,
        paramIndex: number,
        defaultValues: DefaultHeaderMapValuesType | undefined
    ) {
        const requestController: RequestController | undefined = RequestControllerUtils.findController( target );
        if ( requestController !== undefined ) {
            RequestControllerUtils.setControllerMethodHeaderMap( requestController, propertyKey, paramIndex, defaultValues );
        } else {
            LOG.warn( '_setMethodHeaderMap: Unrecognized configuration: ',
                "; target=", target,
                "; propertyKey=", propertyKey,
                "; paramIndex=", paramIndex
            );
        }
    }

    // LOG.debug( 'RequestHeader: ', arg1, arg2, arg3 );
    if ( isString( arg2 ) && isNumber( arg3 ) ) {
        _setMethodHeaderMap( arg1, arg2, arg3, undefined );
        return;
    }
    if ( isString( arg1 ) ) {
        const headerName: string = arg1;
        if ( !isRequestHeaderOptionsOrUndefined( arg2 ) ) {
            throw new TypeError( `RequestHeader: Argument 2 is not type of RequestHeaderOptions: ${arg2}` );
        }
        const headerNameOpts: RequestHeaderOptions | undefined = arg2;
        let isRequired: boolean | undefined = undefined;
        let defaultValue: string | undefined = undefined;
        if ( headerNameOpts === undefined ) {
        } else if ( isBoolean( headerNameOpts ) ) {
            isRequired = headerNameOpts;
        } else if ( isObject( headerNameOpts ) ) {
            isRequired = headerNameOpts?.required ?? undefined;
            defaultValue = headerNameOpts?.defaultValue ?? undefined;
        } else {
            throw new TypeError( 'RequestHeader: Invalid type of options' );
        }
        // LOG.debug( 'header: init: ', headerName );
        return (
            target: any | Function,
            propertyKey ?: string,
            paramIndex  ?: number
        ) => {
            if ( isString( propertyKey ) && isNumber( paramIndex ) ) {
                const requestController: RequestController | undefined = RequestControllerUtils.findController( target );
                if ( requestController !== undefined ) {

                    RequestControllerUtils.setControllerMethodHeader( requestController, propertyKey, paramIndex, headerName, RequestParamValueType.STRING, isRequired, defaultValue );

                    RequestControllerUtils.attachControllerOperation( requestController, propertyKey, {
                        parameters: [{
                            "name": headerName,
                            "in": "header",
                            schema: {
                                type: "string"
                            }
                        }]
                    } );

                    return;
                }
            }
            LOG.warn( 'header: Unrecognized configuration: ',
                "; target=", target,
                "; propertyKey=", propertyKey,
                "; paramIndex=", paramIndex
            );
        };
    }
    let opts: RequestHeaderListOptions | undefined = arg1;
    if ( !(opts === undefined || isRequestHeaderListOptions( opts )) ) {
        throw new TypeError( 'RequestHeader: Invalid type of options' );
    }
    const defaultValues: DefaultHeaderMapValuesType | undefined = opts?.defaultValues;
    return (
        target: any | Function,
        propertyKey ?: string,
        paramIndex  ?: number
    ) => {
        if ( isString( propertyKey ) && isNumber( paramIndex ) ) {
            _setMethodHeaderMap( target, propertyKey, paramIndex, defaultValues );
        } else {
            LOG.warn( 'header: Unrecognized configuration: ',
                "; target=", target,
                "; propertyKey=", propertyKey,
                "; paramIndex=", paramIndex
            );
        }
    };

}

RequestHeader.setLogLevel = (level: LogLevel) : void => {
    LOG.setLogLevel(level);
};
