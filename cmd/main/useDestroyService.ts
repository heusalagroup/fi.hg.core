// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../LogService";
import { MethodDecoratorFunction } from "../../decorators/types/MethodDecoratorFunction";
import { createMethodDecorator } from "../../decorators/createMethodDecorator";
import { ProcessUtils } from "../../ProcessUtils";
import { Observer } from "../../Observer";
import { DestroyServiceImpl } from "./types/DestroyServiceImpl";
import { AutowireServiceImpl } from "./types/AutowireServiceImpl";

const LOG = LogService.createLogger( 'useErrorHandler' );

/**
 * Setup process destroy handler.
 *
 * Example usage:
 *
 *     ```typescript
 *     class MyApp {
 *
 *         @useDestroyHandler()
 *         public static async run (
 *             args: string[] = []
 *         ): Promise<CommandExitStatus> {
 *             console.log('Hello world');
 *         }
 *
 *     }
 *
 * }
 */
export function useDestroyService<T = any> (
) : MethodDecoratorFunction {
    LOG.debug(`creating MethodDecorator`);

    return createMethodDecorator( (
        method: Function,
        context: ClassMethodDecoratorContext
    ) => {
        const propertyName = context.name;
        LOG.debug(`overriding method ${context.name.toString()}`);
        return async function (
            this: T,
            ...args: readonly string[]
        ) {

            const autowireService = AutowireServiceImpl.getAutowireService();
            const destroyService = DestroyServiceImpl.create();
            autowireService.setName("destroyService", destroyService);

            ProcessUtils.setupDestroyHandler( () => {
                LOG.debug( 'Stopping command from process utils event' );
                destroyService.destroy();
            }, (err: any) => {
                LOG.error( 'Error while shutting down the service: ', err );
            } );

            return await method.apply(this, args);
        };
    } );
}
