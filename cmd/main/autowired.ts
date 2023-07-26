// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../LogService";
import { AutowireMetadataUtils } from "./utils/AutowireMetadataUtils";
import { AutowireMetadata } from "./types/AutowireMetadata";
import { map } from "../../functions/map";
import { ParameterDecoratorFunction } from "../../decorators/types/ParameterDecoratorFunction";

const LOG = LogService.createLogger( 'autowired' );

/**
 * Autowires method parameters based on the property name.
 *
 * Example usage:
 *
 *     ```typescript
 *     class MyApp {
 *
 *         @useAutowired()
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
        propertyKey ?: string,
        paramIndex  ?: number,
    ): void {
        LOG.debug(`3 autowiredParam: propertyKey = `, propertyKey, paramIndex);
        AutowireMetadataUtils.updateMethodMetadata(
            target,
            propertyKey,
            (orig: AutowireMetadata): AutowireMetadata => {
                const paramNames : string[] = map(orig?.paramNames ?? [], item => item);
                while (paramNames.length < paramIndex) {
                    paramNames.push(undefined);
                }
                paramNames[paramIndex] = paramName;
                LOG.debug(`4 autowiredParam: "${propertyKey}": paramNames updated as: `, paramNames);
                return {
                    ...orig,
                    paramNames
                };
            }
        );
    }
}
