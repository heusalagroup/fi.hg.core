// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityMetadata } from "../../types/EntityMetadata";

export interface PersisterMetadataManager {

    setupEntityMetadata (metadata: EntityMetadata) : void;

    getMetadataByTable (tableName: string) : EntityMetadata | undefined;

    getTableForIdPropertyName (id: string) : string | undefined;
    getTableForIdColumnName (id: string) : string | undefined;

}
