// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SimpleEntity } from "./SimpleEntity";
import { Repository } from "../../types/Repository";

export interface SimpleEntityRepository<T extends SimpleEntity> extends Repository<T, string> {

    findAllByEntityDeleted (deleted: boolean)  : Promise<T[]>;
    findByEntityDeleted (deleted: boolean)  : Promise<T[]>;
    deleteAllByEntityDeleted (deleted: boolean)  : Promise<T[]>;
    existsByEntityDeleted (deleted: boolean)  : Promise<T[]>;
    countByEntityDeleted (deleted: boolean)  : Promise<T[]>;

    findAllByEntityVersion (version: number)  : Promise<T[]>;
    findByEntityVersion (version: number)  : Promise<T[]>;
    deleteAllByEntityVersion (version: number)  : Promise<T[]>;
    existsByEntityVersion (version: number)  : Promise<T[]>;
    countByEntityVersion (version: number)  : Promise<T[]>;

}
