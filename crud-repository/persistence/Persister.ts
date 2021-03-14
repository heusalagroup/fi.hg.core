// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import EntityMetadata from "./EntityMetadata";

export default interface Persister {
    insert<T>(entity: T, metadata: EntityMetadata): Promise<T>;
    update<T>(entity: T, metadata: EntityMetadata): Promise<T>;
    delete<T>(entity: T, metadata: EntityMetadata): Promise<void>;
    findAll<T>(metadata: EntityMetadata): Promise<T[]>;
    findById<T>(id: any, metadata: EntityMetadata): Promise<T | undefined>;
    findByProperty<T>(property: string, value: any, metadata: EntityMetadata): Promise<T[]>;
}
