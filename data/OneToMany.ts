// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../types/String";
import { EntityMetadataUtils } from "./utils/EntityMetadataUtils";
import { EntityMetadata } from "./types/EntityMetadata";
import { createEntityRelationOneToMany } from "./types/EntityRelationOneToMany";

export const OneToMany = (mappedBy: string): PropertyDecorator => {
    return (target: any, propertyName : string | symbol) => {
        if (!isString(propertyName)) throw new TypeError(`Only string properties supported. The type was ${typeof propertyName}.`);
        EntityMetadataUtils.updateMetadata(target.constructor, (metadata: EntityMetadata) => {
            metadata.oneToManyRelations.push(createEntityRelationOneToMany(propertyName, mappedBy));
        });
    };
};
