// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import EntityMetadata from "./EntityMetadata";
import Entity, {EntityIdTypes} from "../Entity";

export interface Persister {

    insert<T extends Entity, IdType extends EntityIdTypes> (
        entity   : T | T[],
        metadata : EntityMetadata
    ): Promise<T>;

    update<T extends Entity, IdType extends EntityIdTypes> (
        entity   : T,
        metadata : EntityMetadata
    ): Promise<T>;

    delete<T extends Entity, IdType extends EntityIdTypes> (
        entity   : T,
        metadata : EntityMetadata
    ): Promise<void>;

    findAll<T extends Entity, IdType extends EntityIdTypes> (
        metadata : EntityMetadata
    ): Promise<T[]>;

    findAllById<T extends Entity, IdType extends EntityIdTypes> (
        ids      : IdType[],
        metadata : EntityMetadata
    ): Promise<T[]>

    findById<T extends Entity, IdType extends EntityIdTypes> (
        id       : IdType,
        metadata : EntityMetadata
    ): Promise<T | undefined>;

    findByProperty<T extends Entity, IdType extends EntityIdTypes> (
        property : string,
        value    : any,
        metadata : EntityMetadata
    ): Promise<T[]>;

}

export default Persister;
