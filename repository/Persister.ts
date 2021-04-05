// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import EntityMetadata from "./types/EntityMetadata";
import Entity, {EntityIdTypes} from "./Entity";

export interface Persister {

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
        ids: ID[],
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
        metadata : EntityMetadata
    ): Promise<T[]>;

    findAllById<T extends Entity, ID extends EntityIdTypes> (
        ids      : ID[],
        metadata : EntityMetadata
    ): Promise<T[]>

    findAllByProperty<T extends Entity, ID extends EntityIdTypes> (
        property : string,
        value    : any,
        metadata : EntityMetadata
    ): Promise<T[]>;

    findById<T extends Entity, ID extends EntityIdTypes> (
        id       : ID,
        metadata : EntityMetadata
    ): Promise<T | undefined>;

    findByProperty<T extends Entity, ID extends EntityIdTypes> (
        property : string,
        value    : any,
        metadata : EntityMetadata
    ): Promise<T | undefined>;

    insert<T extends Entity, ID extends EntityIdTypes> (
        entity   : T | T[],
        metadata : EntityMetadata
    ): Promise<T>;

    update<T extends Entity, ID extends EntityIdTypes> (
        entity   : T,
        metadata : EntityMetadata
    ): Promise<T>;

}

export default Persister;
