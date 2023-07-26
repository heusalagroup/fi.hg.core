// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import "reflect-metadata";
import { AutowireMetadata, createAutowireMetadata } from "../types/AutowireMetadata";

const METADATA_KEY = Symbol("autowiredMetadata");

export class AutowireMetadataUtils {

    public static getMethodMetadata (
        target      : any,
        methodName  : string | symbol,
    ) : AutowireMetadata {
        return Reflect.getMetadata(METADATA_KEY, target, methodName);
    }

    public static updateMethodMetadata (
        target      : any,
        methodName  : string | symbol,
        setValue    : (metadata: AutowireMetadata) => AutowireMetadata
    ) : void {
        let metadata: AutowireMetadata = Reflect.getMetadata(METADATA_KEY, target, methodName) || createAutowireMetadata(
            [],
        );
        metadata = setValue(metadata);
        Reflect.defineMetadata(METADATA_KEY, metadata, target, methodName);
    }

}
