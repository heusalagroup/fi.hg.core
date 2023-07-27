// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus } from "../types/CommandExitStatus";
import { LogService } from "../../LogService";
import { MethodDecoratorFunction } from "../../decorators/types/MethodDecoratorFunction";
import { createMethodDecorator } from "../../decorators/createMethodDecorator";
import { LogLevel } from "../../types/LogLevel";

const LOG = LogService.createLogger( 'addErrorHandler' );

/**
 * Wraps the method body with try-catch.
 *
 * Caught errors will be logged.
 *
 * Example usage:
 *
 *     ```typescript
 *     class MyApp {
 *
 *         @addErrorHandler(CommandExitStatus.FATAL_ERROR)
 *         public static async run (
 *             args: string[] = []
 *         ): Promise<CommandExitStatus> {
 *             console.log('Hello world');
 *         }
 *
 *     }
 * @param exitStatus The exit status which to return on errors.
 *
 * }
 */
export function addErrorHandler<T = any> (
    exitStatus: CommandExitStatus = CommandExitStatus.FATAL_ERROR
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
            try {
                LOG.debug(`Calling `, propertyName, args);
                return await method.apply(this, args);
            } catch (err) {
                LOG.error(`Error in method "${propertyName.toString()}()": `, err);
                return exitStatus;
            }
        };
    } );
}

addErrorHandler.setLogLevel = (level: LogLevel) => LOG.setLogLevel(level);
