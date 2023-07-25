// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityMetadataUtils } from "./utils/EntityMetadataUtils";
import { EntityMetadata } from "./types/EntityMetadata";
import { isString, isStringOrSymbol } from "../types/String";

/**
 * Annotation which marks the property to be automatically initialized by
 * creation time.
 *
 * Right now this does not affect PostgreSQL or MySQL implementations where
 * this functionality is handled by the database configuration. It is
 * only used in the memory persister for now.
 *
 * However, some day when we have SQL initialization functionality, this may be
 * used there, to initialize database table schemas automatically.
 */
export const CreationTimestamp = () => {
    return (target: any, context : any) : void => {
        const propertyName = isStringOrSymbol(context) ? context : context?.name;
        if (!isString(propertyName)) throw new TypeError(`Symbols not supported for property "${propertyName.toString()}"`);
        EntityMetadataUtils.updateMetadata(target.constructor, (metadata: EntityMetadata) => {
            metadata.creationTimestamps.push(propertyName);
        });
    };
};
