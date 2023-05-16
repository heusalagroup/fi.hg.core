// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../types/String";
import { EntityMetadataUtils } from "./utils/EntityMetadataUtils";
import { EntityMetadata } from "./types/EntityMetadata";
import { createEntityRelationManyToOne } from "./types/EntityRelationManyToOne";
import { EntityConstructor } from "./Entity";

export const ManyToOne = (
    mapped : string | EntityConstructor
): PropertyDecorator => {
    return (
        target: any,
        propertyName : string | symbol
    ) => {
        if (!isString(propertyName)) throw new TypeError(`Only string properties supported. The type was ${typeof propertyName}.`);

        let mappedTable : string | undefined = undefined;
        if (isString(mapped)) {
            if (!mapped) throw new TypeError(`The mapped property "${propertyName}" cannot be empty`);
            mappedTable = mapped;
        } else if (mapped) {
            const metadata = EntityMetadataUtils.getMetadata( mapped );
            if ( !metadata ) throw new TypeError( `Could not find metadata for property "${propertyName}" Entity constructor: ${mapped}` );
            if ( !metadata.tableName ) throw new TypeError( `Could not find table name for property "${propertyName}" from metadata: ${metadata}` );
            mappedTable = metadata.tableName;
        } else {
            throw new TypeError(`The @manyToOne property "${propertyName}" requires table name or entity constructor`);
        }

        EntityMetadataUtils.updateMetadata(target.constructor, (metadata: EntityMetadata) => {
            metadata.manyToOneRelations.push(createEntityRelationManyToOne(propertyName, mappedTable));
        });
    };
};
