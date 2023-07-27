// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../LogService";
import { AutowireMetadataUtils } from "./utils/AutowireMetadataUtils";
import { AutowireUtils } from "./utils/AutowireUtils";
import { MethodDecoratorFunction } from "../../decorators/types/MethodDecoratorFunction";
import { LogLevel } from "../../types/LogLevel";

const LOG = LogService.createLogger( 'addAutowired' );

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
export function addAutowired<T = any> () : MethodDecoratorFunction {
    LOG.debug(`1 creating autowired decorator`);
    return function autowiredMethod (
        target       : any | Function,
        propertyKey  : string,
        descriptor   : TypedPropertyDescriptor<any>,
    ) : void {
        const method = descriptor.value!;
        const metadata = AutowireMetadataUtils.getMethodMetadata(target, propertyKey);
        const paramNames = metadata?.paramNames ?? [];
        LOG.debug(`3 autowiredMethod: paramNames = `, paramNames);

        const overrideCallback = function (
            this: T,
            ...args: any
        ) {
            try {
                return AutowireUtils.autowireApply(
                    target,
                    propertyKey,
                    method,
                    {
                        prevArgs: args
                    }
                );
            } catch (err) {
                LOG.warn(`Warning! The addAutowired decorator for "${propertyKey}" method had an error: `, err);
                throw err;
            }
        };

        descriptor.value = function (this: T, ...args: any) : any {
            return overrideCallback.apply(this, args);
        };

    }
}

addAutowired.setLogLevel = (level: LogLevel) => LOG.setLogLevel(level);
