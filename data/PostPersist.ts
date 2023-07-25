// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityMetadataUtils } from "./utils/EntityMetadataUtils";
import { EntityMetadata } from "./types/EntityMetadata";
import { createEntityCallback } from "./types/EntityCallback";
import { EntityCallbackType } from "./types/EntityCallbackType";
import { LogService } from "../LogService";
import { LogLevel } from "../types/LogLevel";
import { isStringOrSymbol } from "../types/String";

const LOG = LogService.createLogger( 'PostPersist' );
LOG.setLogLevel(LogLevel.INFO);

/**
 * PostPersist decorator.
 * Registers a callback to be executed after persisting an entity.
 *
 * This callback is invoked after persisting an entity. It is typically used to
 * perform post-persistence tasks or updates.
 *
 * Cascaded persist operations trigger the corresponding lifecycle methods of
 * the associated entities.
 *
 * TODO: Document the invocation order of lifecycle callbacks.
 *
 * @returns The decorator function.
 * @throws {Error} If an exception is thrown from the callback. The transaction will be marked for rollback.
 */
export const PostPersist = () => {

    /**
     * Decorator function.
     *
     * @param {Object} target - The target object (class or prototype).
     * @param {string | symbol} propertyName - The name of the property being decorated.
     * @throws {TypeError} If the property name is not defined.
     */
    return (
        target: any,
        context : any
    ) : void => {
        const propertyName = isStringOrSymbol(context) ? context : context?.name;
        if (propertyName !== undefined) {
            LOG.debug(`Installing POST_PERSIST callback for property "${propertyName.toString()}"`);
            EntityMetadataUtils.updateMetadata(target.constructor, (metadata: EntityMetadata) => {
                metadata.callbacks.push(
                    createEntityCallback(
                        propertyName,
                        EntityCallbackType.POST_PERSIST
                    )
                );
            });
        } else {
            throw new TypeError(`The property name was not defined`);
        }
    };
};

/**
 * Sets the log level of the "PostPersist" logger context.
 *
 * @param {LogLevel} level - The log level to set.
 */
PostPersist.setLogLevel = (level: LogLevel) : void => {
    LOG.setLogLevel(level);
};
