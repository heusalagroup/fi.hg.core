// Copyright (c) 2022-2023 Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor <info@sendanor.fi>. All rights reserved.

import { ParameterOrMethodDecoratorFunction } from "../decorators/types/ParameterOrMethodDecoratorFunction";
import { isString } from "../types/String";
import { RequestController } from "./types/RequestController";
import { RequestControllerUtils } from "./utils/RequestControllerUtils";
import { isNumber } from "../types/Number";
import { RequestParamValueType } from "./types/RequestParamValueType";
import { LogService } from "../LogService";
import { LogLevel } from "../types/LogLevel";

const LOG = LogService.createLogger( 'ModelAttribute' );

export function ModelAttribute (
    attributeName: string
): ParameterOrMethodDecoratorFunction {
    LOG.debug( 'modelAttribute: ', attributeName );
    if ( !isString( attributeName ) ) {
        throw new TypeError( `ModelAttribute: Argument 1 is not string: ${attributeName}` );
    }
    // Return types:
    // - ParameterDecoratorFunction  = any | Function, string, PropertyDescriptor
    // - MethodDecoratorFunction     = any | Function, string, number
    return (
        target       : any | Function,
        propertyKey ?: string,
        paramIndex  ?: number | TypedPropertyDescriptor<any>
    ) : void => {
        if ( isString( propertyKey ) ) {
            const requestController: RequestController | undefined = RequestControllerUtils.findController( target );
            if ( requestController !== undefined ) {
                if ( isNumber( paramIndex ) ) {
                    RequestControllerUtils.setControllerMethodModelAttributeParam( requestController, propertyKey, paramIndex, attributeName, RequestParamValueType.JSON );
                    return;
                } else if ( paramIndex !== undefined ) {
                    RequestControllerUtils.attachControllerMethodModelAttributeBuilder( requestController, propertyKey, paramIndex, attributeName );
                    return;
                }
            }
        }
        LOG.warn( 'modelAttribute: Unrecognized configuration: ',
            "; target=", target,
            "; propertyKey=", propertyKey,
            "; paramIndex=", paramIndex
        );
    };
}

ModelAttribute.setLogLevel = (level: LogLevel) : void => {
    RequestControllerUtils.setLogLevel(level);
    LOG.setLogLevel(level);
};
