// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../LogService";
import { AutowireMetadataUtils } from "./utils/AutowireMetadataUtils";
import { AutowireUtils } from "./utils/AutowireUtils";
import { MethodDecoratorFunction } from "../../decorators/types/MethodDecoratorFunction";
import { createMethodDecorator } from "../../decorators/createMethodDecorator";
import { isFunction } from "../../types/Function";

const LOG = LogService.createLogger( 'useAutowired' );

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
export function useAutowired<T = any> () : MethodDecoratorFunction {
    LOG.debug(`1 creating autowired decorator`);
    return function autowiredMethod (
        target       : any | Function,
        propertyKey ?: string,
        descriptor  ?: TypedPropertyDescriptor<any>,
    ) : void {
        const method = descriptor.value!;
        const metadata = AutowireMetadataUtils.getMethodMetadata(target, propertyKey);
        const paramNames = metadata?.paramNames ?? [];
        LOG.debug(`3 autowiredMethod: paramNames = `, paramNames);

        const overrideCallback = function (
            this: T,
            args: readonly string[],
        ) {
            try {
                return AutowireUtils.autowireApply(
                    target,
                    propertyKey,
                    method,
                    {
                        args
                    }
                );
            } catch (err) {
                LOG.warn(`Warning! The useAutowired decorator for "${propertyKey}" method had an error: `, err);
                throw err;
            }
        };

        descriptor.value = function (this: T, ...args: any) : any {
            return overrideCallback.apply(this, args);
        };

    }
}
