// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityMetadataUtils } from "./utils/EntityMetadataUtils";
import { EntityMetadata } from "./types/EntityMetadata";
import { createEntityCallback } from "./types/EntityCallback";
import { EntityCallbackType } from "./types/EntityCallbackType";
import { LogService } from "../LogService";
import { LogLevel } from "../types/LogLevel";
import { isStringOrSymbol } from "../types/String";

const LOG = LogService.createLogger( 'PreRemove' );
LOG.setLogLevel(LogLevel.INFO);

/**
 * PreRemove decorator.
 * Registers a callback to be executed before removing an entity.
 *
 * This callback is invoked before removing an entity. It is typically used to
 * perform pre-removal tasks or validations.
 *
 * Cascaded remove operations trigger the corresponding lifecycle methods of the
 * associated entities.
 *
 * TODO: Document the invocation order of lifecycle callbacks.
 *
 * @returns The decorator function.
 * @throws {Error} If an exception is thrown from the callback. The transaction will be marked for rollback.
 */
export const PreRemove = () => {

    /**
     * Decorator function.
     *
     * @param {Object} target - The target object (class or prototype).
     * @param {string | symbol} propertyName - The name of the property being decorated.
     * @throws {TypeError} If the property name is not defined.
     */
    return (
        target: any,
        context: any
    ) : void => {
        const propertyName = isStringOrSymbol(context) ? context : context?.name;
        if (propertyName !== undefined) {
            LOG.debug(`Installing PRE_REMOVE callback for property "${propertyName.toString()}"`);
            EntityMetadataUtils.updateMetadata(target.constructor, (metadata: EntityMetadata) => {
                metadata.callbacks.push(
                    createEntityCallback(
                        propertyName,
                        EntityCallbackType.PRE_REMOVE
                    )
                );
            });
        } else {
            throw new TypeError(`The property name was not defined`);
        }
    };
};

/**
 * Sets the log level of the "PreRemove" logger context.
 *
 * @param {LogLevel} level - The log level to set.
 */
PreRemove.setLogLevel = (level: LogLevel) : void => {
    LOG.setLogLevel(level);
};
