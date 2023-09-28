// Copyright (c) 2022-2023 Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestPathVariableListOptions } from "./types/RequestPathVariableListOptions";
import { isRequestPathVariableOptionsOrUndefined, RequestPathVariableOptions } from "./types/RequestPathVariableOptions";
import { ParameterDecoratorFunction } from "../decorators/types/ParameterDecoratorFunction";
import { DefaultPathVariableMapValuesType } from "./types/DefaultPathVariableMapValuesType";
import { RequestController } from "./types/RequestController";
import { RequestControllerUtils } from "./utils/RequestControllerUtils";
import { isString } from "../types/String";
import { isNumber } from "../types/Number";
import { isBoolean } from "../types/Boolean";
import { isObject } from "../types/Object";
import { RequestParamValueType } from "./types/RequestParamValueType";
import { LogService } from "../LogService";
import { LogLevel } from "../types/LogLevel";
import { getOpenApiDocumentFromRequestControllerMappingObject } from "./types/RequestControllerMappingObject";

const LOG = LogService.createLogger( 'PathVariable' );

export function PathVariable (
    opts ?: RequestPathVariableListOptions
) : ParameterDecoratorFunction;

export function PathVariable (
    variableName  : string,
    opts         ?: RequestPathVariableOptions
) : ParameterDecoratorFunction;

export function PathVariable (
    target       : any | Function,
    propertyKey  : string,
    paramIndex   : number
) : void;

export function PathVariable (
    arg1 ?: string | RequestPathVariableListOptions | any | Function,
    arg2 ?: string | RequestPathVariableOptions | boolean | undefined,
    arg3 ?: number
): void | ParameterDecoratorFunction {

    function _setPathVariableMap (
        target: any | Function,
        propertyKey: string,
        paramIndex: number,
        defaultValues: DefaultPathVariableMapValuesType | undefined
    ) {
        const requestController: RequestController | undefined = RequestControllerUtils.findController( target );
        if ( requestController !== undefined ) {
            RequestControllerUtils.setControllerMethodPathVariableMap( requestController, propertyKey, paramIndex, defaultValues );

            return;
        }
        LOG.warn( '_setPathVariableMap: Unrecognized configuration: ',
            "; target=", target,
            "; propertyKey=", propertyKey,
            "; paramIndex=", paramIndex
        );
    }

    // LOG.debug( 'pathVariable: ', arg1, arg2, arg3 );

    if ( isString( arg2 ) && isNumber( arg3 ) ) {
        const target: any | Function = arg1;
        const propertyKey: string = arg2;
        const paramIndex: number = arg3;
        _setPathVariableMap( target, propertyKey, paramIndex, undefined );
        return;
    }

    const variableName: string | RequestPathVariableListOptions | undefined = arg1;

    if ( isString( variableName ) ) {
        if ( !isRequestPathVariableOptionsOrUndefined( arg2 ) ) {
            throw new TypeError( `PathVariable: Argument 2 is not type of RequestPathVariableOptions: ${arg2}` );
        }
        const headerNameOpts: RequestPathVariableOptions | undefined = arg2;
        let isRequired: boolean | undefined = undefined;
        let defaultValue: string | undefined = undefined;
        let decodeValue: boolean = true;
        if ( headerNameOpts === undefined ) {
        } else if ( isBoolean( headerNameOpts ) ) {
            isRequired = headerNameOpts;
        } else if ( isObject( headerNameOpts ) ) {
            isRequired = headerNameOpts?.required ?? undefined;
            defaultValue = headerNameOpts?.defaultValue ?? undefined;
            decodeValue = headerNameOpts?.decodeValue ?? true;
        } else {
            throw new TypeError( 'PathVariable: Invalid type of options' );
        }
        // LOG.debug( 'pathVariable: init: ', variableName );
        return (
            target: any | Function,
            propertyKey ?: string,
            paramIndex  ?: number
        ) => {
            if ( isString( propertyKey ) && isNumber( paramIndex ) ) {
                const requestController: RequestController | undefined = RequestControllerUtils.findController( target );
                if ( requestController !== undefined ) {
                    RequestControllerUtils.setControllerMethodPathVariable( requestController, propertyKey, paramIndex, variableName, RequestParamValueType.STRING, isRequired, decodeValue, defaultValue );

                    RequestControllerUtils.attachControllerOperation( requestController, propertyKey, {
                        parameters: [{
                            name: variableName,
                            in: 'path'
                        }]
                    } );

                    return;
                }
            }
            LOG.warn( 'pathVariable: Unrecognized configuration: ',
                "; target=", target,
                "; propertyKey=", propertyKey,
                "; paramIndex=", paramIndex
            );
        };
    }

    let opts: RequestPathVariableListOptions | undefined = variableName;
    if ( opts === undefined || isObject( opts?.defaultValues ) ) {
    } else {
        throw new TypeError( 'PathVariable: Invalid type of options' );
    }
    const defaultValues: DefaultPathVariableMapValuesType | undefined = opts ? opts?.defaultValues ?? undefined : undefined;
    return (
        target: any | Function,
        propertyKey ?: string,
        paramIndex  ?: number
    ) => {

        if ( isString( propertyKey ) && isNumber( paramIndex ) ) {

            _setPathVariableMap( target, propertyKey, paramIndex, defaultValues );

        } else {
            LOG.warn( 'pathVariable: Unrecognized configuration: ',
                "; target=", target,
                "; propertyKey=", propertyKey,
                "; paramIndex=", paramIndex
            );
        }

    };
}

PathVariable.setLogLevel = (level: LogLevel) : void => {
    RequestControllerUtils.setLogLevel(level);
    getOpenApiDocumentFromRequestControllerMappingObject.setLogLevel(level);
    LOG.setLogLevel(level);
};
