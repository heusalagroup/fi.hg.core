// Copyright (c) 2022-2023 Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestMappingValue } from "./types/RequestMappingValue";
import { MethodDecoratorFunction } from "./types/MethodDecoratorFunction";
import { RequestControllerUtils } from "./utils/RequestControllerUtils";
import { LogService } from "../LogService";
import { RequestHeaderListOptions } from "./types/RequestHeaderListOptions";
import { ParameterDecoratorFunction } from "./types/ParameterDecoratorFunction";
import { RequestHeaderOptions } from "./types/RequestHeaderOptions";
import { LogLevel } from "../types/LogLevel";

const LOG = LogService.createLogger( 'RequestMapping' );

export function RequestMapping (...config: readonly RequestMappingValue[]): MethodDecoratorFunction {
    return (
        target: any | Function,
        propertyKey ?: string,
        descriptor  ?: PropertyDescriptor
    ) => {
        const requestController = RequestControllerUtils.findController( target );
        if ( requestController !== undefined ) {
            if ( propertyKey === undefined ) {
                RequestControllerUtils.attachControllerMapping( requestController, config );
            } else {
                RequestControllerUtils.attachControllerMethodMapping( requestController, config, propertyKey );
            }
        } else {
            LOG.debug( "mapping: for other: config=", config, 'target=', target, 'propertyKey=', propertyKey, 'descriptor=', descriptor );
        }
    };
}

RequestMapping.setLogLevel = (level: LogLevel) : void => {
    LOG.setLogLevel(level);
};
