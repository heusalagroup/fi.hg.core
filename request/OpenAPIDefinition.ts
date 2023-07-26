// Copyright (c) 2022-2023 Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor <info@sendanor.fi>. All rights reserved.

import { OpenAPIV3 } from "../types/openapi";
import { MethodDecoratorFunction } from "../decorators/types/MethodDecoratorFunction";
import { RequestControllerUtils } from "./utils/RequestControllerUtils";
import { LogService } from "../LogService";
import { LogLevel } from "../types/LogLevel";

const LOG = LogService.createLogger( 'OpenAPIDefinition' );

/**
 * Define OpenAPI document definition
 * @param config
 */
export function OpenAPIDefinition (config: Partial<OpenAPIV3.Document>): MethodDecoratorFunction {
    return (
        target: any | Function,
        propertyKey ?: string,
        descriptor  ?: PropertyDescriptor
    ) => {
        const requestController = RequestControllerUtils.findController( target );
        if ( requestController !== undefined ) {
            RequestControllerUtils.attachControllerOpenApiDocument( requestController, config );
        } else {
            LOG.debug( "mapping: for other: config=", config, 'target=', target, 'propertyKey=', propertyKey, 'descriptor=', descriptor );
        }
    };
}

OpenAPIDefinition.setLogLevel = (level: LogLevel) : void => {
    LOG.setLogLevel(level);
};
