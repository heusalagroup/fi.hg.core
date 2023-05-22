// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import "reflect-metadata";
import { createEntityMetadata, EntityMetadata } from "../types/EntityMetadata";

const METADATA_KEY = Symbol("metadata");

export class EntityMetadataUtils {

    public static getMetadata (value: any) : EntityMetadata {
        return Reflect.getMetadata(METADATA_KEY, value);
    }

    public static updateMetadata (
        target: any,
        setValue: (metadata: EntityMetadata) => void
    ) : void {
        const metadata: EntityMetadata = Reflect.getMetadata(METADATA_KEY, target) || createEntityMetadata(
            "",
            "",
            [],
            [],
            [],
            [],
            undefined,
            [],
            [],
            []
        );
        setValue(metadata);
        Reflect.defineMetadata(METADATA_KEY, metadata, target);
    }

}
