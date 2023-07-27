// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../LogService";
import { AutowireMetadataUtils } from "./utils/AutowireMetadataUtils";
import { AutowireMetadata } from "./types/AutowireMetadata";
import { map } from "../../functions/map";
import { ParameterDecoratorFunction } from "../../decorators/types/ParameterDecoratorFunction";
import { LogLevel } from "../../types/LogLevel";

const LOG = LogService.createLogger( 'autowired' );

/**
 * Autowires method parameters based on the property name.
 *
 * Example usage:
 *
 *     ```typescript
 *     class MyApp {
 *
 *         @addAutowired()
 *         public static async run (
 *             @autowired('args')
 *             args: string[] = [],
 *         ): Promise<CommandExitStatus> {
 *             console.log('Hello world');
 *         }
 *
 *     }
 *
 * }
 */
export function autowired<T = any> (
    paramName : string
) : ParameterDecoratorFunction {
    LOG.debug(`1 creating autowired decorator`);
    return function autowiredParam (
        target       : any | Function,
        propertyKey ?: string | symbol,
        paramIndex  ?: number,
    ): void {
        LOG.debug(`3 autowiredParam: propertyKey = `, propertyKey, paramIndex);
        if (propertyKey !== undefined && paramIndex !== undefined) {
            AutowireMetadataUtils.updateMethodMetadata(
                target,
                propertyKey,
                (orig: AutowireMetadata): AutowireMetadata => {
                    const paramNames : (string | undefined)[] = map(orig?.paramNames ?? [], item => item);
                    while (paramNames.length < paramIndex) {
                        paramNames.push(undefined);
                    }
                    paramNames[paramIndex] = paramName;
                    LOG.debug(`4 autowiredParam: "${propertyKey.toString()}": paramNames updated as: `, paramNames);
                    return {
                        ...orig,
                        paramNames
                    };
                }
            );
        }
    }
}

autowired.setLogLevel = (level: LogLevel) => LOG.setLogLevel(level);
