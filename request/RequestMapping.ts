// Copyright (c) 2022-2023 Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestMappingValue } from "./types/RequestMappingValue";
import { RequestControllerUtils } from "./utils/RequestControllerUtils";
import { LogService } from "../LogService";
import { LogLevel } from "../types/LogLevel";
import { ClassOrMethodDecoratorFunction } from "../decorators/types/ClassOrMethodDecoratorFunction";

const LOG = LogService.createLogger( 'RequestMapping' );

export function RequestMapping<T = any> (
    ...config: readonly RequestMappingValue[]
): ClassOrMethodDecoratorFunction<T> {
    return (
        target       : any | Function,
        propertyKey ?: string,
        descriptor  ?: TypedPropertyDescriptor<T>
    ) : void => {
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
