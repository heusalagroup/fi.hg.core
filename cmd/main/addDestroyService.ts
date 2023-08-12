// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../LogService";
import { MethodDecoratorFunction } from "../../decorators/types/MethodDecoratorFunction";
import { createMethodDecorator } from "../../decorators/createMethodDecorator";
import { ProcessUtils } from "../../ProcessUtils";
import { DestroyServiceImpl } from "./services/DestroyServiceImpl";
import { AutowireServiceImpl } from "./services/AutowireServiceImpl";
import { LogLevel } from "../../types/LogLevel";

const LOG = LogService.createLogger( 'addDestroyService' );

/**
 * Setup destroy handler for the process itself.
 *
 * This will add listeners for multiple signals like SIGTERM, SIGINT, SIGUSR1,
 * SIGUSR2 and other uncaught error handlers.
 *
 * Example usage:
 *
 *     ```typescript
 *     class MyApp {
 *
 *         @addDestroyService()
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
export function addDestroyService<T = any> (
) : MethodDecoratorFunction {
    LOG.debug(`creating MethodDecorator`);

    return createMethodDecorator( (
        method: Function,
        context: ClassMethodDecoratorContext
    ) => {
        const propertyName = context.name;
        LOG.debug(`overriding method ${propertyName.toString()}`);
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

addDestroyService.setLogLevel = (level: LogLevel) => LOG.setLogLevel(level);
