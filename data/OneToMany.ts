// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString, isStringOrSymbol } from "../types/String";
import { EntityMetadataUtils } from "./utils/EntityMetadataUtils";
import { EntityMetadata } from "./types/EntityMetadata";
import { createEntityRelationOneToMany } from "./types/EntityRelationOneToMany";
import { EntityConstructor } from "./Entity";

export const OneToMany = (
    mappedTo   : string | EntityConstructor,
    mappedBy : string
) => {
    return (target: any, context : any) : void => {
        const propertyName = isStringOrSymbol(context) ? context : context?.name;
        if (!isString(propertyName)) throw new TypeError(`Only string properties supported. The type was ${typeof propertyName}.`);

        let mappedTable : string;
        if (isString(mappedTo)) {
            if (!mappedTo) throw new TypeError(`The mapped property "${propertyName}" cannot be empty`);
            mappedTable = mappedTo;
        } else if (mappedTo) {
            const metadata = EntityMetadataUtils.getMetadata( mappedTo );
            if ( !metadata ) throw new TypeError( `Could not find metadata for property "${propertyName}" Entity constructor: ${mappedTo}` );
            if ( !metadata.tableName ) throw new TypeError( `Could not find table name for property "${propertyName}" from metadata: ${metadata}` );
            mappedTable = metadata.tableName;
        } else {
            throw new TypeError(`The @manyToOne property "${propertyName}" requires table name or entity constructor`);
        }

        EntityMetadataUtils.updateMetadata(target.constructor, (metadata: EntityMetadata) => {
            metadata.oneToManyRelations.push(createEntityRelationOneToMany(propertyName, mappedBy, mappedTable));
        });
    };
};
