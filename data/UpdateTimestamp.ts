// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityMetadataUtils } from "./utils/EntityMetadataUtils";
import { EntityMetadata } from "./types/EntityMetadata";
import { isString } from "../types/String";

/**
 * Annotation which marks the property to be automatically initialized by
 * update time.
 */
export const UpdateTimestamp = (): PropertyDecorator => {
    return (target: any, propertyName : string | symbol) => {
        if (!isString(propertyName)) throw new TypeError(`Symbols not supported for property "${propertyName.toString()}"`);
        EntityMetadataUtils.updateMetadata(target.constructor, (metadata: EntityMetadata) => {
            metadata.updateTimestamps.push(propertyName);
        });
    };
};
