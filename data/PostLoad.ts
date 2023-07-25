// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityMetadataUtils } from "./utils/EntityMetadataUtils";
import { EntityMetadata } from "./types/EntityMetadata";
import { createEntityCallback } from "./types/EntityCallback";
import { EntityCallbackType } from "./types/EntityCallbackType";
import { LogService } from "../LogService";
import { LogLevel } from "../types/LogLevel";
import { isStringOrSymbol } from "../types/String";

const LOG = LogService.createLogger( 'PostLoad' );
LOG.setLogLevel(LogLevel.INFO);

/**
 * PostLoad decorator.
 * Registers a callback to be executed after loading an entity.
 *
 * This callback is invoked after an entity is loaded from the database. It is
 * typically used to perform post-loading tasks or updates.
 *
 * TODO: Document the invocation order of lifecycle callbacks.
 *
 * @returns The decorator function.
 * @throws {Error} If an exception is thrown from the callback.
 */
export const PostLoad = () => {

    /**
     * Decorator function.
     *
     * @param {Object} target - The target object (class or prototype).
     * @param {string | symbol} propertyName - The name of the property being decorated.
     * @throws {TypeError} If the property name is not defined.
     */
    return (
        target: any,
        context: any,
    ) => {
        const propertyName = isStringOrSymbol(context) ? context : context?.name;
        if (propertyName !== undefined) {
            LOG.debug(`Installing POST_LOAD callback for property "${propertyName.toString()}"`);
            EntityMetadataUtils.updateMetadata(target.constructor, (metadata: EntityMetadata) => {
                metadata.callbacks.push(
                    createEntityCallback(
                        propertyName,
                        EntityCallbackType.POST_LOAD
                    )
                );
            });
        } else {
            throw new TypeError(`The property name was not defined`);
        }
    };
};

/**
 * Sets the log level of the "PostLoad" logger context.
 *
 * @param {LogLevel} level - The log level to set.
 */
PostLoad.setLogLevel = (level: LogLevel) : void => {
    LOG.setLogLevel(level);
};
