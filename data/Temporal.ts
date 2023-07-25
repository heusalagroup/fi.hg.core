// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityMetadataUtils } from "./utils/EntityMetadataUtils";
import { EntityMetadata } from "./types/EntityMetadata";
import { explainTemporalType, isTemporalType, TemporalType } from "./types/TemporalType";
import { createTemporalProperty } from "./types/TemporalProperty";
import { isString, isStringOrSymbol } from "../types/String";

export const Temporal = (
    type : TemporalType = TemporalType.TIMESTAMP
) => {
    return (target: any, context : any) => {
        const propertyName = isStringOrSymbol(context) ? context : context?.name;
        if (!isString(propertyName)) throw new TypeError(`Symbols not supported for property "${propertyName.toString()}"`);
        if (!isTemporalType(type)) throw new TypeError(`Only TemporalType properties supported for property "${propertyName}". The type was ${explainTemporalType(type)}.`);
        EntityMetadataUtils.updateMetadata(target.constructor, (metadata: EntityMetadata) => {
            metadata.temporalProperties.push(createTemporalProperty(propertyName, type));
        });
    };
};
