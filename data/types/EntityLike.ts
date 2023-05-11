// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityMetadata } from "./EntityMetadata";
import { ReadonlyJsonObject } from "../../Json";

export interface CreateEntityLikeCallback {
    (dto ?: any) : EntityLike;
}

export interface EntityLike {
    getMetadata (): EntityMetadata;
    clone (): EntityLike;
    toJSON (): ReadonlyJsonObject;
}
