// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityMetadataUtils } from "./utils/EntityMetadataUtils";
import { EntityMetadata } from "./types/EntityMetadata";
import { explainTemporalType, isTemporalType, TemporalType } from "./types/TemporalType";
import { createTemporalProperty } from "./types/TemporalProperty";
import { isString } from "../types/String";

export const Temporal = (
    type : TemporalType = TemporalType.TIMESTAMP
): PropertyDecorator => {
    return (target: any, propertyName : string | symbol) => {
        if (!isString(propertyName)) throw new TypeError(`Symbols not supported for property "${propertyName.toString()}"`);
        if (!isTemporalType(type)) throw new TypeError(`Only TemporalType properties supported for property "${propertyName}". The type was ${explainTemporalType(type)}.`);
        EntityMetadataUtils.updateMetadata(target.constructor, (metadata: EntityMetadata) => {
            metadata.temporalProperties.push(createTemporalProperty(propertyName, type));
        });
    };
};
