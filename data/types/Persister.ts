// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

import { EntityMetadata } from "./EntityMetadata";
import { Entity, EntityIdTypes } from "../Entity";
import { Sort } from "../Sort";

export interface Persister {

    destroy () : void;

    setupEntityMetadata (metadata: EntityMetadata) : void;

    count<
        T extends Entity,
        ID extends EntityIdTypes
    >(metadata: EntityMetadata) : Promise<number>;

    countByProperty<
        T extends Entity,
        ID extends EntityIdTypes
    >(
        property : string,
        value    : any,
        metadata: EntityMetadata
    ) : Promise<number>;


    existsByProperty<
        T extends Entity,
        ID extends EntityIdTypes
        > (
        property : string,
        value    : any,
        metadata: EntityMetadata
    ) : Promise<boolean>;


    deleteById<
        T extends Entity,
        ID extends EntityIdTypes
    > (
        id       : ID,
        metadata : EntityMetadata
    ): Promise<void>;

    deleteAll<
        T extends Entity,
        ID extends EntityIdTypes
    > (metadata: EntityMetadata) : Promise<void>;

    deleteAllById<
        T extends Entity,
        ID extends EntityIdTypes
    > (
        ids: readonly ID[],
        metadata: EntityMetadata
    ) : Promise<void>;

    deleteAllByProperty<
        T extends Entity,
        ID extends EntityIdTypes
    > (
        property : string,
        value    : any,
        metadata : EntityMetadata
    ): Promise<void>;


    findAll<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        sort     : Sort | undefined
    ): Promise<T[]>;

    findAllById<T extends Entity, ID extends EntityIdTypes> (
        ids      : readonly ID[],
        metadata : EntityMetadata,
        sort     : Sort | undefined
    ): Promise<T[]>

    findAllByProperty<T extends Entity, ID extends EntityIdTypes> (
        property : string,
        value    : any,
        metadata : EntityMetadata,
        sort     : Sort | undefined
    ): Promise<T[]>;

    findById<T extends Entity, ID extends EntityIdTypes> (
        id       : ID,
        metadata : EntityMetadata,
        sort     : Sort | undefined
    ): Promise<T | undefined>;

    findByProperty<T extends Entity, ID extends EntityIdTypes> (
        property : string,
        value    : any,
        metadata : EntityMetadata,
        sort     : Sort | undefined
    ): Promise<T | undefined>;

    insert<T extends Entity, ID extends EntityIdTypes> (
        entity   : T | readonly T[],
        metadata : EntityMetadata
    ): Promise<T>;

    update<T extends Entity, ID extends EntityIdTypes> (
        entity   : T,
        metadata : EntityMetadata
    ): Promise<T>;

}
