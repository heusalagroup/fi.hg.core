// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

import { EntityMetadata } from "./EntityMetadata";
import { Entity, EntityIdTypes } from "../Entity";
import { Sort } from "../Sort";
import { Where } from "../Where";

export interface Persister {

    destroy () : void;

    setupEntityMetadata (metadata: EntityMetadata) : void;

    count<
        T extends Entity,
        ID extends EntityIdTypes
    >(
        metadata  : EntityMetadata,
        where     : Where | undefined,
    ) : Promise<number>;

    existsBy<
        T extends Entity,
        ID extends EntityIdTypes
        > (
        metadata : EntityMetadata,
        where    : Where,
    ) : Promise<boolean>;

    deleteAll<
        T extends Entity,
        ID extends EntityIdTypes
    > (
        metadata  : EntityMetadata,
        where     : Where | undefined,
    ): Promise<void>;

    findAll<T extends Entity, ID extends EntityIdTypes> (
        metadata  : EntityMetadata,
        where     : Where | undefined,
        sort      : Sort | undefined
    ): Promise<T[]>;

    findBy<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        where    : Where,
        sort     : Sort | undefined
    ): Promise<T | undefined>;

    insert<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        entity   : T | readonly T[],
    ): Promise<T>;

    update<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        entity   : T,
    ): Promise<T>;

}
